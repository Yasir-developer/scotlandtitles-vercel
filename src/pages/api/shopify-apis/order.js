import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import * as ftp from "basic-ftp";
import { Readable } from "stream";
import doctorimg from "../../../../public/images/doctor-2.jpg";
import path from "path";

export default async function handler(req, res) {
  const client = new ftp.Client();
  var name1;
  await client.access({
    host: "92.205.12.5",
    port: 21, // FTP port
    user: "yasir-ftp@scotlandtitlesapp.com",
    password: "hP2PTSSotW!I",
  });

  const { id, email, created_at } = req.body;

  console.log(req.body, "req.body ----");

  const onlyLord = async () => {
    console.log(email, "email");
    // return

    try {
      const pdfDoc = await PDFDocument.create();
      //   const url = "https://pdf-lib.js.org/assets/with_update_sections.pdf";
      //   const existingPdfBytes = await fetch(url).then((res) =>
      //     res.arrayBuffer()
      //   );

      //   // Load a PDFDocument from the existing PDF bytes
      // const pdfDoc = await PDFDocument.load(existingPdfBytes);
      //Edit Work
      //   const filePath = path.resolve("./pdfs", "DigitalPack.pdf");
      //   const imgBuffer = fs.readFileSync(filePath);
      //   const pdfDoc = await PDFDocument.load(imgBuffer);
      //   //   console.log(pdfDoc, "pdfDoc");
      //   const pages = pdfDoc.getPages();
      //   const firstPage = pages[0];

      //   const { width, height } = firstPage.getSize();

      //   // Draw a string of text diagonally across the first page
      //   firstPage.drawText("This text was added with JavaScript!", {
      //     x: 5,
      //     y: height / 2 + 300,
      //     size: 50,
      //     // font: helveticaFont,
      //     color: rgb(0.95, 0.1, 0.1),
      //     rotate: degrees(-45),
      //   });

      //   const pdfBytes = await pdfDoc.save();

      //   const pdfStream = new Readable();

      //   pdfStream.push(pdfBytes);
      //   pdfStream.push(null); // End of stream

      //   const remotePath = `/pdfs/${id}.pdf`;
      //   await client.uploadFrom(pdfStream, remotePath);
      //   client.close();

      //   const pdfUrl = `https://scotlandtitlesapp.com/pdfs/${id}.pdf`;
      //   console.log(pdfUrl, "pdfUrl");
      //   res.status(200).json({ pdfUrl });
      //   console.log(firstPage, "firstPage");
      //   console.log(pages, "pages");
      //   return;
      const page = pdfDoc.addPage([600, 800]);
      const embeddedPage = await pdfDoc.embedPage(page);
      const courierBoldFont = await pdfDoc.embedFont(StandardFonts.Courier);
      //For background Color
      // page.drawRectangle({
      //   color: rgb(0, 248, 220),
      //   width: page.getWidth(),
      //   height: page.getHeight(),
      // });
      // page.drawPage(embeddedPage);
      // page.setBackgroundColor(rgb()); // Set background color to yellow
      // const { width, height } = page.getSize();
      // page.drawRectangle({
      //   color: rgb(0.25, 0.52, 0.96),
      //   width: page.getWidth(),
      //   height: page.getHeight(),
      // });
      //   const filePath = path.resolve("./public", "images", "doctor-2.jpg");

      //   const imgBuffer = fs.readFileSync(filePath);
      //   // console.log(imgBuffer, "imgBuffer");
      //   const img = await pdfDoc.embedJpg(imgBuffer);
      //   // console.log(img, "img");
      //   page.drawImage(img, {
      //     width: page.getWidth(),
      //     height: page.getHeight(),
      //   });

      //   const content = "Hello from Shopify!"; // Replace with your Shopify data

      req.body.line_items.map((item) => {
        console.log(item, "itemmm");
        // var product = item;
        item.properties.map((propItem) => {
          if (propItem.name == "_Name1") {
            name1 = propItem.value;
          }
          console.log(propItem, "propItem");
        });
      });
      const date = "12th june 2022";
      const heading = `12th June 2022 Land with reference number  ${id}: Lord ${name1}`;
      const content = `Please find enclosed your Certificate \nof Disposition and Proclamation confirming you now own Land \n within a Scottish Estate . You may choose to adopt the traditional Scottish title of Laird as a sign of \n respect, or the English language equivalent \n. Your land is located within our Estate with street address of Kingseat Road (off Cantsdam Road), Cantsdam, Kelty, Fife, Scotland KY12 0SW. Your plot of land is located beside  Kingseat Road single track road that leads north from the B912 Cantsdam Road. You can view the land online. The following coordinates will show you the centre of the Estate; Google Maps type in  coordinates 56.1215718, - 3.3856475 Ordinance Survey 10 Figure Grid Reference N T 1 3956 92954 X Easting 313956 , Y Northing 692954 We hope that you have the opportunity to visit your land, and to enjoy the Scottish countryside as a Laird of Scotland . You can keep up to date via our Facebook page at fb.me/ScotlandTitles I very much hope that owning a piece of Scotland is something that will give you a sense of pride, and would like to take this opportunity to thank you for choosing Scotland Titles`;

      // const page = document.getPage(0);

      //   page.moveTo(72, 570);
      page.drawText(date, {
        x: 10,
        y: 590,
        size: 12,
        color: rgb(0, 0, 0),
      });
      page.drawText(heading, {
        x: 10,
        y: 570,
        size: 18,
        color: rgb(0, 0, 0),
      });

      page.drawText(content, {
        x: 10,
        y: 560,
        size: 12,
        color: rgb(0, 0, 0),
      });

      const pdfBytes = await pdfDoc.save();

      const pdfStream = new Readable();

      pdfStream.push(pdfBytes);
      pdfStream.push(null); // End of stream

      const remotePath = `/pdfs/${id}.pdf`;
      await client.uploadFrom(pdfStream, remotePath);
      client.close();

      const pdfUrl = `https://scotlandtitlesapp.com/pdfs/${id}.pdf`;
      console.log(pdfUrl, "pdfUrl");
      res.status(200).json({ pdfUrl });
      //   res.send(pdfBytes);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  };
  //   onlyLord();
  //   return;
  if (email && req.body.line_items.length > 0) {
    req.body.line_items.map((item) => {
      // if(product)
      if (item.product_id == 8727183196433) {
        if (item.properties) {
          item.properties.map((propItem) => {
            if (propItem.name != "Title2") {
              if (propItem.name == "_Title1" && propItem.value == "Lord") {
                onlyLord();
              } else if (
                propItem.name == "_Title1" &&
                propItem.value == "Lady"
              ) {
                onlyLord();
              } else if (
                propItem.name == "_Title1" &&
                propItem.value == "Laird"
              ) {
                onlyLord();
              } else {
                console.log("other than lord");
              }
            }
          });
        }
      } else {
        console.log("not foundddddd");
      }
    });
  } else {
    // res.status(200).json({ message: "error found" });
  }
}
