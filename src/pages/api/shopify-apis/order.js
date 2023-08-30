import { PDFDocument, rgb } from "pdf-lib";

export default async function handler(req, res) {
  console.log("req.body", req.body);
  //   res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=30"); // set caching header
  //   console.time();
  //   return res.status(200);

  //   try {
  //     const pdfDoc = await PDFDocument.create();
  //     const page = pdfDoc.addPage([600, 400]);

  //     const content = "Hello from Shopify!"; // Replace with your Shopify data

  //     page.drawText(content, {
  //       x: 50,
  //       y: 350,
  //       size: 12,
  //       color: rgb(0, 0, 0),
  //     });

  //     const pdfBytes = await pdfDoc.save();

  //     res.setHeader("Content-Type", "application/pdf");
  //     res.setHeader(
  //       "Content-Disposition",
  //       "attachment; filename=shopify_data.pdf"
  //     );
  //     res.send(pdfBytes);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send("An error occurred");
  //   }
  //   res.status(200).send("Successfull request");
}
