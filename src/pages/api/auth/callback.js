import connectToDatabase from "../../../../db";
import cryptoJS from "crypto-js";
import axios from "axios";

export default async function handler(req, res) {
  const generateAccessToken = async (apiKey, sharedSecret, code, shop) => {
    const query = {
      client_id: apiKey,
      client_secret: sharedSecret,
      code: code,
    };

    const accessTokenUrl = `https://${shop}/admin/oauth/access_token`;
    try {
      const response = await axios.post(accessTokenUrl, query);
      const accessToken = response.data.access_token;
      console.log(accessToken);
      return accessToken;
    } catch (error) {
      console.error(error);
    }
  };

  const db = await connectToDatabase();

  const apiKey = process.env.CLIENT_ID;
  const apiSecret = process.env.CLIENT_SECRET;

  const params = req.query;
  const code = params.code;
  const shop = params.shop;
  const hmac = req.query.hmac;

  delete params.hmac;

  const paramsKeys = Object.keys(params).sort();
  const paramsString = paramsKeys
    .map((key) => key + "=" + params[key])
    .join("&");

  const computed_hmac = cryptoJS.HmacSHA256(paramsString, apiSecret).toString();

  if (computed_hmac === hmac) {
    generateAccessToken(apiKey, apiSecret, code, shop)
      .then(async (at) => {
        console.log(at, "at");
        await db.collection("config").deleteMany({});
        await db.collection("config").insertOne({
          accessToken: at,
        });
        const accessTokenFromDB = await db
          .collection("config")
          .findOne({ accessToken: at });
        console.log(accessTokenFromDB, "accessTokenFromDB");
        res.send(accessTokenFromDB);
      })
      .catch((e) => {
        console.log(e);
        res.status(403).json({ error: e });
      });
  } else {
    res.status(403).json({
      access_token: "unable to match hash",
      hmac: hmac,
      cmac: computed_hmac,
    });
  }
}
