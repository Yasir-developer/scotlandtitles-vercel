import { MongoClient } from "mongodb";
// import connectToDatabase from "../.";
import connectToDatabase from "../../../db";

export default async function handler(req, res) {
  //   const db = await connectToDatabase();
  //   const { db } = await connectToDatabase();

  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db("scotland-tiles");
    const db = await connectToDatabase();

    const collection = db.collection("orders");

    if (req.method === "POST") {
      const { orderId } = req.body;
      await collection.insertOne({ orderId, downloaded: true });
      res.status(201).json({ success: true });
    } else {
      res.status(405).json({ success: false, message: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  } finally {
    await client.close();
  }
}
