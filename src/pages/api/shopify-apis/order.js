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
      const pagetwo = pdfDoc.addPage([900, 600]);
      const deedPage = pdfDoc.addPage([600, 800]);

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
      const pngDims = img.scale(0.22);

      //   // console.log(img, "img");
      //   page.drawImage(img, {
      //     width: page.getWidth(),
      //     height: page.getHeight(),
      //   });

      //   const content = "Hello from Shopify!"; // Replace with your Shopify data

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

      // console.log(imgBuffer, "imgBuffer");
      const certificateMid = await pdfDoc.embedPng(imgBufferFour);
      const ertificateMidpngDims = certificateMid.scale(0.22);

      const fontTwo = fs.readFileSync(
        path.join("./utils", "fonts", "TempusSansITCBold.ttf")
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

      pagetwo.drawImage(certificateMid, {
        x: 400,
        y: 405,
        width: ertificateMidpngDims.width,
        height: ertificateMidpngDims.height,
      });
      pagetwo.drawImage(img, {
        x: 40,
        y: 450,
        width: pngDims.width,
        height: pngDims.height,
      });

      pagetwo.drawImage(stampImg, {
        x: 700,
        y: 50,
        width: stampPngDims.width,
        height: stampPngDims.height,
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

      // const underlineHeight = 1;
      // const underlineY = textHeight - fontSize;
      // const underlineX1 = 100; // Adjust the starting x-position of the underline
      // const underlineX2 = 250; // Adjust the ending x-position of the underline
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
  onlyLord();
  return;
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
