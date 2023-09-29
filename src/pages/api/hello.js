// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { MongoClient } from "mongodb";
import connectToDatabase from "../../../db";
import path from "path";
// import { connectToDatabase } from '../../path-to-mongodb.js';
import fs from "fs";

export default async function handler(req, res) {
  const db = await connectToDatabase();

  if (req.method === "GET") {
    console.log(path.join(process.cwd(), "public", "Goudy-Bold-Regular.ttf"));
    // path.join(process.cwd(), "public", "demo.json")
    const fontTwo = fs.readFileSync(
      // path.join(__dirname + "../../../../utils/fonts/demo.json")
      // "https://scotlandtitlesapp.com/pdfs/Goudy-Bold-Regular.ttf"
      path.join(process.cwd(), "public", "demo.json")
    );
    // const collection = db.collection('co'); // Replace with your collection name
    // const data = await collection.find({}).toArray();
    // res.status(200).json(data);
    res.status(200).json({ message: "Database Connected" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
