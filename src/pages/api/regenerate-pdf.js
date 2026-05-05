import { generatePDF } from './shopify-apis/order.js';
import connectToDatabase from '../../../../db';
import { server } from '../../../../config';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Method not allowed' });
  }

  const { order_number } = req.body;

  if (!order_number) {
    return res.status(400).send({ message: 'Order number required' });
  }

  const db = await connectToDatabase();
  const collection = db.collection('totalOrders');
  const order = await collection.findOne({ orderId: parseInt(order_number) });

  if (!order) {
    return res.status(404).send({ message: 'Order not found' });
  }

  try {
    await generatePDF(order);

    // Send email
    const { email, first_name, last_name } = order.customer;
    const emailToSend = process.env.ADMIN_EMAIL || email;

    await axios.post(`${server}/api/user/email/orderEmail`, {
      email: emailToSend,
      name: first_name ? first_name : last_name,
      order_no: order_number,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.status(200).send({ message: 'PDF regenerated and email sent' });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Error regenerating PDF' });
  }
}