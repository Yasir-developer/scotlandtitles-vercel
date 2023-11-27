import "@shopify/shopify-api/adapters/node";
import axios from "axios";
import connectToDatabase from "../../../db";
export default async function listOrder(req, res) {
  try {
    // console.log(req, "reqqqqqq");
    const db = await connectToDatabase();
    const collection = db.collection("config");
    const accessToken = await collection.findOne({});
    console.log(accessToken, "collection db");

    var result;
    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "X-Shopify-Access-Token": accessToken.accessToken,
      },
    };
    //scotland-titles-app-development.myshopify.com
    console.log(req.query, "req.quert");
    const url = `https://scotland-titles-dev.myshopify.com/admin/api/2023-10/orders.json${
      req.query.page_info ? `?page_info=${req.query.page_info}` : ""
    }${req.query.name ? `?name=${req.query.name}` : ""}`;

    console.log(url, "all url");
    console.log(accessToken.accessToken, "accessToken from orderlist");
    await axios
      .get(url, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          // "X-Shopify-Access-Token": accessToken.accessToken,
          "X-Shopify-Access-Token": accessToken.accessToken,
        },
      })
      .then((response) => {
        // console.log(response.data.orders, "total respons");
        result = { data: response.data.orders, headers: response.headers };
      })
      .catch((error) => {
        console.log(error.message, "error");
      });
    return res.json({ data: result });
  } catch (error) {
    return res.json({ dbo: error });
  }
  // console.log(access_token.accessToken, "accessToken console");
  // var result;
  // const options = {
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //     "X-Shopify-Access-Token": "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",
  //   },
  // };
  // console.log(req.query, "req.quert");
  // const url = `https://scotland-titles-app-development.myshopify.com/admin/api/2023-10/orders.json${
  //   req.query.page_info ? `?page_info=${req.query.page_info}` : ""
  // }${req.query.name ? `?name=${req.query.name}` : ""}`;

  // console.log(url, "all url");
  // await axios
  //   .get(url, {
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       "X-Shopify-Access-Token": "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",
  //     },
  //   })
  //   .then((response) => {
  //     // console.log(response.data.orders, "total respons");
  //     result = { data: response.data.orders, headers: response.headers };
  //   })
  //   .catch((error) => {
  //     console.log(error.message, "error");
  //   });
  // return res.json({ data: result });
  // return res.json({ dbo: orders });
}
