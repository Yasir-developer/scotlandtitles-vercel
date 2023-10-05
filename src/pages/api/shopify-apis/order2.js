// import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
// import fs from "fs";
// import * as ftp from "basic-ftp";
// import { Readable } from "stream";
// import doctorimg from "../../../../public/images/doctor-2.jpg";
// import path from "path";
// import { createWriteStream } from "fs";
// import pdfjs from "pdfjs-dist";

// export default async function handler(req, res) {
//   const client = new ftp.Client();
//   var name1;
//   await client.access({
//     host: "92.205.12.5",
//     port: 21, // FTP port
//     user: "yasir-ftp@scotlandtitlesapp.com",
//     password: "hP2PTSSotW!I",
//   });

//   const filePath = path.resolve("./pdfs", "DigitalPack.pdf");
//   console.log(filePath, "filePath");
//   const imgBuffer = fs.readFileSync(filePath);
//   console.log(imgBuffer, "imggg");
//   //   const pdfDoc = await PDFDocument.load(imgBuffer);
//   const pdfDocument = pdfjs.getDocument(
//     "https://scotlandtitlesapp.com/DigitalPack.pdf"
//   );
//   console.log(pdfDocument, "pdfDocument");

//   //   const pages = pdfDoc.getPages();

//   const pageNumber = 1;
//   const page = await pdfDocument.getPage(pageNumber);

//   // Set scale for rendering (adjust as needed)
//   const scale = 1.5;

//   // Get the viewport
//   const viewport = page.getViewport({ scale });

//   // Render the page
//   const renderContext = {
//     viewport: viewport,
//   };

//   const outputPdfPath = join(process.cwd(), "public", "output.pdf");
//   const writeStream = createWriteStream(outputPdfPath);

//   // Append text to the PDF page
//   const canvasStream = page.render(renderContext).stream();
//   canvasStream.on("data", (chunk) => {
//     console.log(chunk, "chunkchunk");
//     writeStream.write(chunk);
//   });

//   canvasStream.on("end", () => {
//     writeStream.end(() => {
//       res.status(200).json({ message: "Text appended to the PDF." });
//     });
//   });

//   canvasStream.on("error", (error) => {
//     res.status(500).json({ error: "Error appending text to the PDF." });
//   });

//   //   const pdfBytes = await pdfDoc.save();

//   //   const pdfStream = new Readable();

//   //   pdfStream.push(pdfBytes);
//   //   pdfStream.push(null); // End of stream

//   const remotePath = `/pdfs/${id}.pdf`;
//   await client.uploadFrom(canvasStream, remotePath);
//   client.close();

//   const pdfUrl = `https://scotlandtitlesapp.com/pdfs/${id}.pdf`;
//   console.log(pdfUrl, "pdfUrl");
//   res.status(200).json({ pdfUrl });

//   //   return pdfBytes;
// }
// // async function updateKeywordsInPDF(pdfBytes, keywordsToUpdate) {
// // //   const pdfDoc = await PDFDocument.load(pdfBytes);
// //   const filePath = path.resolve("./pdfs", "DigitalPack.pdf");
// //         const imgBuffer = fs.readFileSync(filePath);
// //         const pdfDoc = await PDFDocument.load(imgBuffer);
// //         const pages = pdfDoc.getPages();

// //   // Loop through pages and keywords
// //   pages.forEach((page)=> {
// //     keywordsToUpdate.forEach((keyword) => {
// //       const text = page.getText();

// //       if (text.includes('Lord')) {
// //         const updatedText = text.replace('Lord', 'Lady');
// //         page.drawText(updatedText, {
// //           x: 50,
// //           y: 50,
// //           size: 12,
// //           color: rgb(0, 0, 0),
// //         });
// //       }
// //     });
// //   });

// //   // Serialize the modified PDF
// //   const modifiedPdfBytes = await pdfDoc.save();

// //   return modifiedPdfBytes;
// // }

import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import * as ftp from "basic-ftp";
import { Readable } from "stream";
// import doctorimg from "../../../../public/images/doctor-2.jpg";
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
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  const onlyLord = async () => {
    console.log(email, "email");
    // return

    try {
      const page = pdfDoc.addPage([600, 800]);
      const pagetwo = pdfDoc.addPage([900, 600]);
      //w,     h
      const deedPage = pdfDoc.addPage([600, 800]);
      const emblemCertificate = pdfDoc.addPage([700, 800]);
      const tartanCertificate = pdfDoc.addPage([700, 800]);

      const embeddedPage = await pdfDoc.embedPage(page);
      const embeddedPagetwo = await pdfDoc.embedPage(pagetwo);

      const courierBoldFont = await pdfDoc.embedFont(StandardFonts.Courier);

      const filePath = path.resolve("./public", "images", "scotland_log.png");
      const fontBytes = fs.readFileSync(
        path.join("./utils", "fonts", "OLDENGL.TTF")
      );
      const customFont = await pdfDoc.embedFont(fontBytes);

      const imgBuffer = fs.readFileSync(filePath);
      // console.log(imgBuffer, "imgBuffer");
      const img = await pdfDoc.embedPng(imgBuffer);
      const pngDims = img.scale(0.25);

      const welcomeSignPath = path.resolve(
        "./public",
        "images",
        "g_signature.png"
      );
      const welcom_signature_Buffer = fs.readFileSync(welcomeSignPath);

      // console.log(imgBuffer, "imgBuffer");
      const welcome_emblem_signature = await pdfDoc.embedPng(
        welcom_signature_Buffer
      );

      // req.body.line_items.map((item) => {
      //   console.log(item, "itemmm");
      //   // var product = item;
      //   item.properties.map((propItem) => {
      //     if (propItem.name == "_Name1") {
      //       name1 = propItem.value;
      //     }
      //     if (propItem.name == "_Date") {
      //       pdfDate = propItem.value;
      //     }
      //     console.log(propItem, "propItem");
      //   });
      // });

      // const date = pdfDate;
      const date = "22-5-2024";

      const heading = `Land with reference number 321323223 Lord Craig of\nBlairadam`;
      const content = `Please find enclosed your Certificate of Disposition and Proclamation confirming you now own Land\nwithin a Scottish Estate . You may choose to adopt the traditional Scottish title of Laird as a sign of\nrespect, or the English language equivalent.\n\nYour land is located within our Estate with street address of Kingseat Road (off Cantsdam Road),\nCantsdam, Kelty, Fife, Scotland KY12 0SW. Your plot of land is located beside Kingseat Road single\ntrack road that leads north from the B912 Cantsdam Road.\n\nYou can view the land online. The following coordinates will show you the centre of the Estate;\n\nGoogle Maps type in  coordinates 56.1215718, - 3.3856475\nOrdinance Survey 10 Figure Grid Reference NT 13956 92954\nX Easting 313956 , Y Northing 692954\n\nWe hope that you have the opportunity to visit your land, and to enjoy the Scottish countryside as a\nLaird of Scotland . You can keep up to date via our Facebook page at fb.me/ScotlandTitles\n\nI very much hope that owning a piece of Scotland is something that will give you a sense of pride, and\nwould like to take this opportunity to thank you for choosing Scotland Titles`; // const page = document.getPage(0);
      const welcomeContent = `Welcome to Scotland!`; // const page = document.getPage(0);
      const welcomeSignContent = `Signed for\nand on behalf of\nScotland Titles`; // const page = document.getPage(0);
      const facebookContent = `Facebook:`; // const page = document.getPage(0);
      const facebookLink = `fb.me/ScotlandTitles`; // const page = document.getPage(0);
      const scotalndTitleAddress = `Scotland Titles, Unit 61892, PO Box 26965, Glasgow G1 9BW United Kingdom`; // const page = document.getPage(0);

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
      const timesRomanItalicFont = await pdfDoc.embedFont(
        StandardFonts.TimesRomanItalic
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
        y: 620,
        width: textWidth,
        height: textHeight,
        size: fontSize,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      page.drawText(welcomeContent, {
        x: 220,
        y: 320,
        width: textWidth,
        height: textHeight,
        size: 14,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      page.drawText(welcomeSignContent, {
        x: 50,
        y: 250,
        width: textWidth,
        height: textHeight,
        size: 14,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanItalicFont,
      });

      page.drawImage(welcome_emblem_signature, {
        x: 150,
        y: 210,
        height: 70,
        width: 50,
      });

      page.drawText(facebookContent, {
        x: 50,
        y: 170,
        width: textWidth,
        height: textHeight,
        size: 11,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      page.drawText(facebookLink, {
        x: 100,
        y: 170,
        width: textWidth,
        height: textHeight,
        size: 11,
        color: rgb(0.027, 0.388, 0.756),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      page.drawLine({
        start: { x: 100, y: 165 }, // Adjust the y-position for Form Field 3
        end: { x: 195, y: 165 }, // Adjust the y-position for Form Field 3
        color: rgb(0.027, 0.388, 0.756),
        thickness: 0.5,
      });

      page.drawText(scotalndTitleAddress, {
        x: 100,
        y: 70,
        width: textWidth,
        height: textHeight,
        size: 11,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      page.drawText("info@scotlandtitles.com", {
        x: 130,
        y: 50,
        width: textWidth,
        height: textHeight,
        size: 11,
        color: rgb(0.027, 0.388, 0.756),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      page.drawLine({
        start: { x: 130, y: 45 }, // Adjust the y-position for Form Field 3
        end: { x: 240, y: 45 }, // Adjust the y-position for Form Field 3
        color: rgb(0.027, 0.388, 0.756),
        thickness: 0.5,
      });

      page.drawText("www.ScotlandTitles.com", {
        x: 330,
        y: 50,
        width: textWidth,
        height: textHeight,
        size: 11,
        color: rgb(0.027, 0.388, 0.756),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      page.drawLine({
        start: { x: 330, y: 45 }, // Adjust the y-position for Form Field 3
        end: { x: 435, y: 45 }, // Adjust the y-position for Form Field 3
        color: rgb(0.027, 0.388, 0.756),
        thickness: 0.5,
      });
      page.drawImage(img, {
        x: 350,
        y: 690,
        width: pngDims.width,
        height: pngDims.height,
      });

      //Page Two of Certificate =========================================================

      //Image work
      const filePathTwo = path.resolve("./public", "images", "pdf-bg.jpg");

      const imgBufferTwo = fs.readFileSync(filePathTwo);
      // console.log(imgBuffer, "imgBuffer");
      const imgBg = await pdfDoc.embedJpg(imgBufferTwo);

      const filePathThree = path.resolve(
        "./public",
        "images",
        "certificate-stamp.png"
      );

      const imgBufferThree = fs.readFileSync(filePathThree);
      // console.log(imgBuffer, "imgBuffer");
      const stampImg = await pdfDoc.embedPng(imgBufferThree);
      const stampPngDims = stampImg.scale(0.3);

      const filePathFour = path.resolve(
        "./public",
        "images",
        "certificate-mid.png"
      );

      const imgBufferFour = fs.readFileSync(filePathFour);

      const filePathRibbon = path.resolve(
        "./public",
        "images",
        "scotland_ribbon.png"
      );

      const imgBufferRibbon = fs.readFileSync(filePathRibbon);
      // console.log(imgBuffer, "imgBuffer");
      const ribbonImg = await pdfDoc.embedPng(imgBufferRibbon);

      const pngDimsRibbon = ribbonImg.scale(0.25);

      const filePathYellow = path.resolve(
        "./public",
        "images",
        "yellow_middle.png"
      );

      const imgBufferYellowMiddle = fs.readFileSync(filePathYellow);
      // console.log(imgBuffer, "imgBuffer");
      const yellow_middle = await pdfDoc.embedPng(imgBufferYellowMiddle);
      const filePathSignaturetwo = path.resolve(
        "./public",
        "images",
        "signTwo.png"
      );
      const imgBufferSignaturetwo = fs.readFileSync(filePathSignaturetwo);
      // console.log(imgBuffer, "imgBuffer");
      const Signaturetwo = await pdfDoc.embedPng(imgBufferSignaturetwo);
      const SignaturetwodimsRibbon = ribbonImg.scale(0.25);

      // console.log(imgBuffer, "imgBuffer");
      const certificateMid = await pdfDoc.embedPng(imgBufferFour);
      const ertificateMidpngDims = certificateMid.scale(0.22);

      const fontTwo = fs.readFileSync(
        path.join("./utils", "fonts", "TempusSansITC-Bold.ttf")
      );
      const tempusFont = await pdfDoc.embedFont(fontTwo);

      const fontThree = fs.readFileSync(
        path.join("./utils", "fonts", "OLDENGL.TTF")
      );
      const oldEng = await pdfDoc.embedFont(fontThree);
      const certificateHeading = "Certificate of Disposition and Proclamation";
      const certficateAddress =
        "between Scotland Titles, Unit 61892, PO Box 26965, Glasgow G1 9BW United Kingdom and";

      const certficateUserName = "Lady Kathryn Joy Smith of Blairadam";

      const certificateAddressTwo =
        "(hereafter to be proclaimed as “THE LORD”), care of Unit 61892, PO Box 26965, Glasgow G1 9BW United Kingdom";

      const certificateText = `The Scotland Titles Estate in Fife, Scotland, hereinafter referred to as “THE ESTATE”,\nhas been partitioned into dedicated souvenir plots of land.\n
        THE LORD has petitioned unto Scotland Titles on this day their intention to\npurchase, and Scotland Titles has determined to accept the disposition of a plot of\nland within THE ESTATE, at Cantsdam, hereafter referred to as “THE LAND”.\n
        Scotland Titles, in CONSIDERATION of all monies due to be paid to us by THE\n LORD, of which we have received of in full, we do hereby DISCHARGE unto them\nand DISPONE to and in perpetuity in favour of THE LORD and to their future\nassignees the whole of THE LAND but always with pedestrian access only over THE\nESTATE; such rights of vehicular access are reserved to Scotland Titles and its\nsuccessors in title plus any and all others authorised by it; THE LORD covenants not\nto dispose of THE LAND in part only.\n
        Scotland Titles is a trading name of Olgrinmore Ltd., Jersey. Terms and Conditions,\nand this CERTIFICATE shall be governed by the Law of Scotland.`;

      const certificateTextTwo = `THE ESTATE location is KINGSEAT ROAD (OFF CANTSDAM ROAD),\nCANTSDAM, KELTY, FIFE, SCOTLAND KY12 0SW\n\nTHE ESTATE is recorded in the General Register of Sasines RS30-32\n\nCoordinates to the centre of THE ESTATE are;\nLatitude, Longitude in degrees 56°07${"`"}18′′N , 003°23′08′′W\nX Easting 313956 , Y Northing 692954\n\nThe Plot Number of THE LAND within THE ESTATE is 13334\n\nThe size of THE LAND is one square foot\n\nDate of Entry of THE LAND is as the date of this CERTIFICATE\n\nThis Disposition is signed for and on behalf of Scotland Titles and witnessed on the\n12th Day of June 2022`;
      pagetwo.drawImage(imgBg, {
        width: pagetwo.getWidth(),
        height: pagetwo.getHeight(),
      });

      pagetwo.drawImage(yellow_middle, {
        x: 400,
        y: 405,
        width: ertificateMidpngDims.width,
        height: ertificateMidpngDims.height,
      });
      pagetwo.drawImage(ribbonImg, {
        x: 30,
        y: 430,
        width: pngDimsRibbon.width,
        height: pngDimsRibbon.height,
      });

      pagetwo.drawImage(stampImg, {
        x: 720,
        y: 70,
        width: stampPngDims.width,
        height: stampPngDims.height,
      });

      pagetwo.drawImage(Signaturetwo, {
        x: 600,
        y: 70,
        height: 50,
        width: 100,
      });

      pagetwo.drawText("Witnessed", {
        x: 600,
        y: 60,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: tempusFont,
      });

      pagetwo.drawImage(welcome_emblem_signature, {
        x: 500,
        y: 70,
        height: 70,
        width: 50,
      });

      pagetwo.drawText("Signed", {
        x: 500,
        y: 60,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: tempusFont,
      });

      pagetwo.drawText(certificateHeading, {
        x: 200,
        y: 520,
        size: 26,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });
      pagetwo.drawText(certficateAddress, {
        x: 220,
        y: 500,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: tempusFont,
      });

      pagetwo.drawText(certficateUserName, {
        x: 215,
        y: 470,
        width: textWidth,
        height: textHeight,
        size: 24,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      pagetwo.drawText(certificateAddressTwo, {
        x: 195,
        y: 450,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: tempusFont,
      });

      pagetwo.drawText(certificateText, {
        x: 50,
        y: 370,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: tempusFont,
      });

      pagetwo.drawText(certificateTextTwo, {
        x: 450,
        y: 370,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: tempusFont,
      });

      //Page Three of Deed of certificate =========================================================

      const timesRomanItalicFontHeading = await pdfDoc.embedFont(
        StandardFonts.TimesRomanItalic
      );

      const MainHeading = "Master Title Deed";
      const SubHeading = "Deed of Change of Name and Title (Deed Poll)";
      const formerTitle = "(Former Name & Title)";
      const newTitle = "(New Name & Title)";

      const underlineHeight = 1;
      const underlineY = 680; // Adjust the y-position as needed

      // Adjust the x-positions as needed for each form field
      const underlineX7 = 410; // For Form Field 1
      const underlineX8 = 470;
      const underlineX1 = 240; // For Form Field 1
      const underlineX2 = 320; // For Form Field 1
      const underlineX3 = 110; // For Form Field 2
      const underlineX4 = 180; // For Form Field 2
      const underlineX5 = 60; // For Form Field 3
      const underlineX6 = 580; // For Form Field 3
      const deedFormTextPlaceHolder = "Home Address";

      const deedFormText = `of Craig Edward Smith ${formerTitle}\n\nnow Lord Craig Edward Smith ${newTitle}\n\nBY THIS DEED OF CHANGE OF NAME AND TITLE made by myself the undersigned\n\nLord Craig Edward Smith,\n\nof`;
      const declarationOne = `HEREBY DECLARE AS FOLLOWS;\n\n1.    I ABSOLUTELY and entirely renounce, relinquish and abandon the use of my said Former Name &\nTitle and assume, adopt and determine to take and use from the date hereof the New Name & Title in\nsubstitution for my Former Name & Title.`;
      const declarationTwo = `2.    I SHALL AT ALL TIMES hereafter in all records, deeds, documents and other writings and in all\nactions and proceedings as well as in all dealings and transactions and on all occasions whatsoever use and\nsubscribe the said New Name & Title as my name in substitution for my Former Name & Title so\nrelinquished as aforesaid to the intent that I may hereafter be called, known or distinguished by the New Name\n& Title only and not by the Former Name & Title.`;
      const declarationThree = `3.    I AUTHORISE AND REQUIRE all persons at all times to designate, describe and address me by my\nadopted New Name & Title.`;
      const declarationFour = `IN WITNESS whereof I have hereunto subscribed my adopted and substituted New Name & Title and also my\nFormer Name & Title.`;
      const signed = "SIGNED THIS";
      const day = "DAY OF";
      const year = "IN THE YEAR";
      const signedAs = "SIGNED AS A DEED AND DELIVERED\n\nby the above named";
      const signPlaceHolder = "Signature";
      const lordName = "Lord Craig Edward Smith\n\nFormerly known as";
      const formerName = "Craig Edward Smith";

      const presence = "In the presence of:";
      const witness = "Witness's signature";

      deedPage.drawText(MainHeading, {
        x: 200,
        y: 750,
        size: 20,
        width: textWidth,
        height: textHeight,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });
      deedPage.drawText(SubHeading, {
        x: 180,
        y: 730,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });

      deedPage.drawText(deedFormText, {
        x: 30,
        y: 710,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });

      deedPage.drawText(deedFormText, {
        x: 30,
        y: 710,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });

      deedPage.drawLine({
        start: { x: underlineX5, y: 600 }, // Adjust the y-position for Form Field 3
        end: { x: underlineX6, y: 600 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });

      deedPage.drawText(deedFormTextPlaceHolder, {
        x: 60,
        y: 600,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0.65, 0.65, 0.65),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanItalicFontHeading,
      });

      deedPage.drawText(declarationOne, {
        x: 30,
        y: 580,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });

      deedPage.drawText(declarationTwo, {
        x: 30,
        y: 500,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });
      deedPage.drawText(declarationThree, {
        x: 30,
        y: 420,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });

      deedPage.drawText(declarationFour, {
        x: 30,
        y: 370,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });

      deedPage.drawText(signed, {
        x: 30,
        y: 300,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });
      deedPage.drawLine({
        start: { x: underlineX3, y: 300 }, // Adjust the y-position for Form Field 3
        end: { x: underlineX4, y: 300 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });

      deedPage.drawText(day, {
        x: 190,
        y: 300,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });

      deedPage.drawLine({
        start: { x: underlineX1, y: 300 }, // Adjust the y-position for Form Field 3
        end: { x: underlineX2, y: 300 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });

      deedPage.drawText(year, {
        x: 330,
        y: 300,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });

      deedPage.drawText(signedAs, {
        x: 30,
        y: 270,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });

      deedPage.drawLine({
        start: { x: 30, y: 200 }, // Adjust the y-position for Form Field 3
        end: { x: 250, y: 200 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });
      deedPage.drawText(signPlaceHolder, {
        x: 40,
        y: 190,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0.65, 0.65, 0.65),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanItalicFontHeading,
      });

      deedPage.drawLine({
        start: { x: 30, y: 170 }, // Adjust the y-position for Form Field 3
        end: { x: 250, y: 170 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });

      deedPage.drawText(lordName, {
        x: 40,
        y: 155,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });

      deedPage.drawLine({
        start: { x: 30, y: 90 }, // Adjust the y-position for Form Field 3
        end: { x: 250, y: 90 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });

      deedPage.drawText(formerName, {
        x: 40,
        y: 75,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });

      deedPage.drawText(presence, {
        x: 270,
        y: 250,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });

      deedPage.drawText(witness, {
        x: 270,
        y: 225,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });

      deedPage.drawLine({
        start: { x: 370, y: 225 }, // Adjust the y-position for Form Field 3
        end: { x: 540, y: 225 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });

      deedPage.drawText("Name", {
        x: 270,
        y: 195,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });

      deedPage.drawLine({
        start: { x: 300, y: 195 }, // Adjust the y-position for Form Field 3
        end: { x: 540, y: 195 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });

      deedPage.drawText("Address", {
        x: 270,
        y: 160,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });

      deedPage.drawLine({
        start: { x: 310, y: 160 }, // Adjust the y-position for Form Field 3
        end: { x: 540, y: 160 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });
      deedPage.drawLine({
        start: { x: 270, y: 135 }, // Adjust the y-position for Form Field 3
        end: { x: 540, y: 135 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });
      deedPage.drawLine({
        start: { x: 270, y: 115 }, // Adjust the y-position for Form Field 3
        end: { x: 540, y: 115 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });

      deedPage.drawText("Occupation", {
        x: 270,
        y: 70,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });

      deedPage.drawLine({
        start: { x: 320, y: 70 }, // Adjust the y-position for Form Field 3
        end: { x: 540, y: 70 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });

      //Fourth Emblem certificate page =================================================================================

      const emblem_certificate_heading = `To All & Sundry whom these presents do concern\n
             Scotland Titles does declare that`;
      const emblemCertficateUserName = "Lord Craig Edward Smith";
      const petition = "Having By Petition";

      const emblemCertificateText = `UNTO US THIS DAY IN THIS`;
      const emblemCertificateTextTwo = `YEAR OF THE REIGN OF OUR SOVEREIGN CHARLES THE\nTHIRD, BY THE GRACE OF GOD, OF THE UNITED\nKINGDOM OF GREAT BRITAIN AND NORTHERN\nIRELAND, KING, HEAD OF THE COMMONWEALTH,\nDEFENDER OF THE FAITH\n\n`;

      const Shewen = "Shewen:";

      const emblemCertificateShewenText = `THAT THE SAID PETITIONER HAS`;
      const emblemCertificateShewenTextTwo = `OWNERSHIP OF LANDS IN SCOTLAND AND THE\nPETITIONER HAVING PREYED THAT THERE MIGHT BE\nGRANTED UNTO THEM TO USE SUCH ENSIGNS\nARMORIAL AS MAY BE THE LAWFUL PROPERTY OF\nSCOTLAND TITLES AND MIGHT BE SUITABLE AND\nACCORDING TO THE LAWS OF ARMS, KNOW YE\nTHEREFORE THAT WE HAVE ASSIGNED, AND DO BY\nTHESE PRESENTS DECLARE, RATIFY AND CONFIRM UNTO\nTHE PETITIONER THE FOLLOWING ENSIGNS ARMORIAL,\nAS DEPICTED HEREOF, AND MATRICULATED OF EVEN\nDATE WITH THESE PRESENTS AS A MARK OF THE\nINTELLECTUAL PROPERTY OF SCOTLAND TITLES, TO BE\nPRESENTED BY THE PETITIONER AS THEY DEEM,\n\n`;

      const videlicit = "Videlicit:";

      const emblemCertificateVidelicitText = `BY DEMONSTRATION OF WHICH ENSIGNS`;
      const emblemCertificateVidelicitTextTwo = `ARMORIAL THE SAID PETITIONER IS, AMONGST ALL\nNOBLES AND IN ALL PLACES OF HONOUR, TO BE\nTAKEN, NUMBERED, ACCOUNTED AND RECEIVED AS A\nLAIRD OF SCOTLAND,\n\n`;

      const testimony = "In Testimony Whereof:";

      const emblemCertificateTestimonyText = `WE HAVE SUBSCRIBED`;
      const emblemCertificateTestimonyTextTwo = `THESE PRESENTS AND THE SEAL OF OUR OFFICE IS\nAFFIXED HERETO AT SCOTLAND TITLES THIS DAY.\n\n`;

      const further = "furthermore know ye therefore that";
      const furtherDescription =
        "SCOTLAND TITLES HAS SET OUT PART OF THE ESTATE BY\nBLAIRADAM FOREST KNOWN AS CANTSDAM, FIFE,\nSCOTLAND, HEREINAFTER REFERRED TO AS ‘THE\nESTATE’, AS A SCHEME OF SOUVENIR PLOTS AND";
      // const furtherDescriptionTwo =
      //   "Laird, in such display of the proscribed ensemble robes are to\nbe received with honour in all of Scotland,";

      const Scilicet = "Scilicet";
      const scilicetSubDescription = "BY VIRTUE OF OWNERSHIP OF THE LAND IN ";
      const ScilicetDescription =
        "SCOTLAND AND IN PARTICULAR THE LAND DESCRIBED\nABOVE WITHIN THE KINGDOM OF FIFE BY CANTSDAM\nAS FURTHER DESCRIBEDIN THE CERTIFICATE OF\nDISPOSITION AND PROCLAMATION, THE PETITIONER\nMAY HENCEFORTH AND IN PERPETUITY BE KNOWN BY\nTHE STYLE OF LAIRD AND IN PARTICULAR LAIRD OF\nBLAIRADAM.";
      //Signed content

      const emblemSigned = "Signed";

      const dateText = "Date";
      const dateContent = "THIS 4TH DAY OF JUNE IN THE YEAR 2022";
      const copyright =
        "All content, layout, artwork and illustrations copyright Scotland Titles 2021 and subject to licence";

      const emblemBgPath = path.resolve("./public", "images", "emblem_bg.png");

      const emblembg_Buffer = fs.readFileSync(emblemBgPath);

      // console.log(imgBuffer, "imgBuffer");
      const emblem_bg = await pdfDoc.embedPng(emblembg_Buffer);
      // const ertificateMidpngDims = certificateMid.scale(0.22);
      const emblemmiddlegPath = path.resolve("./public", "images", "stick.png");

      const emblem_middle_Buffer = fs.readFileSync(emblemmiddlegPath);

      // console.log(imgBuffer, "imgBuffer");
      const emblem_middle = await pdfDoc.embedPng(emblem_middle_Buffer);

      const emblemlogoPath = path.resolve(
        "./public",
        "images",
        "emblem_logo.png"
      );

      const emblem_logo_Buffer = fs.readFileSync(emblemlogoPath);

      // console.log(imgBuffer, "imgBuffer");
      const emblem_logo = await pdfDoc.embedPng(emblem_logo_Buffer);

      const emblemsignPath = path.resolve(
        "./public",
        "images",
        "g_signature.png"
      );
      const emblem_signature_Buffer = fs.readFileSync(emblemsignPath);

      // console.log(imgBuffer, "imgBuffer");
      const emblem_signature = await pdfDoc.embedPng(emblem_signature_Buffer);

      emblemCertificate.drawImage(emblem_bg, {
        width: emblemCertificate.getWidth(),
        height: emblemCertificate.getHeight(),
      });

      emblemCertificate.drawImage(certificateMid, {
        x: 300,
        y: 610,
        width: ertificateMidpngDims.width,
        height: ertificateMidpngDims.height,
      });
      emblemCertificate.drawImage(img, {
        x: 40,
        y: 660,
        width: pngDims.width,
        height: pngDims.height,
      });

      emblemCertificate.drawImage(stampImg, {
        x: 590,
        y: 70,
        width: stampPngDims.width,
        height: stampPngDims.height,
      });

      emblemCertificate.drawText(emblem_certificate_heading, {
        x: 200,
        y: 700,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(emblemCertficateUserName, {
        x: 200,
        y: 640,
        width: textWidth,
        height: textHeight,
        size: 26,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(petition, {
        x: 40,
        y: 580,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(emblemCertificateText, {
        x: 170,
        y: 580,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      emblemCertificate.drawText(emblemCertificateTextTwo, {
        x: 40,
        y: 565,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //shewen text

      emblemCertificate.drawText(Shewen, {
        x: 40,
        y: 490,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(emblemCertificateShewenText, {
        x: 100,
        y: 490,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      emblemCertificate.drawText(emblemCertificateShewenTextTwo, {
        x: 40,
        y: 475,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //videlict

      emblemCertificate.drawText(videlicit, {
        x: 40,
        y: 290,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(emblemCertificateVidelicitText, {
        x: 115,
        y: 290,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      emblemCertificate.drawText(emblemCertificateVidelicitTextTwo, {
        x: 40,
        y: 275,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //In Testimony Whereof

      emblemCertificate.drawText(testimony, {
        x: 40,
        y: 210,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(emblemCertificateTestimonyText, {
        x: 195,
        y: 210,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      emblemCertificate.drawText(emblemCertificateTestimonyTextTwo, {
        x: 40,
        y: 195,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //middle line image ===========

      emblemCertificate.drawImage(emblem_middle, {
        x: 340,
        y: 170,
        height: 430,
        // width: ertificateMidpngDims.width,
        // height: ertificateMidpngDims.height,
      });

      emblemCertificate.drawImage(emblem_logo, {
        x: 380,
        y: 340,
        height: 250,
        width: 250,
      });

      emblemCertificate.drawText(further, {
        x: 380,
        y: 330,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(furtherDescription, {
        x: 380,
        y: 310,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      emblemCertificate.drawText(Scilicet, {
        x: 380,
        y: 250,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(scilicetSubDescription, {
        x: 430,
        y: 250,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      emblemCertificate.drawText(ScilicetDescription, {
        x: 380,
        y: 235,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //SIGNED
      emblemCertificate.drawText(emblemSigned, {
        x: 200,
        y: 110,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(dateText, {
        x: 220,
        y: 80,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(dateContent, {
        x: 260,
        y: 80,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      emblemCertificate.drawText(copyright, {
        x: 240,
        y: 70,
        width: textWidth,
        height: textHeight,
        size: 6,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      emblemCertificate.drawImage(emblem_signature, {
        x: 260,
        y: 100,
        height: 50,
        width: 50,
      });

      //page 5 Tartan certificate ==============================================================================

      const tartan_certificate_heading = `To Whomsoever These Presents Do Concern`;
      const tartanCertficateUserName = "Lord Craig Edward Smith";
      const declare = "Does Declare";
      const Allegiance = "Clan Allegiance";
      const prey = "and Prey to Wear";

      const certified = "Certified Tartan";
      const Greeting = "Scotland Titles send Greeting";

      const tartanCertificateGreetingText = `and do declare that`;
      const tartanCertificateGreetingTextTwo = `having by petition unto us unto this day,\n\n`;

      const know = "Let It Be Known";

      const tartanCertificateknowText = `that the said by virtue of ownership`;
      const tartanCertificateknowTextTwo = `of Land in Scotland and in particular the Land within the\nKingdom of Fife by Cantsdam as described in the Disposition\nand Certificate of Sale, the Petitioner is henceforth and in\nperpetuity amongst all nobles and in all places of honour, to\nbe taken, numbered, accounted and received as a Laird of\nScotland,\n\n`;

      const Therefore = "Know Ye Therefore";

      const tartanCertificateThereforeText = `that the Petitioner having preyed`;
      const tartanCertificateThereforeTextTwo = `that there might be granted unto them to use such Scottish\nTartan as set in law during the dress act of 1746 as repealed in\n1782 and thereinafter adopted, acknowledged and recognised\nas the symbolic National Dress of Scotland,\n\n`;

      const scotlantTiles = "Scilicet that Scotland Titles";

      const tartanCertificateScotlantTilesText = `has assigned, and do by`;
      const tartanCertificateScotlantTilesTextTwo = `these presents assign, ratify and confirm unto the Petitioner\nthe following ensemble robes in such tartan as is depicted\nupon the margin sinister hereof, and award unto the\nPetitioner the rights to use, wear, display and earasay such\nregistered Scottish Tartan in exchange for their sworn\nallegiance to the Clan of Scotland,\n\n`;

      const Tartan = "Videlicet such Tartan";
      const tartanCertificateText = "as is official and certified as set";
      const tartanCertificateTextTwo =
        "out in the Scottish Register of Tartans act 2008 administered\nby the National Records of Scotland with advice from the\nCourt of the Lord Lyon and the Registrar General for Scotland\nacting as the Keeper of the Scottish Register of Tartans,";
      const demostration = "By demonstration of";

      const demonstrationText = " which ensemble robes the said";
      const demonstrationTextTwo =
        "Petitioner is, amongst all nobles and in all places of honour, to\nbe received as a Laird of Scotland,"; //Signed content

      const tartanFurther = "Furthermore by ownership";
      const tartanFurtherDescription = "of lands in Scotland, the";
      const tartanFurtherDescriptionTwo =
        "Laird, in such display of the proscribed ensemble robes are to\nbe received with honour in all of Scotland,";

      const tartanTestimony = "In Testimony whereof";
      const tartanTestimonyDescription = "we have subscribed these";
      const tartanTestimonyDescriptionTwo =
        "presents and the seal of our office is affixed hereto at Scotland\nTitles this day in this year of the reign of our sovereign Charles\nthe Third, by the Grace of God, of the United Kingdom of\nGreat Britain and Northern Ireland, King, Head of the\nCommonwealth, Defender of the Faith, and in the Year of our\nLord stated henceforth.";

      const tartanSigned = "Signed";

      // const dateText = "Date";
      // const dateContent = "THIS 4TH DAY OF JUNE IN THE YEAR 2022";
      // const copyright =
      //  "All content, layout, artwork and illustrations copyright Scotland Titles 2021 and subject to licence";

      const tartanBgPath = path.resolve("./public", "images", "tartan_bg.png");

      const tartanbg_Buffer = fs.readFileSync(tartanBgPath);

      // console.log(imgBuffer, "imgBuffer");
      const tartan_bg = await pdfDoc.embedPng(tartanbg_Buffer);
      // const ertificateMidpngDims = certificateMid.scale(0.22);

      const tartanlogoPath = path.resolve(
        "./public",
        "images",
        "tartan_logo.jpg"
      );

      const tartan_logo_Buffer = fs.readFileSync(tartanlogoPath);

      // console.log(imgBuffer, "imgBuffer");
      const tartan_logo = await pdfDoc.embedJpg(tartan_logo_Buffer);

      const tartansignPath = path.resolve(
        "./public",
        "images",
        "g_signature.png"
      );
      const tartan_signature_Buffer = fs.readFileSync(tartansignPath);

      // console.log(imgBuffer, "imgBuffer");
      const tartan_signature = await pdfDoc.embedPng(tartan_signature_Buffer);

      tartanCertificate.drawImage(tartan_bg, {
        width: tartanCertificate.getWidth(),
        height: tartanCertificate.getHeight(),
      });

      tartanCertificate.drawImage(img, {
        x: 600,
        y: 680,
        width: pngDims.width,
        height: pngDims.height,
      });

      tartanCertificate.drawImage(stampImg, {
        x: 580,
        y: 60,
        width: stampPngDims.width,
        height: stampPngDims.height,
      });

      tartanCertificate.drawText(tartan_certificate_heading, {
        x: 200,
        y: 710,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(tartanCertficateUserName, {
        x: 210,
        y: 680,
        width: textWidth,
        height: textHeight,
        size: 26,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(declare, {
        x: 300,
        y: 650,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(Allegiance, {
        x: 100,
        y: 620,
        size: 26,
        width: textWidth,
        height: textHeight,
        color: rgb(0.054, 0.027, 0.301),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(prey, {
        x: 280,
        y: 620,
        size: 18,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(certified, {
        x: 420,
        y: 620,
        size: 26,
        width: textWidth,
        height: textHeight,
        color: rgb(0.054, 0.027, 0.301),

        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawImage(certificateMid, {
        x: 300,
        y: 590,
        width: ertificateMidpngDims.width,
        height: ertificateMidpngDims.height,
      });
      tartanCertificate.drawText(Greeting, {
        x: 40,
        y: 570,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(tartanCertificateGreetingText, {
        x: 240,
        y: 570,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(tartanCertificateGreetingTextTwo, {
        x: 40,
        y: 555,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //shewen text

      tartanCertificate.drawText(know, {
        x: 40,
        y: 530,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(tartanCertificateknowText, {
        x: 168,
        y: 530,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(tartanCertificateknowTextTwo, {
        x: 40,
        y: 515,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //videlict

      tartanCertificate.drawText(Therefore, {
        x: 40,
        y: 425,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(tartanCertificateThereforeText, {
        x: 165,
        y: 425,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(tartanCertificateThereforeTextTwo, {
        x: 40,
        y: 410,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //In Testimony Whereof

      tartanCertificate.drawText(scotlantTiles, {
        x: 40,
        y: 350,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(tartanCertificateScotlantTilesText, {
        x: 225,
        y: 350,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(tartanCertificateScotlantTilesTextTwo, {
        x: 40,
        y: 335,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(Tartan, {
        x: 40,
        y: 250,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(tartanCertificateText, {
        x: 185,
        y: 250,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(tartanCertificateTextTwo, {
        x: 40,
        y: 235,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(demostration, {
        x: 40,
        y: 170,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(demonstrationText, {
        x: 182,
        y: 170,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(demonstrationTextTwo, {
        x: 40,
        y: 155,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText("Royal Stewart Hunting", {
        x: 400,
        y: 570,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawImage(tartan_logo, {
        x: 400,
        y: 310,
        height: 250,
        width: 250,
      });

      tartanCertificate.drawText(tartanFurther, {
        x: 380,
        y: 280,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(tartanFurtherDescription, {
        x: 550,
        y: 280,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(tartanFurtherDescriptionTwo, {
        x: 380,
        y: 265,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(tartanTestimony, {
        x: 380,
        y: 230,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(tartanTestimonyDescription, {
        x: 525,
        y: 230,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(tartanTestimonyDescriptionTwo, {
        x: 380,
        y: 215,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //SIGNED
      tartanCertificate.drawText(tartanSigned, {
        x: 200,
        y: 100,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(dateText, {
        x: 220,
        y: 70,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(dateContent, {
        x: 260,
        y: 70,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(copyright, {
        x: 240,
        y: 60,
        width: textWidth,
        height: textHeight,
        size: 6,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      tartanCertificate.drawImage(tartan_signature, {
        x: 260,
        y: 90,
        height: 50,
        width: 50,
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

  // onlyLord();
  // return;
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
