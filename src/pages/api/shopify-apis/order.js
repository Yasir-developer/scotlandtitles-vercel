import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import * as ftp from "basic-ftp";
import { Readable } from "stream";
import doctorimg from "../../../../public/images/doctor-2.jpg";
import path from "path";
import fontkit from "@pdf-lib/fontkit";

export default async function handler(req, res) {
  console.log("hard code");
  const client = new ftp.Client();
  var name1;
  var pdfDate;
  // var pdfDate
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
      pdfDoc.registerFontkit(fontkit);

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
      const pagetwo = pdfDoc.addPage([800, 600]);
      const embeddedPage = await pdfDoc.embedPage(page);
      const embeddedPagetwo = await pdfDoc.embedPage(pagetwo);

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
      // const pngImage = await pdfDoc.embedPng(pngImageBytes)

      const filePath = path.resolve("./public", "images", "scotland_log.png");
      const fontBytes = fs.readFileSync(
        path.join("./utils", "fonts", "OLDENGL.TTF")
      );
      const customFont = await pdfDoc.embedFont(fontBytes);

      const imgBuffer = fs.readFileSync(filePath);
      // console.log(imgBuffer, "imgBuffer");
      const img = await pdfDoc.embedPng(imgBuffer);
      const pngDims = img.scale(0.22);

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
          if (propItem.name == "_Date") {
            pdfDate = propItem.value;
          }
          console.log(propItem, "propItem");
        });
      });

      const date = pdfDate;
      const heading = `Land with reference number ${id}: Lord ${name1} of\nBlairadam`;
      const content = `Please find enclosed your Certificate of Disposition and Proclamation confirming you now own Land\nwithin a Scottish Estate . You may choose to adopt the traditional Scottish title of Laird as a sign of\nrespect, or the English language equivalent.\n\nYour land is located within our Estate with street address of Kingseat Road (off Cantsdam Road),\nCantsdam, Kelty, Fife, Scotland KY12 0SW. Your plot of land is located beside Kingseat Road single\ntrack road that leads north from the B912 Cantsdam Road.\n\nYou can view the land online. The following coordinates will show you the centre of the Estate;\n\nGoogle Maps type in  coordinates 56.1215718, - 3.3856475\nOrdinance Survey 10 Figure Grid Reference NT 13956 92954\nX Easting 313956 , Y Northing 692954\n\nWe hope that you have the opportunity to visit your land, and to enjoy the Scottish countryside as a\nLaird of Scotland . You can keep up to date via our Facebook page at fb.me/ScotlandTitles\n\nI very much hope that owning a piece of Scotland is something that will give you a sense of pride, and\nwould like to take this opportunity to thank you for choosing Scotland Titles`; // const page = document.getPage(0);
      const welcomeContent = `Welcome to Scotland!`; // const page = document.getPage(0);

      //Font work

      const fontSize = 11;
      const headingFontSize = 14;
      const textWidth = page.getWidth() - 100; // Adjust the width as needed
      const textHeight = page.getHeight() - 50;
      //   page.moveTo(72, 570);
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      const timesRomanFontHeading = await pdfDoc.embedFont(
        StandardFonts.TimesRomanBold
      );

      page.drawText(date, {
        x: 50,
        y: 710,
        size: fontSize,
        width: textWidth,
        height: textHeight,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      page.drawText(heading, {
        x: 50,
        y: 650,
        width: textWidth,
        height: textHeight,
        size: headingFontSize,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFontHeading,
      });

      page.drawText(content, {
        x: 50,
        y: 600,
        width: textWidth,
        height: textHeight,
        size: fontSize,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      page.drawText(welcomeContent, {
        x: 170,
        y: 300,
        width: textWidth,
        height: textHeight,
        size: fontSize,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      page.drawImage(img, {
        x: 350,
        y: 690,
        width: pngDims.width,
        height: pngDims.height,
      });

      //Page Two of certificate

      //Image work
      const filePathTwo = path.resolve("./public", "images", "pdf-bg.jpg");

      const imgBufferTwo = fs.readFileSync(filePathTwo);
      // console.log(imgBuffer, "imgBuffer");
      const imgBg = await pdfDoc.embedJpg(imgBufferTwo);

      const fontTwo = fs.readFileSync(
        path.join("./utils", "fonts", "TEMPSITC.TTF")
      );
      const tempusFont = await pdfDoc.embedFont(fontTwo);

      const fontThree = fs.readFileSync(
        path.join("./utils", "fonts", "OLDENGL.TTF")
      );
      const oldEng = await pdfDoc.embedFont(fontThree);
      const certificateHeading = "Certificate of Disposition and Proclamation";
      const certficateAddress =
        "between Scotland Titles, Unit 61892, PO Box 26965, Glasgow G1 9BW United Kingdom and";

      const certficateUserName = "Lady Kathryn Joy Smith ofBlairadam";

      const certificateAddressTwo =
        "(hereafter to be proclaimed as “THE LORD”), care of Unit 61892, PO Box 26965, Glasgow G1 9BW United Kingdom";
      pagetwo.drawImage(imgBg, {
        width: pagetwo.getWidth(),
        height: pagetwo.getHeight(),
      });
      pagetwo.drawText(certificateHeading, {
        x: 150,
        y: 570,
        size: 26,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });
      pagetwo.drawText(certficateAddress, {
        x: 170,
        y: 550,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: tempusFont,
      });

      pagetwo.drawText(certficateUserName, {
        x: 165,
        y: 530,
        width: textWidth,
        height: textHeight,
        size: 24,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      pagetwo.drawText(certficateAddress, {
        x: 145,
        y: 510,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: tempusFont,
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
