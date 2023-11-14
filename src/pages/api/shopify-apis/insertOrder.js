import { MongoClient } from "mongodb";
import { insertOrderData } from "../../../../api-lib/db";
import connectToDatabase from "../../../../db";

export default async function handler(req, res) {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();

  const database = client.db("scotland-tiles");
  const db = await connectToDatabase();

  console.log(req.body, "=========================");
  const { orderId, status } = req.body;

  const order = await insertOrderData(db, {
    orderId,
    status,
  });
  return res.json({ data: order });
}
