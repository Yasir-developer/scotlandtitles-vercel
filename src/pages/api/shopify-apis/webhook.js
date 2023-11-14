import axios from "axios";
import { server } from "../../../../config";
import connectToDatabase from "../../../../db";
export default async function webhookHandler(req, res) {
  //   console.log(req.body, "request");
  // const { id, email, created_at, order_number } = req.body;

  const db = await connectToDatabase();
  const collection = db.collection("totalOrders");
  console.log(req.body.id, "req.body.orderId");
  const result = await collection.findOne({ orderId: req.body.id });
  if (result) {
    console.log(
      "=========================Already Present========================="
    );
    return res.status(200).send({ message: "SUCCESS ALREADY PRESENT" });
  } else {
    console.log(result, "============result=========");
    await axios
      .post(`${server}/api/shopify-apis/insertOrder`, {
        orderId: req.body.id,
        status: true,
      })
      .then((response) => {
        console.log("response");
        console.log(response.data, "webhook response");
        return res.status(200).send({ message: "Added in Database success" });
      })
      .catch((error) => {
        console.log("error.message");
        console.log(error.message);
        return res.status(200).send({ message: error.message });
      });
  }

  // return res.status(200).send({ message: "Success" });
}
