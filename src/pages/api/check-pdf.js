import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Method not allowed' });
  }

  const { order_number } = req.body;

  if (!order_number) {
    return res.status(400).send({ message: 'Order number required' });
  }

  try {
    const response = await axios.head(
      `https://scotlandtitlesapp.com/pdfs/${order_number}-printed.pdf`,
      { timeout: 3000 }
    );
    return res.status(200).send({ exists: response.status === 200 });
  } catch (error) {
    // If 404 or any error, PDF doesn't exist
    return res.status(200).send({ exists: false });
  }
}
