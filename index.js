const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cryptoJS = require("crypto-js");
const axios = require("axios");
dotenv.config();
// const { MongoClient } = require("mongodb");

app.get("/", (req, res) => {
  res.send("hello world");
});

// const global = {}

// async function getMongoClient() {
//   if (!global.client) {
//     global.client = new MongoClient(process.env.MONGODB_URI);
//   }
//   // It is okay to call connect() even if it is connected
//   // using node-mongodb-native v4 (it will be no-op)
//   // See: https://github.com/mongodb/node-mongodb-native/blob/4.0/docs/CHANGES_4.0.0.md
//   await global.client.connect();
//   await global.client.db().command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   return global.client;
// }

// app.use(async(req, res, next) => {
//   req.dbClient = await getMongoClient();
//   req.db = req.dbClient.db();
//   next();
// });

// const generateAccessToken = async (apiKey, sharedSecret, code, shop) => {
//   const query = {
//       client_id: apiKey,
//       client_secret: sharedSecret,
//       code: code
//   };

//   const accessTokenUrl = `https://${shop}/admin/oauth/access_token`;
//   try {
//       const response = await axios.post(accessTokenUrl, query);
//       const accessToken = response.data.access_token;
//       console.log(accessToken)
//       return accessToken;
//   } catch (error) {
//       console.error(error);
//   }
// }

// app.get('/', (req, res) => {
//   const shop = process.env.SHOP_NAME
//   console.log(shop)
//   // const client_id = process.env.CLIENT_ID
//   // if (!shop) {
//   //     return res.status(400).send('Missing shop parameter. Please add SHOP_NAME=your-shop-name.myshopify.com to your env file.');
//   // }

//   // const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${client_id}&scope=read_products,write_products,read_themes,write_themes,read_orders,write_orders,read_checkouts,write_checkouts,read_content,write_content,read_customers,write_customers&redirect_uri=http://${process.env.APP_URL}/auth/callback`;
//   // res.redirect(installUrl);
// })

// router.get('/auth/callback', (req, res) => {
//   const apiKey = process.env.CLIENT_ID
//   const apiSecret = process.env.CLIENT_SECRET

//   const params = req.query
//   const code = params.code
//   const shop = params.shop
//   const hmac = req.query.hmac

//   delete params.hmac

//   const paramsKeys = Object.keys(params).sort();
//   const paramsString = paramsKeys.map(key => key + '=' + params[key]).join('&');

//   // const computed_hmac = bcrypt.hashSync(paramsString, 'sha256', apiSecret)
//   const computed_hmac = cryptoJS.HmacSHA256(paramsString, apiSecret).toString();

//   if(computed_hmac === hmac) {
//       generateAccessToken(apiKey, apiSecret, code, shop)
//           .then(async (at) => {
//               await req.db.collection('config').deleteMany({})
//               await req.db.collection('config').insertOne({
//                   accessToken:at
//               })
//               const accessTokenFromDB = await req.db.collection('config').findOne({accessToken:at})
//               res.send(accessTokenFromDB)

//           })
//           .catch( (e) => {
//               console.log(e)
//               res.status(403).json({'error': e})
//           })
//   }
//   else {
//       res.status(403).json({'access_token': 'unable to match hash', 'hmac': hmac, 'cmac': computed_hmac})
//   }
// })

// Define routes and middleware here
// app.get("/", (req, res) => {
//   res.send("Hello, Express!");
// });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
