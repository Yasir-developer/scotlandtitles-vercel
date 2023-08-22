const express = require("express");
const app = express();
const mainRoutes = require('./routes/mainRoutes')
const dotenv = require('dotenv')
dotenv.config()
const {MongoClient } = require('mongodb')

const global = {}

async function getMongoClient() {
  if (!global.client) {
    global.client = new MongoClient(process.env.MONGODB_URI);
  }
  // It is okay to call connect() even if it is connected
  // using node-mongodb-native v4 (it will be no-op)
  // See: https://github.com/mongodb/node-mongodb-native/blob/4.0/docs/CHANGES_4.0.0.md
  await global.client.connect();
  await global.client.db().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  return global.client;
}




app.use(async(req, res, next) => {
  req.dbClient = await getMongoClient();
  req.db = req.dbClient.db();
  next();
});


app.use(mainRoutes)

// Define routes and middleware here
// app.get("/", (req, res) => {
//   res.send("Hello, Express!");
// });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
