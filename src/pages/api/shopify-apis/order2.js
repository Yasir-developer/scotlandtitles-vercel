import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import * as ftp from "basic-ftp";
import { Readable } from "stream";
import doctorimg from "../../../../public/images/doctor-2.jpg";
import path from "path";
import { createWriteStream } from "fs";
import pdfjs from "pdfjs-dist";

export default async function handler(req, res) {
  const client = new ftp.Client();
  var name1;
  await client.access({
    host: "92.205.12.5",
    port: 21, // FTP port
    user: "yasir-ftp@scotlandtitlesapp.com",
    password: "hP2PTSSotW!I",
  });

  const filePath = path.resolve("./pdfs", "DigitalPack.pdf");
  console.log(filePath, "filePath");
  const imgBuffer = fs.readFileSync(filePath);
  console.log(imgBuffer, "imggg");
  //   const pdfDoc = await PDFDocument.load(imgBuffer);
  const pdfDocument = pdfjs.getDocument(
    "https://scotlandtitlesapp.com/DigitalPack.pdf"
  );
  console.log(pdfDocument, "pdfDocument");

  //   const pages = pdfDoc.getPages();

  const pageNumber = 1;
  const page = await pdfDocument.getPage(pageNumber);

  // Set scale for rendering (adjust as needed)
  const scale = 1.5;

  // Get the viewport
  const viewport = page.getViewport({ scale });

  // Render the page
  const renderContext = {
    viewport: viewport,
  };

  const outputPdfPath = join(process.cwd(), "public", "output.pdf");
  const writeStream = createWriteStream(outputPdfPath);

  // Append text to the PDF page
  const canvasStream = page.render(renderContext).stream();
  canvasStream.on("data", (chunk) => {
    console.log(chunk, "chunkchunk");
    writeStream.write(chunk);
  });

  canvasStream.on("end", () => {
    writeStream.end(() => {
      res.status(200).json({ message: "Text appended to the PDF." });
    });
  });

  canvasStream.on("error", (error) => {
    res.status(500).json({ error: "Error appending text to the PDF." });
  });

  //   const pdfBytes = await pdfDoc.save();

  //   const pdfStream = new Readable();

  //   pdfStream.push(pdfBytes);
  //   pdfStream.push(null); // End of stream

  const remotePath = `/pdfs/${id}.pdf`;
  await client.uploadFrom(canvasStream, remotePath);
  client.close();

  const pdfUrl = `https://scotlandtitlesapp.com/pdfs/${id}.pdf`;
  console.log(pdfUrl, "pdfUrl");
  res.status(200).json({ pdfUrl });

  //   return pdfBytes;
}
// async function updateKeywordsInPDF(pdfBytes, keywordsToUpdate) {
// //   const pdfDoc = await PDFDocument.load(pdfBytes);
//   const filePath = path.resolve("./pdfs", "DigitalPack.pdf");
//         const imgBuffer = fs.readFileSync(filePath);
//         const pdfDoc = await PDFDocument.load(imgBuffer);
//         const pages = pdfDoc.getPages();

//   // Loop through pages and keywords
//   pages.forEach((page)=> {
//     keywordsToUpdate.forEach((keyword) => {
//       const text = page.getText();

//       if (text.includes('Lord')) {
//         const updatedText = text.replace('Lord', 'Lady');
//         page.drawText(updatedText, {
//           x: 50,
//           y: 50,
//           size: 12,
//           color: rgb(0, 0, 0),
//         });
//       }
//     });
//   });

//   // Serialize the modified PDF
//   const modifiedPdfBytes = await pdfDoc.save();

//   return modifiedPdfBytes;
// }
