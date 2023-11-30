import "@shopify/shopify-api/adapters/node";
import axios from "axios";
import connectToDatabase from "../../../db";
export default async function listOrder(req, res) {
  try {
    // console.log(req, "reqqqqqq");
    const db = await connectToDatabase();
    const collection = db.collection("config");
    const accessToken = await collection.findOne({});
    // console.log(accessToken, "collection db");

    var result;
    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "X-Shopify-Access-Token": accessToken.accessToken,
      },
    };
    //scotland-titles-app-development.myshopify.com
    console.log(req.query, "req.quert  ===========");

    const url = `https://scotland-titles-dev.myshopify.com/admin/api/2023-10/orders.json${
      req.query.name
        ? `?name=${req.query.name}`
        : req.query.page_info
        ? `?page_info=${req.query.page_info}`
        : `?status=any`
    }`;

    console.log(url, "all url");
    // console.log(accessToken.accessToken, "accessToken from orderlist");

    await axios
      .get(url, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          // "X-Shopify-Access-Token": accessToken.accessToken,
          "X-Shopify-Access-Token": accessToken.accessToken,
        },
      })
      // .then((response) => {
      .then(async (response) => {
        // console.log(response, "total respons");

        if (req.query.name) {
          if (response.data.orders.length > 0) {
            console.log(
              "respons found with query name",
              response.data.orders.length
            );
            result = { data: response.data.orders, headers: response.headers };
          } else {
            console.log(
              "Empty respons with query name",
              response.data.orders.length
            );
            console.log("Proceeding with GraphQL request:");
            const gqlQuery = `
            query {
              orders(first: 10, ${
                req.query.name
                  ? `query: "name:${req.query.name}"`
                  : 'query: "status:archived"'
              }) {
                  nodes {
                    id
                    name
                    createdAt
                    lineItems(first: 10){
                      nodes {
                        id
                        name
                        variantTitle
                      }
                    }
                }
              }
            }
            `;

            const graphqlUrl =
              "https://scotland-titles-dev.myshopify.com/admin/api/2023-10/graphql.json";
            await axios
              .post(
                graphqlUrl,
                { query: gqlQuery },
                {
                  headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Access-Token": accessToken.accessToken,
                  },
                }
              )
              .then((graphqlResponse) => {
                // Assign the result from the GraphQL request to the 'result' variable
                // console.log("graphqlResponse>>>", graphqlResponse)
                let updatedResponse =
                  graphqlResponse.data.data.orders.nodes.map((item) => {
                    return {
                      id: item.id,
                      name: item.name,
                      created_at: item.createdAt,
                      line_items: item.lineItems.nodes.map((subItem) => {
                        return {
                          id: subItem.id,
                          name: subItem.name,
                          variant_title: subItem.variantTitle,
                        };
                      }),
                      order_number: parseInt(item.name.slice(1)),
                    };
                  });
                console.log("updatedResponse>>>", updatedResponse);
                graphqlResponse?.data?.errors?.length > 0
                  ? (result = {
                      errors: graphqlResponse.data.errors,
                      headers: graphqlResponse.headers,
                    })
                  : (result = {
                      data: updatedResponse,
                      headers: graphqlResponse.headers,
                    });
              })
              .catch((graphqlError) => {
                console.error(
                  "GraphQL request error>>>>",
                  graphqlError.data.errors
                );
                // Handle GraphQL request error
              });

            // result = { data: response.data.orders, headers: response.headers };
          }
        } else {
          console.log("total respons", response.data.orders.length);
          result = { data: response.data.orders, headers: response.headers };
        }
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
