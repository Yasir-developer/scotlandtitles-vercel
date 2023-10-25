import "@shopify/shopify-api/adapters/node";
import axios from "axios";

export default async function listOrder(req, res) {
  // console.log(req, "reqqqqqq");

  var result;
  const options = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "X-Shopify-Access-Token": "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",
    },
  };
  console.log(req.query, "req.quert");
  const url = `https://scotland-titles-app-development.myshopify.com/admin/api/2023-10/orders.json${
    req.query.page_info ? `?page_info=${req.query.page_info}` : ""
  }${req.query.name ? `?name=${req.query.name}` : ""}`;

  console.log(url, "all url");
  await axios
    .get(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "X-Shopify-Access-Token": "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",
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
}
