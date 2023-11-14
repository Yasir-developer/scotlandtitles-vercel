// import Order from '../../models/Order';
import connectToDatabase from "../../../db";

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === "GET") {
    try {
      const db = await connectToDatabase();

      const collection = db.collection("orders");
      const orders = await collection.find({}).toArray();
      res.status(200).json({ success: true, data: orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
