// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// import { MongoClient } from "mongodb";
import connectToDatabase from "../../../db";
import path from "path";
// import { connectToDatabase } from '../../path-to-mongodb.js';
import fs from "fs";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

export default async function handler(req, res) {
  const db = await connectToDatabase();

  if (req.method === "GET") {
    console.log(path.join(process.cwd(), "public", "Goudy-Bold-Regular.ttf"));
    // path.join(process.cwd(), "public", "demo.json")
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    const fontTwo = fs.readFileSync(
      // path.join(__dirname + "../../../../utils/fonts/demo.json")
      // "https://scotlandtitlesapp.com/pdfs/Goudy-Bold-Regular.ttf"
      path.join(process.cwd(), "public", "Goudy-Bold-Regular.ttf")
    );
    const tempusFont = await pdfDoc.embedFont(fontTwo);
    var page = pdfDoc.addPage([595, 842]);

    page.drawText("abcdefg", {
      x: 70,
      y: 710,
      size: 11,
      // width: textWidth,
      // height: textHeight,
      color: rgb(0, 0, 0),
      // lineHeight: fontSize * 1.2,
      font: tempusFont,
    });
    const pdfBytes = await pdfDoc.save();
    console.log(pdfBytes, "pdfBytes");
    // const collection = db.collection('co'); // Replace with your collection name
    // const data = await collection.find({}).toArray();
    // res.status(200).json(data);
    res.status(200).json({ message: "Database Connected" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
