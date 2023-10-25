import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import * as ftp from "basic-ftp";
import { Readable } from "stream";
// import doctorimg from "../../../../public/images/doctor-2.jpg";
import path from "path";
import fontkit from "@pdf-lib/fontkit";
import { pid } from "process";

export default async function handler(req, res) {
  const titlePackId = 8727183196433;
  const emblemId = 8727183065361;
  const tartanId = 8727183032593;
  const freeTartanId = 8727182704913;
  const freeEmblemId = 8950348644625;

  const client = new ftp.Client();

  await client.access({
    host: "92.205.12.5",
    port: 21, // FTP port
    user: "yasir-ftp@scotlandtitlesapp.com",
    password: "hP2PTSSotW!I",
  });

  const { id, email, created_at, order_number } = req.body;

  const pdfDoc = await PDFDocument.create();
  const pdfDocPrinted = await PDFDocument.create();

  pdfDoc.registerFontkit(fontkit);
  pdfDocPrinted.registerFontkit(fontkit);

  const fontSize = 11;
  const headingFontSize = 14;

  //=========================== global variables ===========================

  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman, {
    subset: true,
  });
  const timesRomanFontPrinted = await pdfDocPrinted.embedFont(
    StandardFonts.TimesRoman
  );

  const fontTwo = fs.readFileSync(
    path.join(process.cwd(), "public", "Goudy-Bold-Regular.ttf")
  );

  const tempusFont = await pdfDoc.embedFont(fontTwo, {
    subset: true,
  });
  const tempusFontPrinted = await pdfDocPrinted.embedFont(fontTwo, {
    subset: true,
  });

  const fontThree = fs.readFileSync(
    path.join(process.cwd(), "public", "OLDENGL.TTF")
  );
  const oldEng = await pdfDoc.embedFont(fontThree, {
    subset: true,
  });
  const oldEngPrinted = await pdfDocPrinted.embedFont(fontThree, {
    subset: true,
  });

  const timesRomanFontHeading = await pdfDoc.embedFont(
    StandardFonts.TimesRomanBold,
    { subset: true }
  );
  const timesRomanFontHeadingPrinted = await pdfDocPrinted.embedFont(
    StandardFonts.TimesRomanBold,
    { subset: true }
  );
  const timesRomanItalicFont = await pdfDoc.embedFont(
    StandardFonts.TimesRomanItalic,
    { subset: true }
  );
  const timesRomanItalicFontPrinted = await pdfDocPrinted.embedFont(
    StandardFonts.TimesRomanItalic,
    { subset: true }
  );
  // const timesRomanItalicFontHeading = await pdfDoc.embedFont(
  //   StandardFonts.TimesRomanItalic
  // );

  //=========================== end global variables ===========================

  const titlePack = async (propObject) => {
    let titleConditions;

    // console.log(propObject, "title pack propObject");

    try {
      if (propObject.p_8727183196433.variant.includes("Printed Pack")) {
        console.log("Printed Pack =============");
        if (propObject.p_8727183196433._Title2) {
          console.log("herrrrrrrrrrrrreeeeee");
          var page = pdfDoc.addPage([595, 842]);
          var pagetwo = pdfDoc.addPage([842, 595]);
          var deedPage = pdfDoc.addPage([595, 842]);
          var deedPageTwo = pdfDoc.addPage([595, 842]);
          var printedPage = pdfDocPrinted.addPage([595, 842]);
          var printedpagetwo = pdfDocPrinted.addPage([842, 595]);
          var printeddeedPage = pdfDocPrinted.addPage([595, 842]);
          var printeddeedPageTwo = pdfDocPrinted.addPage([595, 842]);
        } else {
          var page = pdfDoc.addPage([595, 842]);
          var pagetwo = pdfDoc.addPage([842, 595]);
          var deedPage = pdfDoc.addPage([595, 842]);
          var printedPage = pdfDocPrinted.addPage([595, 842]);
          var printedpagetwo = pdfDocPrinted.addPage([842, 595]);
          var printeddeedPage = pdfDocPrinted.addPage([595, 842]);
        }
      } else {
        if (propObject.p_8727183196433._Title2) {
          console.log("herrrrrrrrrrrrreeeeee");
          var page = pdfDoc.addPage([595, 842]);
          var pagetwo = pdfDoc.addPage([842, 595]);
          var deedPage = pdfDoc.addPage([595, 842]);
          var deedPageTwo = pdfDoc.addPage([595, 842]);
        } else {
          var page = pdfDoc.addPage([595, 842]);
          var pagetwo = pdfDoc.addPage([842, 595]);
          var deedPage = pdfDoc.addPage([595, 842]);
        }
      }
      const filePath = path.resolve("./public", "images", "scotland_log.png");

      const imgBuffer = fs.readFileSync(filePath);
      // console.log(imgBuffer, "imgBuffer");
      const img = await pdfDoc.embedPng(imgBuffer);
      const img_printed = await pdfDocPrinted.embedPng(imgBuffer);

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

      const welcome_emblem_signature_printed = await pdfDocPrinted.embedPng(
        welcom_signature_Buffer
      );

      //capital Name
      let firstPageNameParts = propObject.p_8727183196433._Name1.split(" ");
      console.log(firstPageNameParts, "nameParts");
      let firstPageModifiedName = firstPageNameParts
        .map(
          (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        )
        .join(" ");
      console.log(firstPageModifiedName, "modified name");

      //two name
      if (propObject.p_8727183196433._Title2) {
        let firstPageNamePartsTwo =
          propObject.p_8727183196433._Name2.split(" ");
        console.log(firstPageNamePartsTwo, "nameParts");
        var firstModifiedNameTwo = firstPageNamePartsTwo
          .map(
            (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
          )
          .join(" ");
        console.log(firstModifiedNameTwo, "title modified name two");
      }

      const heading = `Land with reference number ${order_number} ${
        propObject.p_8727183196433.reference != 0
          ? `- ${propObject.p_8727183196433.reference}`
          : ""
      } ${propObject.p_8727183196433._Title1} ${firstPageModifiedName} ${
        propObject.p_8727183196433._Title2
          ? `& ${propObject.p_8727183196433._Title2}\n${firstModifiedNameTwo}`
          : ""
      } of ${!propObject.p_8727183196433._Name2 ? `\n` : ""}Blairadam`;
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

      page.drawText(propObject.p_8727183196433._Date, {
        x: 70,
        y: 710,
        size: fontSize,
        width: textWidth,
        height: textHeight,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      page.drawText(heading, {
        x: 70,
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
        x: 70,
        y: 620,
        width: textWidth,
        height: textHeight,
        size: fontSize,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      page.drawText(welcomeContent, {
        x: 240,
        y: 320,
        width: textWidth,
        height: textHeight,
        size: 14,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      page.drawText(welcomeSignContent, {
        x: 70,
        y: 250,
        width: textWidth,
        height: textHeight,
        size: 14,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanItalicFont,
      });

      page.drawImage(welcome_emblem_signature, {
        x: 170,
        y: 210,
        height: 70,
        width: 50,
      });

      page.drawText(facebookContent, {
        x: 70,
        y: 170,
        width: textWidth,
        height: textHeight,
        size: 11,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      page.drawText(facebookLink, {
        x: 120,
        y: 170,
        width: textWidth,
        height: textHeight,
        size: 11,
        color: rgb(0.027, 0.388, 0.756),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      page.drawLine({
        start: { x: 120, y: 165 }, // Adjust the y-position for Form Field 3
        end: { x: 215, y: 165 }, // Adjust the y-position for Form Field 3
        color: rgb(0.027, 0.388, 0.756),
        thickness: 0.5,
      });

      page.drawText(scotalndTitleAddress, {
        x: 120,
        y: 70,
        width: textWidth,
        height: textHeight,
        size: 11,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      page.drawText("info@scotlandtitles.com", {
        x: 150,
        y: 50,
        width: textWidth,
        height: textHeight,
        size: 11,
        color: rgb(0.027, 0.388, 0.756),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      page.drawLine({
        start: { x: 150, y: 45 }, // Adjust the y-position for Form Field 3
        end: { x: 260, y: 45 }, // Adjust the y-position for Form Field 3
        color: rgb(0.027, 0.388, 0.756),
        thickness: 0.5,
      });

      page.drawText("www.ScotlandTitles.com", {
        x: 350,
        y: 50,
        width: textWidth,
        height: textHeight,
        size: 11,
        color: rgb(0.027, 0.388, 0.756),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      page.drawLine({
        start: { x: 350, y: 45 }, // Adjust the y-position for Form Field 3
        end: { x: 460, y: 45 }, // Adjust the y-position for Form Field 3
        color: rgb(0.027, 0.388, 0.756),
        thickness: 0.5,
      });
      page.drawImage(img, {
        x: 440,
        y: 690,
        width: pngDims.width,
        height: pngDims.height,
      });

      //Certificate title

      const filePathTwo = path.resolve("./public", "images", "pdf-bg.jpg");

      const imgBufferTwo = fs.readFileSync(filePathTwo);
      // console.log(imgBuffer, "imgBuffer");
      const imgBg = await pdfDoc.embedJpg(imgBufferTwo);

      const border = path.resolve("./public", "images", "borders.jpg");

      const border_Buffer = fs.readFileSync(border);

      const titlePack_borders = await pdfDocPrinted.embedJpg(border_Buffer);

      const filePathThree = path.resolve(
        "./public",
        "images",
        "certificate-stamp.png"
      );

      const imgBufferThree = fs.readFileSync(filePathThree);
      // console.log(imgBuffer, "imgBuffer");
      const stampImg = await pdfDoc.embedPng(imgBufferThree);

      const stampImgPrinted = await pdfDocPrinted.embedPng(imgBufferThree);

      const stampPngDims = stampImg.scale(0.3);

      const filePathRibbon = path.resolve(
        "./public",
        "images",
        "scotland_ribbon.png"
      );

      const imgBufferRibbon = fs.readFileSync(filePathRibbon);
      // console.log(imgBuffer, "imgBuffer");
      const ribbonImg = await pdfDoc.embedPng(imgBufferRibbon);
      const ribbonImgPrinted = await pdfDocPrinted.embedPng(imgBufferRibbon);

      const pngDimsRibbon = ribbonImg.scale(0.3);

      const filePathYellow = path.resolve(
        "./public",
        "images",
        "yellow_middle.png"
      );

      const imgBufferYellowMiddle = fs.readFileSync(filePathYellow);
      // console.log(imgBuffer, "imgBuffer");
      const yellow_middle = await pdfDoc.embedPng(imgBufferYellowMiddle);
      const yellow_middle_printed = await pdfDocPrinted.embedPng(
        imgBufferYellowMiddle
      );

      const filePathSignaturetwo = path.resolve(
        "./public",
        "images",
        "signTwo.png"
      );
      const imgBufferSignaturetwo = fs.readFileSync(filePathSignaturetwo);
      // console.log(imgBuffer, "imgBuffer");
      const Signaturetwo = await pdfDoc.embedPng(imgBufferSignaturetwo);
      const SignaturetwoPrinted = await pdfDocPrinted.embedPng(
        imgBufferSignaturetwo
      );

      const SignaturetwodimsRibbon = ribbonImg.scale(0.25);

      // console.log(imgBuffer, "imgBuffer");
      const filePathFour = path.resolve(
        "./public",
        "images",
        "certificate-mid.png"
      );

      const imgBufferFour = fs.readFileSync(filePathFour);
      const certificateMid = await pdfDoc.embedPng(imgBufferFour);
      const certificateMidPrinted = await pdfDocPrinted.embedPng(imgBufferFour);

      const ertificateMidpngDims = certificateMid.scale(0.3);

      const certificateHeading = "Certificate of Disposition and Proclamation";
      const certficateAddress =
        "between Scotland Titles, Unit 61892, PO Box 26965, Glasgow G1 9BW United Kingdom and";
      // const certficateUserName = `${propObject.p_8727183196433._Title1} ${propObject.p_8727183196433._Name1} of Blairadam`;
      // const certficateUserName = `${propObject.p_8727183196433._Title1} ${propObject.p_8727183196433._Name1} of Blairadam`;
      let nameParts = propObject.p_8727183196433._Name1.split(" ");
      console.log(nameParts, "nameParts");
      let modifiedName = nameParts
        .map(
          (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        )
        .join(" ");
      console.log(modifiedName, "modified name");

      //two name
      if (propObject.p_8727183196433._Title2) {
        let namePartsTwo = propObject.p_8727183196433._Name2.split(" ");
        console.log(nameParts, "nameParts");
        var modifiedNameTwo = namePartsTwo
          .map(
            (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
          )
          .join(" ");
        console.log(modifiedNameTwo, "modified name two");
      }

      const certficateUserName = `${propObject.p_8727183196433._Title1} ${modifiedName} of Blairadam`;

      const and = "and";
      const certficateUserNameTwo = `${
        propObject.p_8727183196433._Title2
          ? propObject.p_8727183196433._Title2
          : ""
      } ${propObject.p_8727183196433._Title2 ? modifiedNameTwo : ""} ${
        propObject.p_8727183196433._Title2 ? `of Blairadam` : ""
      }`;

      //   const emblemCertficateUserName = `${propObject.p_8727183065361._Title1} ${propObject.p_8727183065361._Name1}`;
      const certificateUserNametextWidth = oldEng.widthOfTextAtSize(
        certficateUserName,
        12
      );
      const addressTitle = propObject.p_8727183196433._Title1;
      const certificateHalfOfWord = certificateUserNametextWidth / 2;
      const certificateStartingPosition =
        (pagetwo.getWidth() - certificateUserNametextWidth) / 2;
      const certificateX = certificateStartingPosition - certificateHalfOfWord;

      const certificateUserNameTwotextWidth = oldEng.widthOfTextAtSize(
        certficateUserNameTwo,
        12
      );
      const certificateTwoHalfOfWord = certificateUserNameTwotextWidth / 2;
      const certificateTwoStartingPosition =
        (pagetwo.getWidth() - certificateUserNameTwotextWidth) / 2;
      const certificateTwoX =
        certificateTwoStartingPosition - certificateTwoHalfOfWord;

      if (
        !propObject.p_8727183196433._Title2 &&
        propObject.p_8727183196433._Title1
      ) {
        if (propObject.p_8727183196433._Title1 == "Lord") {
          titleConditions = "LORD";
        } else if (propObject.p_8727183196433._Title1 == "Laird") {
          titleConditions = "LAIRD";
        } else if (propObject.p_8727183196433._Title1 == "Lady") {
          titleConditions = "LADY";
        }
      } else if (
        propObject.p_8727183196433._Title1 &&
        propObject.p_8727183196433._Title2
      ) {
        if (
          propObject.p_8727183196433._Title1 == "Lord" &&
          propObject.p_8727183196433._Title2 == "Lord"
        ) {
          titleConditions = "LORDS";
        } else if (
          propObject.p_8727183196433._Title1 == "Laird" &&
          propObject.p_8727183196433._Title2 == "Laird"
        ) {
          titleConditions = "LAIRDS";
        } else if (
          propObject.p_8727183196433._Title1 == "Lady" &&
          propObject.p_8727183196433._Title2 == "Lady"
        ) {
          titleConditions = "LADIES";
        } else if (
          propObject.p_8727183196433._Title1 == "Lord" &&
          propObject.p_8727183196433._Title2 == "Lady"
        ) {
          titleConditions = "LORD AND LADY";
        } else if (
          propObject.p_8727183196433._Title1 == "Lady" &&
          propObject.p_8727183196433._Title2 == "Lord"
        ) {
          console.log("LADY AND LORD condition");
          titleConditions = "LADY AND LORD";
        } else if (
          propObject.p_8727183196433._Title1 == "Lord" &&
          propObject.p_8727183196433._Title2 == "Laird"
        ) {
          titleConditions = "LORD AND LAIRD";
        } else if (
          propObject.p_8727183196433._Title1 == "Laird" &&
          propObject.p_8727183196433._Title2 == "Lord"
        ) {
          titleConditions = "LAIRD AND LORD";
        } else if (
          propObject.p_8727183196433._Title1 == "Lady" &&
          propObject.p_8727183196433._Title2 == "Laird"
        ) {
          titleConditions = "LADY AND LAIRD";
        } else if (
          propObject.p_8727183196433._Title1 == "Laird" &&
          propObject.p_8727183196433._Title2 == "Lady"
        ) {
          titleConditions = "LAIRD AND LADY";
        }
        console.log(
          titleConditions,
          "titleConditionstitleConditionstitleConditions"
        );
      }
      const certificateAddressTwo = `(hereafter to be proclaimed as “THE ${titleConditions}”), care of Unit 61892, PO Box 26965, Glasgow G1 9BW United Kingdom`;

      const certificateText = `The Scotland Titles Estate in Fife, Scotland, hereinafter referred to as “THE ESTATE”,\nhas been partitioned into dedicated souvenir plots of land.\n\nTHE ${titleConditions} ${
        propObject.p_8727183196433._Title2 ? "have" : "has"
      } petitioned unto Scotland Titles on this day their ${
        titleConditions == "LADY AND LAIRD" ||
        titleConditions == "LAIRD AND LADY" ||
        titleConditions == "LORD AND LAIRD" ||
        titleConditions == "LAIRD AND LORD" ||
        titleConditions == "LORD AND LADY" ||
        titleConditions == "LADY AND LORD"
          ? "\nintention to"
          : "intention to\n"
      }purchase, and Scotland Titles has determined to accept the disposition ${
        titleConditions == "LADY AND LAIRD" ||
        titleConditions == "LAIRD AND LADY" ||
        titleConditions == "LORD AND LAIRD" ||
        titleConditions == "LAIRD AND LORD" ||
        titleConditions == "LORD AND LADY" ||
        titleConditions == "LADY AND LORD"
          ? "\nof a plot of"
          : "of a plot of\n"
      }land within THE ESTATE, at Cantsdam, hereafter referred to as “THE ${
        titleConditions == "LADY AND LAIRD" ||
        titleConditions == "LAIRD AND LADY" ||
        titleConditions == "LORD AND LAIRD" ||
        titleConditions == "LAIRD AND LORD" ||
        titleConditions == "LORD AND LADY" ||
        titleConditions == "LADY AND LORD"
          ? "\nLAND"
          : "LAND"
      }”.\n\nScotland Titles, in CONSIDERATION of all monies due to be paid to us by THE\n${titleConditions}, of which we have received of in full, we do hereby DISCHARGE ${
        titleConditions == "LADY AND LAIRD" ||
        titleConditions == "LAIRD AND LADY" ||
        titleConditions == "LORD AND LAIRD" ||
        titleConditions == "LAIRD AND LORD" ||
        titleConditions == "LORD AND LADY" ||
        titleConditions == "LADY AND LORD"
          ? "\nunto them"
          : "unto them\n"
      }and DISPONE to and in perpetuity in favour of THE ${titleConditions} ${
        titleConditions == "LADY AND LAIRD" ||
        titleConditions == "LAIRD AND LADY" ||
        titleConditions == "LORD AND LAIRD" ||
        titleConditions == "LAIRD AND LORD" ||
        titleConditions == "LORD AND LADY" ||
        titleConditions == "LADY AND LORD"
          ? "\nand to their future"
          : "and to their future\n"
      }assignees the whole of THE LAND but always with ${
        titleConditions == "LADY AND LAIRD" ||
        titleConditions == "LAIRD AND LADY" ||
        titleConditions == "LORD AND LAIRD" ||
        titleConditions == "LAIRD AND LORD" ||
        titleConditions == "LORD AND LADY" ||
        titleConditions == "LADY AND LORD"
          ? "pedestrian\naccess only over THE "
          : "pedestrian access only over THE\n"
      }ESTATE; such rights of vehicular access are reserved ${
        titleConditions == "LADY AND LAIRD" ||
        titleConditions == "LAIRD AND LADY" ||
        titleConditions == "LORD AND LAIRD" ||
        titleConditions == "LAIRD AND LORD" ||
        titleConditions == "LORD AND LADY" ||
        titleConditions == "LADY AND LORD"
          ? "\nto Scotland Titles and its"
          : "to Scotland Titles and its\n"
      }successors in title plus any and all others authorised by it; ${
        titleConditions == "LADY AND LAIRD" ||
        titleConditions == "LAIRD AND LADY" ||
        titleConditions == "LORD AND LAIRD" ||
        titleConditions == "LAIRD AND LORD" ||
        titleConditions == "LORD AND LADY" ||
        titleConditions == "LADY AND LORD"
          ? `\nTHE ${titleConditions} ${
              propObject.p_8727183196433._Title2 ? "covenant" : "covenants"
            } not`
          : `THE ${titleConditions} ${
              propObject.p_8727183196433._Title2 ? "covenant" : "covenants"
            } not\n`
      } to dispose of THE LAND in part only.\n\nScotland Titles is a trading name of Blairdam Corporation PA. Terms and Conditions,\nand this CERTIFICATE shall be governed by the Law of Scotland.`;
      const datee = propObject.p_8727183196433._Date;
      const dateObj = new Date(datee);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are 0-indexed
      const day = String(dateObj.getDate()).padStart(2, "0");

      const monthNames = [
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER",
      ];

      const monthName = monthNames[dateObj.getMonth()];
      let titledayWithSuffix;

      if (day >= 11 && day <= 13) {
        titledayWithSuffix = `${day}TH`;
      } else {
        switch (day % 10) {
          case 1:
            titledayWithSuffix = `${day}ST`;
            break;
          case 2:
            titledayWithSuffix = `${day}ND`;
            break;
          case 3:
            titledayWithSuffix = `${day}RD`;
            break;
          default:
            titledayWithSuffix = `${day}TH`;
        }
      }
      let text = propObject.p_8727183196433.variant;
      const myArray = text.split(" ");
      let word = myArray[0];
      const certificateTextTwo = `THE ESTATE location is KINGSEAT ROAD (OFF CANTSDAM ROAD),\nCANTSDAM, KELTY, FIFE, SCOTLAND KY12 0SW\n\nTHE ESTATE is recorded in the General Register of Sasines RS30-32\n\nCoordinates to the centre of THE ESTATE are;\nLatitude, Longitude in degrees 56°07${"`"}18 N , 003°23 08 W\nX Easting 313956 , Y Northing 692954\n\nThe Plot Number of THE LAND within THE ESTATE is ${order_number} ${
        propObject.p_8727183196433.reference != 0
          ? `- ${propObject.p_8727183196433.reference}`
          : ""
      }\n\nThe size of THE LAND is ${word} square foot\n\nDate of Entry of THE LAND is as the date of this CERTIFICATE\n\nThis Disposition is signed for and on behalf of Scotland Titles and witnessed on the\n${titledayWithSuffix} Day of ${monthName} ${year}`;
      pagetwo.drawImage(imgBg, {
        width: pagetwo.getWidth(),
        height: pagetwo.getHeight(),
      });

      pagetwo.drawImage(yellow_middle, {
        x: 380,
        y: propObject.p_8727183196433._Title2 ? 385 : 405,
        width: ertificateMidpngDims.width,
        height: ertificateMidpngDims.height,
      });
      pagetwo.drawImage(ribbonImg, {
        x: 30,
        y: 410,
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
        x: 580,
        y: 70,
        height: 30,
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
        font: tempusFont,
        // font: customFont,
        // font: tempusFont,
      });

      pagetwo.drawImage(welcome_emblem_signature, {
        x: 500,
        y: 70,
        height: 50,
        width: 30,
      });

      pagetwo.drawText("Signed", {
        x: 500,
        y: 60,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
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
        font: tempusFont,
      });

      pagetwo.drawText(certficateUserName, {
        x: certificateX,
        y: 470,
        width: textWidth,
        height: textHeight,
        size: 24,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });
      {
        propObject.p_8727183196433._Title2 &&
          pagetwo.drawText(and, {
            x: 400,
            y: 460,
            width: textWidth,
            height: textHeight,
            size: 10,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: tempusFont,
          });

        pagetwo.drawText(certficateUserNameTwo, {
          x: certificateTwoX,
          y: 435,
          width: textWidth,
          height: textHeight,
          size: 24,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: oldEng,
        });
      }
      pagetwo.drawText(certificateAddressTwo, {
        x: 195,
        y: propObject.p_8727183196433._Title2 ? 415 : 450,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      pagetwo.drawText(certificateText, {
        x: 60,
        y: 370,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      pagetwo.drawText(certificateTextTwo, {
        x: 460,
        y: 370,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //printed pagetwo  ========

      //deed page one

      const MainHeading = "Master Title Deed";
      const SubHeading = "Deed of Change of Name and Title (Deed Poll)";
      const formerTitle = "Former Name & Title";
      const newTitle = "(New Name & Title)";
      const underlineHeight = 0.5;
      const underlineY = 680; // Adjust the y-position as needed

      // Adjust the x-positions as needed for each form field

      const underlineX1 = 240; // For Form Field 1
      const underlineX2 = 320; // For Form Field 1
      const underlineX3 = 110; // For Form Field 2
      const underlineX4 = 180; // For Form Field 2
      const underlineX5 = 50; // For Form Field 3
      const underlineX6 = 580; // For Form Field 3
      const deedFormTextPlaceHolder = "Home Address";
      // const formerNameAndTitle="Former Name & Title"
      // const newNameAndTitle="New Name & Title"

      const positions = [
        // { x: 110, y: 710 }, //first
        { x: 125, y: 536 }, //second
        // { x: 395, y: 473 },
        { x: 30, y: 355 }, //in witneess

        // Add more positions as needed
      ];
      positions.forEach((position) => {
        deedPage.drawText(`${formerTitle}.`, {
          x: position.x,
          y: position.y,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });
      });

      //Capital name
      let deedNameParts = propObject.p_8727183196433._Name1.split(" ");
      console.log(nameParts, "nameParts");
      let deedModifiedName = deedNameParts
        .map(
          (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        )
        .join(" ");

      //two name
      if (propObject.p_8727183196433._Title2) {
        let deedNamePartsTwo = propObject.p_8727183196433._Name2.split(" ");
        var deedModifiedNameTwo = deedNamePartsTwo
          .map(
            (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
          )
          .join(" ");
        console.log(deedModifiedNameTwo, "modified name two");
      }

      const deedUserNameWidth = `of ${deedModifiedName}`;
      const formertextWidth = timesRomanFontHeading.widthOfTextAtSize(
        deedUserNameWidth,
        12
      );
      console.log(formertextWidth, "formertextWidth");
      const totalWidth = formertextWidth + 35;

      const deedNewNameWidth = `now ${propObject.p_8727183196433._Title1} ${deedModifiedName}`;
      const newtextWidth = timesRomanFontHeading.widthOfTextAtSize(
        deedNewNameWidth,
        12
      );

      const newTotalTextWidth = newtextWidth + 30;

      deedPage.drawText(`(${formerTitle})`, {
        x: totalWidth,
        y: 710,
        size: 12,
        width: textWidth,
        height: textHeight,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });

      deedPage.drawText(formerTitle, {
        x: 175,
        y: 449,
        size: 12,
        width: textWidth,
        height: textHeight,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });

      deedPage.drawText(newTitle, {
        x: newTotalTextWidth,
        y: 683,
        size: 12,
        width: textWidth,
        height: textHeight,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });

      const deedFormText = `of ${deedModifiedName}\n\nnow ${propObject.p_8727183196433._Title1} ${deedModifiedName}\n\nBY THIS DEED OF CHANGE OF NAME AND TITLE made by myself the undersigned\n\n${propObject.p_8727183196433._Title1} ${deedModifiedName}\n\nof`;
      const declarationOne = `HEREBY DECLARE AS FOLLOWS;`;
      const absolute =
        "1.   I ABSOLUTELY and entirely renounce, relinquish and abandon the use of my said";
      const formerNameBreak = `Former Name &`;
      const titleBreak = "Title";
      const absoluteTwo =
        "and assume, adopt and determine to take and use from the date hereof the";
      const newTitleTwo = "New Name & Title";
      const inContent = "in";
      const absoluteThree = "substitution for my";
      const declarationTwo = `2.    I SHALL AT ALL TIMES hereafter in all records, deeds, documents and other writings and in all\nactions and proceedings as well as in all dealings and transactions and on all occasions whatsoever use and`;
      const declarationTwoSubscribe = "subscribe the said";
      const declarationTwoSubscribeName = "as my name in substitution for my";
      const so = "so";
      const relinqushed =
        "relinquished as aforesaid to the intent that I may hereafter be called, known or distinguished by the";
      const newTitleBreak = "New Name";
      const newTitleBreakTwo = "& Title";
      const only = "only and not by the";

      const declarationThree = `3.    I AUTHORISE AND REQUIRE all persons at all times to designate, describe and address me by my`;
      const adopt = "adopted";
      const declarationFour = `IN WITNESS whereof I have hereunto subscribed my adopted and substituted`;
      const declarationFourTwo = "and also my";
      const signed = "SIGNED THIS";
      const dayOf = "DAY OF";
      const yearIn = "IN THE YEAR";
      const signedAs = "SIGNED AS A DEED AND DELIVERED\n\nby the above named";
      const signPlaceHolder = "Signature";
      const lordName = `${propObject.p_8727183196433._Title1} ${deedModifiedName}\n\nFormerly known as`;
      const formerName = `${deedModifiedName}`;

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
        font: timesRomanFont,
      });

      deedPage.drawLine({
        start: { x: underlineX5, y: 600 }, // Adjust the y-position for Form Field 3
        end: { x: underlineX6, y: 600 }, // Adjust the y-position for Form Field 3
        color: rgb(0.65, 0.65, 0.65),
        thickness: underlineHeight,
      });

      deedPage.drawText(deedFormTextPlaceHolder, {
        x: 60,
        y: 603,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0.65, 0.65, 0.65),
        lineHeight: fontSize * 1.2,
        font: timesRomanItalicFont,
      });

      deedPage.drawText(declarationOne, {
        x: 30,
        y: 580,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      deedPage.drawText(absolute, {
        x: 30,
        y: 560,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      deedPage.drawText(formerNameBreak, {
        x: 453,
        y: 560,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });
      deedPage.drawText(titleBreak, {
        x: 30,
        y: 548,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });
      deedPage.drawText(absoluteTwo, {
        x: 58,
        y: 548,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      deedPage.drawText(newTitleTwo, {
        x: 415,
        y: 548,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });
      deedPage.drawText(inContent, {
        x: 520,
        y: 548,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      deedPage.drawText(absoluteThree, {
        x: 30,
        y: 536,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
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
        font: timesRomanFont,
      });

      deedPage.drawText(declarationTwoSubscribe, {
        x: 30,
        y: 473,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      deedPage.drawText(newTitleTwo, {
        x: 120,
        y: 473,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      deedPage.drawText(declarationTwoSubscribeName, {
        x: 210,
        y: 473,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      deedPage.drawText(formerTitle, {
        x: 380,
        y: 473,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });

      deedPage.drawText(so, {
        x: 500,
        y: 473,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      deedPage.drawText(relinqushed, {
        x: 30,
        y: 461,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      deedPage.drawText(newTitleBreak, {
        x: 510,
        y: 461,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });

      deedPage.drawText(newTitleBreakTwo, {
        x: 30,
        y: 449,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });

      deedPage.drawText(only, {
        x: 73,
        y: 449,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
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

      deedPage.drawText(adopt, {
        x: 30,
        y: 408,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });

      deedPage.drawText(newTitleTwo, {
        x: 70,
        y: 408,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFontHeading,
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
      deedPage.drawText(newTitleTwo, {
        x: 413,
        y: 370,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFontHeading,
      });
      deedPage.drawText(declarationFourTwo, {
        x: 515,
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

      deedPage.drawText(dayOf, {
        x: 190,
        y: 300,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      deedPage.drawLine({
        start: { x: underlineX1, y: 300 }, // Adjust the y-position for Form Field 3
        end: { x: underlineX2, y: 300 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });

      deedPage.drawText(yearIn, {
        x: 330,
        y: 300,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
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
        font: timesRomanItalicFont,
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
        font: timesRomanFont,
      });

      deedPage.drawText(presence, {
        x: 270,
        y: 240,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      deedPage.drawText(witness, {
        x: 270,
        y: 190,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      deedPage.drawLine({
        start: { x: 370, y: 190 }, // Adjust the y-position for Form Field 3
        end: { x: 540, y: 190 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });

      deedPage.drawText("Name", {
        x: 270,
        y: 160,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      deedPage.drawLine({
        start: { x: 300, y: 160 }, // Adjust the y-position for Form Field 3
        end: { x: 540, y: 160 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });

      deedPage.drawText("Address", {
        x: 270,
        y: 130,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      deedPage.drawLine({
        start: { x: 310, y: 130 }, // Adjust the y-position for Form Field 3
        end: { x: 540, y: 130 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });
      deedPage.drawLine({
        start: { x: 270, y: 105 }, // Adjust the y-position for Form Field 3
        end: { x: 540, y: 105 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });
      deedPage.drawLine({
        start: { x: 270, y: 80 }, // Adjust the y-position for Form Field 3
        end: { x: 540, y: 80 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });

      deedPage.drawText("Occupation", {
        x: 270,
        y: 50,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      deedPage.drawLine({
        start: { x: 330, y: 50 }, // Adjust the y-position for Form Field 3
        end: { x: 540, y: 50 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });

      //master deed page two
      if (propObject.p_8727183196433._Title2) {
        positions.forEach((position) => {
          deedPageTwo.drawText(`${formerTitle}.`, {
            x: position.x,
            y: position.y,
            size: 12,
            width: textWidth,
            height: textHeight,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeading,
          });
        });

        //capital name for second
        let deedNameParts = propObject.p_8727183196433._Name1.split(" ");
        console.log(nameParts, "nameParts");
        let deedModifiedName = deedNameParts
          .map(
            (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
          )
          .join(" ");

        //two name
        if (propObject.p_8727183196433._Title2) {
          let deedNamePartsTwo = propObject.p_8727183196433._Name2.split(" ");
          var deedModifiedNameTwo = deedNamePartsTwo
            .map(
              (part) =>
                part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
            )
            .join(" ");
          console.log(deedModifiedNameTwo, "modified name two");
        }
        const deedTwoUserNameWidth = `of ${deedModifiedNameTwo}`;
        const formerDeedTwotextWidth = timesRomanFontHeading.widthOfTextAtSize(
          deedTwoUserNameWidth,
          12
        );
        // console.log(formertextWidth, "formertextWidth");
        const totalWidthDeedTwo = formerDeedTwotextWidth + 35;

        const deedTwoNewNameWidth = `now ${propObject.p_8727183196433._Title2} ${deedModifiedNameTwo}`;
        const newDeedTwotextWidth = timesRomanFontHeading.widthOfTextAtSize(
          deedTwoNewNameWidth,
          12
        );

        const newDeedTwoTotalTextWidth = newDeedTwotextWidth + 30;

        deedPageTwo.drawText(`(${formerTitle})`, {
          x: totalWidthDeedTwo,
          y: 710,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(formerTitle, {
          x: 175,
          y: 449,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(newTitle, {
          x: newDeedTwoTotalTextWidth,
          y: 683,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        const deedFormTextTwo = `of ${deedModifiedNameTwo}\n\nnow ${propObject.p_8727183196433._Title2} ${deedModifiedNameTwo}\n\nBY THIS DEED OF CHANGE OF NAME AND TITLE made by myself the undersigned\n\n${propObject.p_8727183196433._Title2} ${deedModifiedNameTwo}\n\nof`;

        const lordNameTwo = `${propObject.p_8727183196433._Title2} ${deedModifiedNameTwo}\n\nFormerly known as`;
        const formerNameTwo = `${deedModifiedNameTwo}`;

        deedPageTwo.drawText(MainHeading, {
          x: 200,
          y: 750,
          size: 20,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });
        deedPageTwo.drawText(SubHeading, {
          x: 180,
          y: 730,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(deedFormTextTwo, {
          x: 30,
          y: 710,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(deedFormTextTwo, {
          x: 30,
          y: 710,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: underlineX5, y: 600 }, // Adjust the y-position for Form Field 3
          end: { x: underlineX6, y: 600 }, // Adjust the y-position for Form Field 3
          color: rgb(0.65, 0.65, 0.65),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText(deedFormTextPlaceHolder, {
          x: 60,
          y: 603,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0.65, 0.65, 0.65),
          lineHeight: fontSize * 1.2,
          font: timesRomanItalicFont,
        });

        deedPageTwo.drawText(declarationOne, {
          x: 30,
          y: 580,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(absolute, {
          x: 30,
          y: 560,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(formerNameBreak, {
          x: 453,
          y: 560,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });
        deedPageTwo.drawText(titleBreak, {
          x: 30,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });
        deedPageTwo.drawText(absoluteTwo, {
          x: 58,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(newTitleTwo, {
          x: 415,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });
        deedPageTwo.drawText(inContent, {
          x: 520,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(absoluteThree, {
          x: 30,
          y: 536,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(declarationTwo, {
          x: 30,
          y: 500,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(declarationTwoSubscribe, {
          x: 30,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(newTitleTwo, {
          x: 120,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(declarationTwoSubscribeName, {
          x: 210,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(formerTitle, {
          x: 380,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(so, {
          x: 500,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(relinqushed, {
          x: 30,
          y: 461,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(newTitleBreak, {
          x: 510,
          y: 461,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(newTitleBreakTwo, {
          x: 30,
          y: 449,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(only, {
          x: 73,
          y: 449,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(declarationThree, {
          x: 30,
          y: 420,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(adopt, {
          x: 30,
          y: 408,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(newTitleTwo, {
          x: 70,
          y: 408,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(declarationFour, {
          x: 30,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(newTitleTwo, {
          x: 413,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });
        deedPageTwo.drawText(declarationFourTwo, {
          x: 515,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(signed, {
          x: 30,
          y: 300,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawLine({
          start: { x: underlineX3, y: 300 }, // Adjust the y-position for Form Field 3
          end: { x: underlineX4, y: 300 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText(dayOf, {
          x: 190,
          y: 300,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: underlineX1, y: 300 }, // Adjust the y-position for Form Field 3
          end: { x: underlineX2, y: 300 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText(yearIn, {
          x: 330,
          y: 300,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(signedAs, {
          x: 30,
          y: 270,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 30, y: 200 }, // Adjust the y-position for Form Field 3
          end: { x: 250, y: 200 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
        deedPageTwo.drawText(signPlaceHolder, {
          x: 40,
          y: 190,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0.65, 0.65, 0.65),
          lineHeight: fontSize * 1.2,
          font: timesRomanItalicFont,
        });

        deedPageTwo.drawLine({
          start: { x: 30, y: 170 }, // Adjust the y-position for Form Field 3
          end: { x: 250, y: 170 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText(lordNameTwo, {
          x: 40,
          y: 155,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 30, y: 90 }, // Adjust the y-position for Form Field 3
          end: { x: 250, y: 90 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText(formerNameTwo, {
          x: 40,
          y: 75,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(presence, {
          x: 270,
          y: 240,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(witness, {
          x: 270,
          y: 190,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 370, y: 190 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 190 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText("Name", {
          x: 270,
          y: 160,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 300, y: 160 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 160 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText("Address", {
          x: 270,
          y: 130,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 310, y: 130 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 130 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
        deedPageTwo.drawLine({
          start: { x: 270, y: 105 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 105 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
        deedPageTwo.drawLine({
          start: { x: 270, y: 80 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 80 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText("Occupation", {
          x: 270,
          y: 50,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 330, y: 50 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 50 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
      }

      // =====================================Printed Title Pack started ================================

      if (propObject.p_8727183196433.variant.includes("Printed Pack")) {
        console.log(propObject.p_8727183196433.variant);

        printedPage.drawText(propObject.p_8727183196433._Date, {
          x: 70,
          y: 710,
          size: fontSize,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printedPage.drawText(heading, {
          x: 70,
          y: 650,
          width: textWidth,
          height: textHeight,
          size: headingFontSize,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });

        printedPage.drawText(content, {
          x: 70,
          y: 620,
          width: textWidth,
          height: textHeight,
          size: fontSize,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printedPage.drawText(welcomeContent, {
          x: 240,
          y: 320,
          width: textWidth,
          height: textHeight,
          size: 14,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printedPage.drawText(welcomeSignContent, {
          x: 70,
          y: 250,
          width: textWidth,
          height: textHeight,
          size: 14,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanItalicFontPrinted,
        });

        printedPage.drawImage(welcome_emblem_signature_printed, {
          x: 170,
          y: 210,
          height: 70,
          width: 50,
        });

        printedPage.drawText(facebookContent, {
          x: 70,
          y: 170,
          width: textWidth,
          height: textHeight,
          size: 11,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printedPage.drawText(facebookLink, {
          x: 120,
          y: 170,
          width: textWidth,
          height: textHeight,
          size: 11,
          color: rgb(0.027, 0.388, 0.756),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printedPage.drawLine({
          start: { x: 120, y: 165 }, // Adjust the y-position for Form Field 3
          end: { x: 215, y: 165 }, // Adjust the y-position for Form Field 3
          color: rgb(0.027, 0.388, 0.756),
          thickness: 0.5,
        });

        printedPage.drawText(scotalndTitleAddress, {
          x: 120,
          y: 70,
          width: textWidth,
          height: textHeight,
          size: 11,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printedPage.drawText("info@scotlandtitles.com", {
          x: 150,
          y: 50,
          width: textWidth,
          height: textHeight,
          size: 11,
          color: rgb(0.027, 0.388, 0.756),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printedPage.drawLine({
          start: { x: 150, y: 45 }, // Adjust the y-position for Form Field 3
          end: { x: 260, y: 45 }, // Adjust the y-position for Form Field 3
          color: rgb(0.027, 0.388, 0.756),
          thickness: 0.5,
        });

        printedPage.drawText("www.ScotlandTitles.com", {
          x: 350,
          y: 50,
          width: textWidth,
          height: textHeight,
          size: 11,
          color: rgb(0.027, 0.388, 0.756),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printedPage.drawLine({
          start: { x: 350, y: 45 }, // Adjust the y-position for Form Field 3
          end: { x: 460, y: 45 }, // Adjust the y-position for Form Field 3
          color: rgb(0.027, 0.388, 0.756),
          thickness: 0.5,
        });
        printedPage.drawImage(img_printed, {
          x: 440,
          y: 690,
          width: pngDims.width,
          height: pngDims.height,
        });

        printedpagetwo.drawImage(titlePack_borders, {
          y: 550,
          width: printedpagetwo.getWidth(),
          height: 60,
        });
        printedpagetwo.drawImage(yellow_middle_printed, {
          x: 380,
          y: propObject.p_8727183196433._Title2 ? 385 : 405,
          width: ertificateMidpngDims.width,
          height: ertificateMidpngDims.height,
        });
        printedpagetwo.drawImage(ribbonImgPrinted, {
          x: 30,
          y: 410,
          width: pngDimsRibbon.width,
          height: pngDimsRibbon.height,
        });

        printedpagetwo.drawImage(stampImgPrinted, {
          x: 720,
          y: 70,
          width: stampPngDims.width,
          height: stampPngDims.height,
        });

        printedpagetwo.drawImage(SignaturetwoPrinted, {
          x: 580,
          y: 70,
          height: 30,
          width: 100,
        });

        printedpagetwo.drawText("Witnessed", {
          x: 600,
          y: 60,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
          // font: tempusFont,
        });

        printedpagetwo.drawImage(welcome_emblem_signature_printed, {
          x: 500,
          y: 70,
          height: 50,
          width: 30,
        });

        printedpagetwo.drawText("Signed", {
          x: 500,
          y: 60,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        printedpagetwo.drawText(certificateHeading, {
          x: 200,
          y: 520,
          size: 26,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });
        printedpagetwo.drawText(certficateAddress, {
          x: 220,
          y: 500,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        printedpagetwo.drawText(certficateUserName, {
          x: certificateX,
          y: 470,
          width: textWidth,
          height: textHeight,
          size: 24,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });
        {
          propObject.p_8727183196433._Title2 &&
            printedpagetwo.drawText(and, {
              x: 400,
              y: 460,
              width: textWidth,
              height: textHeight,
              size: 10,
              color: rgb(0, 0, 0),
              lineHeight: fontSize * 1.2,
              font: tempusFontPrinted,
            });

          printedpagetwo.drawText(certficateUserNameTwo, {
            x: certificateTwoX,
            y: 435,
            width: textWidth,
            height: textHeight,
            size: 24,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: oldEngPrinted,
          });
        }
        printedpagetwo.drawText(certificateAddressTwo, {
          x: 195,
          y: propObject.p_8727183196433._Title2 ? 415 : 450,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        printedpagetwo.drawText(certificateText, {
          x: 60,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        printedpagetwo.drawText(certificateTextTwo, {
          x: 460,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        printedpagetwo.drawImage(titlePack_borders, {
          y: 0,
          width: printedpagetwo.getWidth(),
          height: 50,
        });

        // printed deed page start =========================

        printeddeedPage.drawText(`(${formerTitle})`, {
          x: totalWidth,
          y: 710,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });

        printeddeedPage.drawText(formerTitle, {
          x: 175,
          y: 449,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });

        printeddeedPage.drawText(newTitle, {
          x: newTotalTextWidth,
          y: 683,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });
        printeddeedPage.drawText(MainHeading, {
          x: 200,
          y: 750,
          size: 20,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });
        printeddeedPage.drawText(SubHeading, {
          x: 180,
          y: 730,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(deedFormText, {
          x: 30,
          y: 710,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(deedFormText, {
          x: 30,
          y: 710,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: underlineX5, y: 600 }, // Adjust the y-position for Form Field 3
          end: { x: underlineX6, y: 600 }, // Adjust the y-position for Form Field 3
          color: rgb(0.65, 0.65, 0.65),
          thickness: underlineHeight,
        });

        printeddeedPage.drawText(deedFormTextPlaceHolder, {
          x: 60,
          y: 603,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0.65, 0.65, 0.65),
          lineHeight: fontSize * 1.2,
          font: timesRomanItalicFontPrinted,
        });

        printeddeedPage.drawText(declarationOne, {
          x: 30,
          y: 580,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(absolute, {
          x: 30,
          y: 560,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printeddeedPage.drawText(formerNameBreak, {
          x: 453,
          y: 560,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });
        printeddeedPage.drawText(titleBreak, {
          x: 30,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });
        printeddeedPage.drawText(absoluteTwo, {
          x: 58,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printeddeedPage.drawText(newTitleTwo, {
          x: 415,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });
        printeddeedPage.drawText(inContent, {
          x: 520,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printeddeedPage.drawText(absoluteThree, {
          x: 30,
          y: 536,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(declarationTwo, {
          x: 30,
          y: 500,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(declarationTwoSubscribe, {
          x: 30,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printeddeedPage.drawText(newTitleTwo, {
          x: 120,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(declarationTwoSubscribeName, {
          x: 210,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(formerTitle, {
          x: 380,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });

        printeddeedPage.drawText(so, {
          x: 500,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(relinqushed, {
          x: 30,
          y: 461,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printeddeedPage.drawText(newTitleBreak, {
          x: 510,
          y: 461,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });

        printeddeedPage.drawText(newTitleBreakTwo, {
          x: 30,
          y: 449,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });

        printeddeedPage.drawText(only, {
          x: 73,
          y: 449,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });

        printeddeedPage.drawText(declarationThree, {
          x: 30,
          y: 420,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(adopt, {
          x: 30,
          y: 408,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(newTitleTwo, {
          x: 70,
          y: 408,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });

        printeddeedPage.drawText(declarationFour, {
          x: 30,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printeddeedPage.drawText(newTitleTwo, {
          x: 413,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });
        printeddeedPage.drawText(declarationFourTwo, {
          x: 515,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(signed, {
          x: 30,
          y: 300,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printeddeedPage.drawLine({
          start: { x: underlineX3, y: 300 }, // Adjust the y-position for Form Field 3
          end: { x: underlineX4, y: 300 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        printeddeedPage.drawText(dayOf, {
          x: 190,
          y: 300,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: underlineX1, y: 300 }, // Adjust the y-position for Form Field 3
          end: { x: underlineX2, y: 300 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        printeddeedPage.drawText(yearIn, {
          x: 330,
          y: 300,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(signedAs, {
          x: 30,
          y: 270,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: 30, y: 200 }, // Adjust the y-position for Form Field 3
          end: { x: 250, y: 200 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
        printeddeedPage.drawText(signPlaceHolder, {
          x: 40,
          y: 190,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0.65, 0.65, 0.65),
          lineHeight: fontSize * 1.2,
          font: timesRomanItalicFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: 30, y: 170 }, // Adjust the y-position for Form Field 3
          end: { x: 250, y: 170 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        printeddeedPage.drawText(lordName, {
          x: 40,
          y: 155,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: 30, y: 90 }, // Adjust the y-position for Form Field 3
          end: { x: 250, y: 90 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        printeddeedPage.drawText(formerName, {
          x: 40,
          y: 75,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(presence, {
          x: 270,
          y: 240,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(witness, {
          x: 270,
          y: 190,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: 370, y: 190 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 190 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        printeddeedPage.drawText("Name", {
          x: 270,
          y: 160,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: 300, y: 160 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 160 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        printeddeedPage.drawText("Address", {
          x: 270,
          y: 130,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: 310, y: 130 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 130 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
        printeddeedPage.drawLine({
          start: { x: 270, y: 105 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 105 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
        printeddeedPage.drawLine({
          start: { x: 270, y: 80 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 80 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        printeddeedPage.drawText("Occupation", {
          x: 270,
          y: 50,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: 330, y: 50 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 50 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        if (propObject.p_8727183196433._Title2) {
          positions.forEach((position) => {
            printeddeedPageTwo.drawText(`${formerTitle}.`, {
              x: position.x,
              y: position.y,
              size: 12,
              width: textWidth,
              height: textHeight,
              color: rgb(0, 0, 0),
              lineHeight: fontSize * 1.2,
              font: timesRomanFontHeadingPrinted,
            });
          });

          const deedTwoUserNameWidth = `of ${propObject.p_8727183196433._Name2}`;
          const formerDeedTwotextWidth =
            timesRomanFontHeading.widthOfTextAtSize(deedTwoUserNameWidth, 12);
          // console.log(formertextWidth, "formertextWidth");
          const totalWidthDeedTwo = formerDeedTwotextWidth + 35;

          const deedTwoNewNameWidth = `now ${propObject.p_8727183196433._Title2} ${propObject.p_8727183196433._Name2}`;
          const newDeedTwotextWidth = timesRomanFontHeading.widthOfTextAtSize(
            deedTwoNewNameWidth,
            12
          );

          const newDeedTwoTotalTextWidth = newDeedTwotextWidth + 30;

          printeddeedPageTwo.drawText(`(${formerTitle})`, {
            x: totalWidthDeedTwo,
            y: 710,
            size: 12,
            width: textWidth,
            height: textHeight,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });

          printeddeedPageTwo.drawText(formerTitle, {
            x: 175,
            y: 449,
            size: 12,
            width: textWidth,
            height: textHeight,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });

          printeddeedPageTwo.drawText(newTitle, {
            x: newDeedTwoTotalTextWidth,
            y: 683,
            size: 12,
            width: textWidth,
            height: textHeight,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });

          const deedFormTextTwo = `of ${propObject.p_8727183196433._Name2}\n\nnow ${propObject.p_8727183196433._Title2} ${propObject.p_8727183196433._Name2}\n\nBY THIS DEED OF CHANGE OF NAME AND TITLE made by myself the undersigned\n\n${propObject.p_8727183196433._Title2} ${propObject.p_8727183196433._Name2}\n\nof`;

          const lordNameTwo = `${propObject.p_8727183196433._Title2} ${propObject.p_8727183196433._Name2}\n\nFormerly known as`;
          const formerNameTwo = `${propObject.p_8727183196433._Name2}`;

          printeddeedPageTwo.drawText(MainHeading, {
            x: 200,
            y: 750,
            size: 20,
            width: textWidth,
            height: textHeight,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });
          printeddeedPageTwo.drawText(SubHeading, {
            x: 180,
            y: 730,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(deedFormTextTwo, {
            x: 30,
            y: 710,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(deedFormTextTwo, {
            x: 30,
            y: 710,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: underlineX5, y: 600 }, // Adjust the y-position for Form Field 3
            end: { x: underlineX6, y: 600 }, // Adjust the y-position for Form Field 3
            color: rgb(0.65, 0.65, 0.65),
            thickness: underlineHeight,
          });

          printeddeedPageTwo.drawText(deedFormTextPlaceHolder, {
            x: 60,
            y: 603,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0.65, 0.65, 0.65),
            lineHeight: fontSize * 1.2,
            font: timesRomanItalicFontPrinted,
          });

          printeddeedPageTwo.drawText(declarationOne, {
            x: 30,
            y: 580,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(absolute, {
            x: 30,
            y: 560,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });
          printeddeedPageTwo.drawText(formerNameBreak, {
            x: 453,
            y: 560,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });
          printeddeedPageTwo.drawText(titleBreak, {
            x: 30,
            y: 548,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });
          printeddeedPageTwo.drawText(absoluteTwo, {
            x: 58,
            y: 548,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFont,
          });
          printeddeedPageTwo.drawText(newTitleTwo, {
            x: 415,
            y: 548,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });
          printeddeedPageTwo.drawText(inContent, {
            x: 520,
            y: 548,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFont,
          });
          printeddeedPageTwo.drawText(absoluteThree, {
            x: 30,
            y: 536,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(declarationTwo, {
            x: 30,
            y: 500,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(declarationTwoSubscribe, {
            x: 30,
            y: 473,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });
          printeddeedPageTwo.drawText(newTitleTwo, {
            x: 120,
            y: 473,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(declarationTwoSubscribeName, {
            x: 210,
            y: 473,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(formerTitle, {
            x: 380,
            y: 473,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });

          printeddeedPageTwo.drawText(so, {
            x: 500,
            y: 473,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(relinqushed, {
            x: 30,
            y: 461,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });
          printeddeedPageTwo.drawText(newTitleBreak, {
            x: 510,
            y: 461,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });

          printeddeedPageTwo.drawText(newTitleBreakTwo, {
            x: 30,
            y: 449,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });

          printeddeedPageTwo.drawText(only, {
            x: 73,
            y: 449,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });

          printeddeedPageTwo.drawText(declarationThree, {
            x: 30,
            y: 420,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(adopt, {
            x: 30,
            y: 408,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(newTitleTwo, {
            x: 70,
            y: 408,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });

          printeddeedPageTwo.drawText(declarationFour, {
            x: 30,
            y: 370,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });
          printeddeedPageTwo.drawText(newTitleTwo, {
            x: 413,
            y: 370,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });
          printeddeedPageTwo.drawText(declarationFourTwo, {
            x: 515,
            y: 370,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(signed, {
            x: 30,
            y: 300,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });
          printeddeedPageTwo.drawLine({
            start: { x: underlineX3, y: 300 }, // Adjust the y-position for Form Field 3
            end: { x: underlineX4, y: 300 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });

          printeddeedPageTwo.drawText(dayOf, {
            x: 190,
            y: 300,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: underlineX1, y: 300 }, // Adjust the y-position for Form Field 3
            end: { x: underlineX2, y: 300 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });

          printeddeedPageTwo.drawText(yearIn, {
            x: 330,
            y: 300,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(signedAs, {
            x: 30,
            y: 270,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: 30, y: 200 }, // Adjust the y-position for Form Field 3
            end: { x: 250, y: 200 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });
          printeddeedPageTwo.drawText(signPlaceHolder, {
            x: 40,
            y: 190,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0.65, 0.65, 0.65),
            lineHeight: fontSize * 1.2,
            font: timesRomanItalicFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: 30, y: 170 }, // Adjust the y-position for Form Field 3
            end: { x: 250, y: 170 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });

          printeddeedPageTwo.drawText(lordNameTwo, {
            x: 40,
            y: 155,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: 30, y: 90 }, // Adjust the y-position for Form Field 3
            end: { x: 250, y: 90 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });

          printeddeedPageTwo.drawText(formerNameTwo, {
            x: 40,
            y: 75,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(presence, {
            x: 270,
            y: 240,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(witness, {
            x: 270,
            y: 190,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: 370, y: 190 }, // Adjust the y-position for Form Field 3
            end: { x: 540, y: 190 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });

          printeddeedPageTwo.drawText("Name", {
            x: 270,
            y: 160,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: 300, y: 160 }, // Adjust the y-position for Form Field 3
            end: { x: 540, y: 160 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });

          printeddeedPageTwo.drawText("Address", {
            x: 270,
            y: 130,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: 310, y: 130 }, // Adjust the y-position for Form Field 3
            end: { x: 540, y: 130 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });
          printeddeedPageTwo.drawLine({
            start: { x: 270, y: 105 }, // Adjust the y-position for Form Field 3
            end: { x: 540, y: 105 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });
          printeddeedPageTwo.drawLine({
            start: { x: 270, y: 80 }, // Adjust the y-position for Form Field 3
            end: { x: 540, y: 80 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });

          printeddeedPageTwo.drawText("Occupation", {
            x: 270,
            y: 50,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: 330, y: 50 }, // Adjust the y-position for Form Field 3
            end: { x: 540, y: 50 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });
        }

        //=============== printeddeedPageTwo ended=====================
        // return res.status(200).send("Success");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  };

  const titlePackWithFreeTartan = async (propObject) => {
    let titleConditions;

    try {
      if (propObject.p_8727182704913.variant.includes("Printed Pack")) {
        var type = true;
        console.log("Printed Pack =============");
        if (propObject.p_8727182704913._Title2) {
          console.log("herrrrrrrrrrrrreeeeee");
          var page = pdfDoc.addPage([595, 842]);
          var pagetwo = pdfDoc.addPage([842, 595]);
          var deedPage = pdfDoc.addPage([595, 842]);
          var deedPageTwo = pdfDoc.addPage([595, 842]);
          var tartanCertificate = pdfDoc.addPage([595, 842]);

          var printedPage = pdfDocPrinted.addPage([595, 842]);
          var printedpagetwo = pdfDocPrinted.addPage([842, 595]);
          var printeddeedPage = pdfDocPrinted.addPage([595, 842]);
          var printeddeedPageTwo = pdfDocPrinted.addPage([595, 842]);
          var tartanCertificatePrinted = pdfDocPrinted.addPage([595, 842]);
        } else {
          var page = pdfDoc.addPage([595, 842]);
          var pagetwo = pdfDoc.addPage([842, 595]);
          var deedPage = pdfDoc.addPage([595, 842]);
          var tartanCertificate = pdfDoc.addPage([595, 842]);

          var printedPage = pdfDocPrinted.addPage([595, 842]);
          var printedpagetwo = pdfDocPrinted.addPage([842, 595]);
          var printeddeedPage = pdfDocPrinted.addPage([595, 842]);
          var tartanCertificatePrinted = pdfDocPrinted.addPage([595, 842]);

          // var printeddeedPage = pdfDocPrinted.addPage([595, 842]);
        }
      } else {
        type = false;
        if (propObject.p_8727182704913._Title2) {
          console.log("herrrrrrrrrrrrreeeeee");
          var page = pdfDoc.addPage([595, 842]);
          var pagetwo = pdfDoc.addPage([842, 595]);
          var deedPage = pdfDoc.addPage([595, 842]);
          var deedPageTwo = pdfDoc.addPage([595, 842]);
          var tartanCertificate = pdfDoc.addPage([595, 842]);

          // var printedPage = pdfDoc.addPage([595, 842]);

          // var printedPage = pdfDoc.addPage([595, 842]);
        } else {
          var page = pdfDoc.addPage([595, 842]);
          var pagetwo = pdfDoc.addPage([842, 595]);
          var deedPage = pdfDoc.addPage([595, 842]);
          var tartanCertificate = pdfDoc.addPage([595, 842]);
        }
      }
      const filePath = path.resolve("./public", "images", "scotland_log.png");

      const imgBuffer = fs.readFileSync(filePath);
      // console.log(imgBuffer, "imgBuffer");
      const img = await pdfDoc.embedPng(imgBuffer);
      const img_printed = await pdfDocPrinted.embedPng(imgBuffer);

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

      const welcome_emblem_signature_printed = await pdfDocPrinted.embedPng(
        welcom_signature_Buffer
      );

      //capital Name
      let firstPageNameParts = propObject.p_8727182704913._Name1.split(" ");
      console.log(firstPageNameParts, "nameParts");
      var firstPageModifiedName = firstPageNameParts
        .map(
          (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        )
        .join(" ");
      console.log(firstPageModifiedName, "modified name");

      //two name
      if (propObject.p_8727182704913._Title2) {
        let firstPageNamePartsTwo =
          propObject.p_8727182704913._Name2.split(" ");
        console.log(firstPageNamePartsTwo, "nameParts");
        var firstModifiedNameTwo = firstPageNamePartsTwo
          .map(
            (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
          )
          .join(" ");
        console.log(firstModifiedNameTwo, "modified name two");
      }

      const heading = `Land with reference number ${order_number} ${
        propObject.p_8727182704913.reference != 0
          ? `- ${propObject.p_8727182704913.reference}`
          : ""
      } ${propObject.p_8727182704913._Title1} ${firstPageModifiedName} ${
        propObject.p_8727182704913._Title2
          ? `& ${propObject.p_8727182704913._Title2}\n${firstModifiedNameTwo}`
          : ""
      } of ${!propObject.p_8727182704913._Name2 ? `\n` : ""}Blairadam`;
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

      page.drawText(propObject.p_8727182704913._Date, {
        x: 70,
        y: 710,
        size: fontSize,
        width: textWidth,
        height: textHeight,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      page.drawText(heading, {
        x: 70,
        y: 650,
        width: textWidth,
        height: textHeight,
        size: headingFontSize,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });

      page.drawText(content, {
        x: 70,
        y: 620,
        width: textWidth,
        height: textHeight,
        size: fontSize,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      page.drawText(welcomeContent, {
        x: 240,
        y: 320,
        width: textWidth,
        height: textHeight,
        size: 14,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      page.drawText(welcomeSignContent, {
        x: 70,
        y: 250,
        width: textWidth,
        height: textHeight,
        size: 14,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanItalicFont,
      });

      page.drawImage(welcome_emblem_signature, {
        x: 170,
        y: 210,
        height: 70,
        width: 50,
      });

      page.drawText(facebookContent, {
        x: 70,
        y: 170,
        width: textWidth,
        height: textHeight,
        size: 11,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      page.drawText(facebookLink, {
        x: 120,
        y: 170,
        width: textWidth,
        height: textHeight,
        size: 11,
        color: rgb(0.027, 0.388, 0.756),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      page.drawLine({
        start: { x: 120, y: 165 }, // Adjust the y-position for Form Field 3
        end: { x: 215, y: 165 }, // Adjust the y-position for Form Field 3
        color: rgb(0.027, 0.388, 0.756),
        thickness: 0.5,
      });

      page.drawText(scotalndTitleAddress, {
        x: 120,
        y: 70,
        width: textWidth,
        height: textHeight,
        size: 11,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      page.drawText("info@scotlandtitles.com", {
        x: 150,
        y: 50,
        width: textWidth,
        height: textHeight,
        size: 11,
        color: rgb(0.027, 0.388, 0.756),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      page.drawLine({
        start: { x: 150, y: 45 }, // Adjust the y-position for Form Field 3
        end: { x: 260, y: 45 }, // Adjust the y-position for Form Field 3
        color: rgb(0.027, 0.388, 0.756),
        thickness: 0.5,
      });

      page.drawText("www.ScotlandTitles.com", {
        x: 350,
        y: 50,
        width: textWidth,
        height: textHeight,
        size: 11,
        color: rgb(0.027, 0.388, 0.756),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      page.drawLine({
        start: { x: 350, y: 45 }, // Adjust the y-position for Form Field 3
        end: { x: 460, y: 45 }, // Adjust the y-position for Form Field 3
        color: rgb(0.027, 0.388, 0.756),
        thickness: 0.5,
      });
      page.drawImage(img, {
        x: 440,
        y: 690,
        width: pngDims.width,
        height: pngDims.height,
      });

      //Certificate title

      const filePathTwo = path.resolve("./public", "images", "pdf-bg.jpg");

      const imgBufferTwo = fs.readFileSync(filePathTwo);
      // console.log(imgBuffer, "imgBuffer");
      const imgBg = await pdfDoc.embedJpg(imgBufferTwo);

      const border = path.resolve("./public", "images", "borders.jpg");

      const border_Buffer = fs.readFileSync(border);

      const titlePack_borders = await pdfDocPrinted.embedJpg(border_Buffer);

      const filePathThree = path.resolve(
        "./public",
        "images",
        "certificate-stamp.png"
      );

      const imgBufferThree = fs.readFileSync(filePathThree);
      // console.log(imgBuffer, "imgBuffer");
      const stampImg = await pdfDoc.embedPng(imgBufferThree);

      const stampImgPrinted = await pdfDocPrinted.embedPng(imgBufferThree);

      const stampPngDims = stampImg.scale(0.3);

      const filePathRibbon = path.resolve(
        "./public",
        "images",
        "scotland_ribbon.png"
      );

      const imgBufferRibbon = fs.readFileSync(filePathRibbon);
      // console.log(imgBuffer, "imgBuffer");
      const ribbonImg = await pdfDoc.embedPng(imgBufferRibbon);
      const ribbonImgPrinted = await pdfDocPrinted.embedPng(imgBufferRibbon);

      const pngDimsRibbon = ribbonImg.scale(0.3);

      const filePathYellow = path.resolve(
        "./public",
        "images",
        "yellow_middle.png"
      );

      const imgBufferYellowMiddle = fs.readFileSync(filePathYellow);
      // console.log(imgBuffer, "imgBuffer");
      const yellow_middle = await pdfDoc.embedPng(imgBufferYellowMiddle);
      const yellow_middle_printed = await pdfDocPrinted.embedPng(
        imgBufferYellowMiddle
      );

      const filePathSignaturetwo = path.resolve(
        "./public",
        "images",
        "signTwo.png"
      );
      const imgBufferSignaturetwo = fs.readFileSync(filePathSignaturetwo);
      // console.log(imgBuffer, "imgBuffer");
      const Signaturetwo = await pdfDoc.embedPng(imgBufferSignaturetwo);
      const SignaturetwoPrinted = await pdfDocPrinted.embedPng(
        imgBufferSignaturetwo
      );

      const SignaturetwodimsRibbon = ribbonImg.scale(0.25);

      // console.log(imgBuffer, "imgBuffer");
      const filePathFour = path.resolve(
        "./public",
        "images",
        "certificate-mid.png"
      );

      const imgBufferFour = fs.readFileSync(filePathFour);
      const certificateMid = await pdfDoc.embedPng(imgBufferFour);
      const certificateMidPrinted = await pdfDocPrinted.embedPng(imgBufferFour);

      const ertificateMidpngDims = certificateMid.scale(0.3);

      const certificateHeading = "Certificate of Disposition and Proclamation";
      const certficateAddress =
        "between Scotland Titles, Unit 61892, PO Box 26965, Glasgow G1 9BW United Kingdom and";
      //   const certficateUserName = `${propObject.p_8727182704913._Title1} ${propObject.p_8727182704913._Name1} of Blairadam`;
      // const certficateUserName = `${propObject.p_8727182704913._Title1} ${propObject.p_8727182704913._Name1} of Blairadam`;

      let nameParts = propObject.p_8727182704913._Name1.split(" ");
      console.log(nameParts, "nameParts");
      let modifiedName = nameParts
        .map(
          (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        )
        .join(" ");
      console.log(modifiedName, "modified name");

      //two name
      if (propObject.p_8727182704913._Title2) {
        let namePartsTwo = propObject.p_8727182704913._Name2.split(" ");
        console.log(namePartsTwo, "nameParts");
        var modifiedNameTwo = namePartsTwo
          .map(
            (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
          )
          .join(" ");
        console.log(modifiedNameTwo, "modified name two");
      }

      const certficateUserName = `${propObject.p_8727182704913._Title1} ${modifiedName} of Blairadam`;

      // const and = "and";
      const certficateUserNameTwo = `${
        propObject.p_8727182704913._Title2
          ? propObject.p_8727182704913._Title2
          : ""
      } ${propObject.p_8727182704913._Title2 ? modifiedNameTwo : ""} ${
        propObject.p_8727182704913._Title2 ? `of Blairadam` : ""
      }`;

      const and = "and";

      //   const emblemCertficateUserName = `${propObject.p_8727183065361._Title1} ${propObject.p_8727183065361._Name1}`;
      const certificateUserNametextWidth = oldEng.widthOfTextAtSize(
        certficateUserName,
        12
      );
      const addressTitle = propObject.p_8727182704913._Title1;
      const certificateHalfOfWord = certificateUserNametextWidth / 2;
      const certificateStartingPosition =
        (pagetwo.getWidth() - certificateUserNametextWidth) / 2;
      const certificateX = certificateStartingPosition - certificateHalfOfWord;

      const certificateUserNameTwotextWidth = oldEng.widthOfTextAtSize(
        certficateUserNameTwo,
        12
      );
      const certificateTwoHalfOfWord = certificateUserNameTwotextWidth / 2;
      const certificateTwoStartingPosition =
        (pagetwo.getWidth() - certificateUserNameTwotextWidth) / 2;
      const certificateTwoX =
        certificateTwoStartingPosition - certificateTwoHalfOfWord;

      // var titleConditions = "";

      if (
        !propObject.p_8727182704913._Title2 &&
        propObject.p_8727182704913._Title1
      ) {
        if (propObject.p_8727182704913._Title1 == "Lord") {
          titleConditions = "LORD";
        } else if (propObject.p_8727182704913._Title1 == "Laird") {
          titleConditions = "LAIRD";
        } else if (propObject.p_8727182704913._Title1 == "Lady") {
          titleConditions = "LADY";
        }
      } else if (
        propObject.p_8727182704913._Title1 &&
        propObject.p_8727182704913._Title2
      ) {
        if (
          propObject.p_8727182704913._Title1 == "Lord" &&
          propObject.p_8727182704913._Title2 == "Lord"
        ) {
          titleConditions = "LORDS";
        } else if (
          propObject.p_8727182704913._Title1 == "Laird" &&
          propObject.p_8727182704913._Title2 == "Laird"
        ) {
          titleConditions = "LAIRDS";
        } else if (
          propObject.p_8727182704913._Title1 == "Lady" &&
          propObject.p_8727182704913._Title2 == "Lady"
        ) {
          titleConditions = "LADIES";
        } else if (
          propObject.p_8727182704913._Title1 == "Lord" &&
          propObject.p_8727182704913._Title2 == "Lady"
        ) {
          titleConditions = "LORD AND LADY";
        } else if (
          propObject.p_8727182704913._Title1 == "Lady" &&
          propObject.p_8727182704913._Title2 == "Lord"
        ) {
          console.log("LADY AND LORD condition");
          titleConditions = "LADY AND LORD";
        } else if (
          propObject.p_8727182704913._Title1 == "Lord" &&
          propObject.p_8727182704913._Title2 == "Laird"
        ) {
          titleConditions = "LORD AND LAIRD";
        } else if (
          propObject.p_8727182704913._Title1 == "Laird" &&
          propObject.p_8727182704913._Title2 == "Lord"
        ) {
          titleConditions = "LAIRD AND LORD";
        } else if (
          propObject.p_8727182704913._Title1 == "Lady" &&
          propObject.p_8727182704913._Title2 == "Laird"
        ) {
          titleConditions = "LADY AND LAIRD";
        } else if (
          propObject.p_8727182704913._Title1 == "Laird" &&
          propObject.p_8727182704913._Title2 == "Lady"
        ) {
          titleConditions = "LAIRD AND LADY";
        }
        console.log(
          titleConditions,
          "titleConditionstitleConditionstitleConditions"
        );
      }
      const certificateAddressTwo = `(hereafter to be proclaimed as “THE ${titleConditions}”), care of Unit 61892, PO Box 26965, Glasgow G1 9BW United Kingdom`;

      const certificateText = `The Scotland Titles Estate in Fife, Scotland, hereinafter referred to as “THE ESTATE”,\nhas been partitioned into dedicated souvenir plots of land.\n\nTHE ${titleConditions} ${
        propObject.p_8727182704913._Title2 ? "have" : "has"
      } petitioned unto Scotland Titles on this day their ${
        titleConditions == "LADY AND LAIRD" ||
        titleConditions == "LAIRD AND LADY" ||
        titleConditions == "LORD AND LAIRD" ||
        titleConditions == "LAIRD AND LORD" ||
        titleConditions == "LORD AND LADY" ||
        titleConditions == "LADY AND LORD"
          ? "\nintention to"
          : "intention to\n"
      }purchase, and Scotland Titles has determined to accept the disposition ${
        titleConditions == "LADY AND LAIRD" ||
        titleConditions == "LAIRD AND LADY" ||
        titleConditions == "LORD AND LAIRD" ||
        titleConditions == "LAIRD AND LORD" ||
        titleConditions == "LORD AND LADY" ||
        titleConditions == "LADY AND LORD"
          ? "\nof a plot of"
          : "of a plot of\n"
      }land within THE ESTATE, at Cantsdam, hereafter referred to as “THE ${
        titleConditions == "LADY AND LAIRD" ||
        titleConditions == "LAIRD AND LADY" ||
        titleConditions == "LORD AND LAIRD" ||
        titleConditions == "LAIRD AND LORD" ||
        titleConditions == "LORD AND LADY" ||
        titleConditions == "LADY AND LORD"
          ? "\nLAND"
          : "LAND"
      }”.\n\nScotland Titles, in CONSIDERATION of all monies due to be paid to us by THE\n${titleConditions}, of which we have received of in full, we do hereby DISCHARGE ${
        titleConditions == "LADY AND LAIRD" ||
        titleConditions == "LAIRD AND LADY" ||
        titleConditions == "LORD AND LAIRD" ||
        titleConditions == "LAIRD AND LORD" ||
        titleConditions == "LORD AND LADY" ||
        titleConditions == "LADY AND LORD"
          ? "\nunto them"
          : "unto them\n"
      }and DISPONE to and in perpetuity in favour of THE ${titleConditions} ${
        titleConditions == "LADY AND LAIRD" ||
        titleConditions == "LAIRD AND LADY" ||
        titleConditions == "LORD AND LAIRD" ||
        titleConditions == "LAIRD AND LORD" ||
        titleConditions == "LORD AND LADY" ||
        titleConditions == "LADY AND LORD"
          ? "\nand to their future"
          : "and to their future\n"
      }assignees the whole of THE LAND but always with ${
        titleConditions == "LADY AND LAIRD" ||
        titleConditions == "LAIRD AND LADY" ||
        titleConditions == "LORD AND LAIRD" ||
        titleConditions == "LAIRD AND LORD" ||
        titleConditions == "LORD AND LADY" ||
        titleConditions == "LADY AND LORD"
          ? "pedestrian\naccess only over THE "
          : "pedestrian access only over THE\n"
      }ESTATE; such rights of vehicular access are reserved ${
        titleConditions == "LADY AND LAIRD" ||
        titleConditions == "LAIRD AND LADY" ||
        titleConditions == "LORD AND LAIRD" ||
        titleConditions == "LAIRD AND LORD" ||
        titleConditions == "LORD AND LADY" ||
        titleConditions == "LADY AND LORD"
          ? "\nto Scotland Titles and its"
          : "to Scotland Titles and its\n"
      }successors in title plus any and all others authorised by it; ${
        titleConditions == "LADY AND LAIRD" ||
        titleConditions == "LAIRD AND LADY" ||
        titleConditions == "LORD AND LAIRD" ||
        titleConditions == "LAIRD AND LORD" ||
        titleConditions == "LORD AND LADY" ||
        titleConditions == "LADY AND LORD"
          ? `\nTHE ${titleConditions} ${
              propObject.p_8727182704913._Title2 ? "covenant" : "covenants"
            } not`
          : `THE ${titleConditions} ${
              propObject.p_8727182704913._Title2 ? "covenant" : "covenants"
            } not\n`
      } to dispose of THE LAND in part only.\n\nScotland Titles is a trading name of Blairdam Corporation PA. Terms and Conditions,\nand this CERTIFICATE shall be governed by the Law of Scotland.`;
      const datee = propObject.p_8727182704913._Date;
      const dateObj = new Date(datee);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are 0-indexed
      const day = String(dateObj.getDate()).padStart(2, "0");

      const monthNames = [
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER",
      ];

      const monthName = monthNames[dateObj.getMonth()];
      let titledayWithSuffix;

      if (day >= 11 && day <= 13) {
        titledayWithSuffix = `${day}TH`;
      } else {
        switch (day % 10) {
          case 1:
            titledayWithSuffix = `${day}ST`;
            break;
          case 2:
            titledayWithSuffix = `${day}ND`;
            break;
          case 3:
            titledayWithSuffix = `${day}RD`;
            break;
          default:
            titledayWithSuffix = `${day}TH`;
        }
      }
      let text = propObject.p_8727182704913.variant;
      const myArray = text.split(" ");
      let word = myArray[0];

      const certificateTextTwo = `THE ESTATE location is KINGSEAT ROAD (OFF CANTSDAM ROAD),\nCANTSDAM, KELTY, FIFE, SCOTLAND KY12 0SW\n\nTHE ESTATE is recorded in the General Register of Sasines RS30-32\n\nCoordinates to the centre of THE ESTATE are;\nLatitude, Longitude in degrees 56°07${"`"}18 N , 003°23 08 W\nX Easting 313956 , Y Northing 692954\n\nThe Plot Number of THE LAND within THE ESTATE is ${order_number}${
        propObject.p_8727182704913.reference != 0
          ? ` - ${propObject.p_8727182704913.reference}`
          : ""
      }\n\nThe size of THE LAND is ${word} square foot\n\nDate of Entry of THE LAND is as the date of this CERTIFICATE\n\nThis Disposition is signed for and on behalf of Scotland Titles and witnessed on the\n${titledayWithSuffix} Day of ${monthName} ${year}`;
      pagetwo.drawImage(imgBg, {
        width: pagetwo.getWidth(),
        height: pagetwo.getHeight(),
      });

      pagetwo.drawImage(yellow_middle, {
        x: 380,
        y: propObject.p_8727182704913._Title2 ? 385 : 405,
        width: ertificateMidpngDims.width,
        height: ertificateMidpngDims.height,
      });
      pagetwo.drawImage(ribbonImg, {
        x: 30,
        y: 410,
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
        x: 580,
        y: 70,
        height: 30,
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
        font: tempusFont,
        // font: tempusFont,
      });

      pagetwo.drawImage(welcome_emblem_signature, {
        x: 500,
        y: 70,
        height: 50,
        width: 30,
      });

      pagetwo.drawText("Signed", {
        x: 500,
        y: 60,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
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
        font: tempusFont,
      });

      pagetwo.drawText(certficateUserName, {
        x: certificateX,
        y: 470,
        width: textWidth,
        height: textHeight,
        size: 24,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });
      {
        propObject.p_8727182704913._Title2 &&
          pagetwo.drawText(and, {
            x: 400,
            y: 460,
            width: textWidth,
            height: textHeight,
            size: 10,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: tempusFont,
          });

        pagetwo.drawText(certficateUserNameTwo, {
          x: certificateTwoX,
          y: 435,
          width: textWidth,
          height: textHeight,
          size: 24,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: oldEng,
        });
      }
      pagetwo.drawText(certificateAddressTwo, {
        x: 195,
        y: propObject.p_8727182704913._Title2 ? 415 : 450,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      pagetwo.drawText(certificateText, {
        x: 60,
        y: 370,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      pagetwo.drawText(certificateTextTwo, {
        x: 460,
        y: 370,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //printed pagetwo  ========

      //deed page one

      const MainHeading = "Master Title Deed";
      const SubHeading = "Deed of Change of Name and Title (Deed Poll)";
      const formerTitle = "Former Name & Title";
      const newTitle = "(New Name & Title)";
      const underlineHeight = 0.5;
      const underlineY = 680; // Adjust the y-position as needed

      // Adjust the x-positions as needed for each form field

      const underlineX1 = 240; // For Form Field 1
      const underlineX2 = 320; // For Form Field 1
      const underlineX3 = 110; // For Form Field 2
      const underlineX4 = 180; // For Form Field 2
      const underlineX5 = 50; // For Form Field 3
      const underlineX6 = 580; // For Form Field 3
      const deedFormTextPlaceHolder = "Home Address";
      // const formerNameAndTitle="Former Name & Title"
      // const newNameAndTitle="New Name & Title"

      const positions = [
        // { x: 110, y: 710 }, //first
        { x: 125, y: 536 }, //second
        // { x: 395, y: 473 },
        { x: 30, y: 355 }, //in witneess

        // Add more positions as needed
      ];
      positions.forEach((position) => {
        deedPage.drawText(`${formerTitle}.`, {
          x: position.x,
          y: position.y,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });
      });

      //Capital name
      let deedNameParts = propObject.p_8727182704913._Name1.split(" ");
      console.log(nameParts, "nameParts");
      var deedModifiedName = deedNameParts
        .map(
          (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        )
        .join(" ");

      //two name
      if (propObject.p_8727182704913._Title2) {
        let deedNamePartsTwo = propObject.p_8727182704913._Name2.split(" ");
        var deedModifiedNameTwo = deedNamePartsTwo
          .map(
            (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
          )
          .join(" ");
      }
      const deedUserNameWidth = `of ${deedModifiedName}`;
      const formertextWidth = timesRomanFontHeading.widthOfTextAtSize(
        deedUserNameWidth,
        12
      );
      console.log(formertextWidth, "formertextWidth");
      const totalWidth = formertextWidth + 35;

      const deedNewNameWidth = `now ${propObject.p_8727182704913._Title1} ${deedModifiedName}`;
      const newtextWidth = timesRomanFontHeading.widthOfTextAtSize(
        deedNewNameWidth,
        12
      );

      const newTotalTextWidth = newtextWidth + 30;

      deedPage.drawText(`(${formerTitle})`, {
        x: totalWidth,
        y: 710,
        size: 12,
        width: textWidth,
        height: textHeight,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });

      deedPage.drawText(formerTitle, {
        x: 175,
        y: 449,
        size: 12,
        width: textWidth,
        height: textHeight,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });

      deedPage.drawText(newTitle, {
        x: newTotalTextWidth,
        y: 683,
        size: 12,
        width: textWidth,
        height: textHeight,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });

      const deedFormText = `of ${deedModifiedName}\n\nnow ${propObject.p_8727182704913._Title1} ${deedModifiedName}\n\nBY THIS DEED OF CHANGE OF NAME AND TITLE made by myself the undersigned\n\n${propObject.p_8727182704913._Title1} ${deedModifiedName}\n\nof`;
      const declarationOne = `HEREBY DECLARE AS FOLLOWS;`;
      const absolute =
        "1.   I ABSOLUTELY and entirely renounce, relinquish and abandon the use of my said";
      const formerNameBreak = `Former Name &`;
      const titleBreak = "Title";
      const absoluteTwo =
        "and assume, adopt and determine to take and use from the date hereof the";
      const newTitleTwo = "New Name & Title";
      const inContent = "in";
      const absoluteThree = "substitution for my";
      const declarationTwo = `2.    I SHALL AT ALL TIMES hereafter in all records, deeds, documents and other writings and in all\nactions and proceedings as well as in all dealings and transactions and on all occasions whatsoever use and`;
      const declarationTwoSubscribe = "subscribe the said";
      const declarationTwoSubscribeName = "as my name in substitution for my";
      const so = "so";
      const relinqushed =
        "relinquished as aforesaid to the intent that I may hereafter be called, known or distinguished by the";
      const newTitleBreak = "New Name";
      const newTitleBreakTwo = "& Title";
      const only = "only and not by the";

      const declarationThree = `3.    I AUTHORISE AND REQUIRE all persons at all times to designate, describe and address me by my`;
      const adopt = "adopted";
      const declarationFour = `IN WITNESS whereof I have hereunto subscribed my adopted and substituted`;
      const declarationFourTwo = "and also my";
      const signed = "SIGNED THIS";
      const dayOf = "DAY OF";
      const yearIn = "IN THE YEAR";
      const signedAs = "SIGNED AS A DEED AND DELIVERED\n\nby the above named";
      const signPlaceHolder = "Signature";
      const lordName = `${propObject.p_8727182704913._Title1} ${deedModifiedName}\n\nFormerly known as`;
      const formerName = `${deedModifiedName}`;

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
        font: timesRomanFont,
      });

      deedPage.drawLine({
        start: { x: underlineX5, y: 600 }, // Adjust the y-position for Form Field 3
        end: { x: underlineX6, y: 600 }, // Adjust the y-position for Form Field 3
        color: rgb(0.65, 0.65, 0.65),
        thickness: underlineHeight,
      });

      deedPage.drawText(deedFormTextPlaceHolder, {
        x: 60,
        y: 603,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0.65, 0.65, 0.65),
        lineHeight: fontSize * 1.2,
        font: timesRomanItalicFont,
      });

      deedPage.drawText(declarationOne, {
        x: 30,
        y: 580,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      deedPage.drawText(absolute, {
        x: 30,
        y: 560,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      deedPage.drawText(formerNameBreak, {
        x: 453,
        y: 560,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });
      deedPage.drawText(titleBreak, {
        x: 30,
        y: 548,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });
      deedPage.drawText(absoluteTwo, {
        x: 58,
        y: 548,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      deedPage.drawText(newTitleTwo, {
        x: 415,
        y: 548,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });
      deedPage.drawText(inContent, {
        x: 520,
        y: 548,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      deedPage.drawText(absoluteThree, {
        x: 30,
        y: 536,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
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
        font: timesRomanFont,
      });

      deedPage.drawText(declarationTwoSubscribe, {
        x: 30,
        y: 473,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      deedPage.drawText(newTitleTwo, {
        x: 120,
        y: 473,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      deedPage.drawText(declarationTwoSubscribeName, {
        x: 210,
        y: 473,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      deedPage.drawText(formerTitle, {
        x: 380,
        y: 473,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });

      deedPage.drawText(so, {
        x: 500,
        y: 473,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      deedPage.drawText(relinqushed, {
        x: 30,
        y: 461,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      deedPage.drawText(newTitleBreak, {
        x: 510,
        y: 461,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });

      deedPage.drawText(newTitleBreakTwo, {
        x: 30,
        y: 449,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });

      deedPage.drawText(only, {
        x: 73,
        y: 449,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });

      deedPage.drawText(declarationThree, {
        x: 30,
        y: 420,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      deedPage.drawText(adopt, {
        x: 30,
        y: 408,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      deedPage.drawText(newTitleTwo, {
        x: 70,
        y: 408,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });

      deedPage.drawText(declarationFour, {
        x: 30,
        y: 370,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      deedPage.drawText(newTitleTwo, {
        x: 413,
        y: 370,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });
      deedPage.drawText(declarationFourTwo, {
        x: 515,
        y: 370,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
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
        font: timesRomanFont,
      });
      deedPage.drawLine({
        start: { x: underlineX3, y: 300 }, // Adjust the y-position for Form Field 3
        end: { x: underlineX4, y: 300 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });

      deedPage.drawText(dayOf, {
        x: 190,
        y: 300,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      deedPage.drawLine({
        start: { x: underlineX1, y: 300 }, // Adjust the y-position for Form Field 3
        end: { x: underlineX2, y: 300 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });

      deedPage.drawText(yearIn, {
        x: 330,
        y: 300,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
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
        font: timesRomanItalicFont,
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
        font: timesRomanFont,
      });

      deedPage.drawText(presence, {
        x: 270,
        y: 240,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      deedPage.drawText(witness, {
        x: 270,
        y: 190,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      deedPage.drawLine({
        start: { x: 370, y: 190 }, // Adjust the y-position for Form Field 3
        end: { x: 540, y: 190 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });

      deedPage.drawText("Name", {
        x: 270,
        y: 160,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      deedPage.drawLine({
        start: { x: 300, y: 160 }, // Adjust the y-position for Form Field 3
        end: { x: 540, y: 160 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });

      deedPage.drawText("Address", {
        x: 270,
        y: 130,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      deedPage.drawLine({
        start: { x: 310, y: 130 }, // Adjust the y-position for Form Field 3
        end: { x: 540, y: 130 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });
      deedPage.drawLine({
        start: { x: 270, y: 105 }, // Adjust the y-position for Form Field 3
        end: { x: 540, y: 105 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });
      deedPage.drawLine({
        start: { x: 270, y: 80 }, // Adjust the y-position for Form Field 3
        end: { x: 540, y: 80 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });

      deedPage.drawText("Occupation", {
        x: 270,
        y: 50,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      deedPage.drawLine({
        start: { x: 330, y: 50 }, // Adjust the y-position for Form Field 3
        end: { x: 540, y: 50 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });

      //master deed page two
      if (propObject.p_8727182704913._Title2) {
        positions.forEach((position) => {
          deedPageTwo.drawText(`${formerTitle}.`, {
            x: position.x,
            y: position.y,
            size: 12,
            width: textWidth,
            height: textHeight,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeading,
          });
        });

        const deedTwoUserNameWidth = `of ${deedModifiedNameTwo}`;
        const formerDeedTwotextWidth = timesRomanFontHeading.widthOfTextAtSize(
          deedTwoUserNameWidth,
          12
        );
        // console.log(formertextWidth, "formertextWidth");
        const totalWidthDeedTwo = formerDeedTwotextWidth + 35;

        const deedTwoNewNameWidth = `now ${propObject.p_8727182704913._Title2} ${deedModifiedNameTwo}`;
        const newDeedTwotextWidth = timesRomanFontHeading.widthOfTextAtSize(
          deedTwoNewNameWidth,
          12
        );

        const newDeedTwoTotalTextWidth = newDeedTwotextWidth + 30;

        deedPageTwo.drawText(`(${formerTitle})`, {
          x: totalWidthDeedTwo,
          y: 710,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(formerTitle, {
          x: 175,
          y: 449,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(newTitle, {
          x: newDeedTwoTotalTextWidth,
          y: 683,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        const deedFormTextTwo = `of ${deedModifiedNameTwo}\n\nnow ${propObject.p_8727182704913._Title2} ${deedModifiedNameTwo}\n\nBY THIS DEED OF CHANGE OF NAME AND TITLE made by myself the undersigned\n\n${propObject.p_8727182704913._Title2} ${deedModifiedNameTwo}\n\nof`;

        const lordNameTwo = `${propObject.p_8727182704913._Title2} ${deedModifiedNameTwo}\n\nFormerly known as`;
        const formerNameTwo = `${deedModifiedNameTwo}`;

        deedPageTwo.drawText(MainHeading, {
          x: 200,
          y: 750,
          size: 20,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });
        deedPageTwo.drawText(SubHeading, {
          x: 180,
          y: 730,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(deedFormTextTwo, {
          x: 30,
          y: 710,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(deedFormTextTwo, {
          x: 30,
          y: 710,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: underlineX5, y: 600 }, // Adjust the y-position for Form Field 3
          end: { x: underlineX6, y: 600 }, // Adjust the y-position for Form Field 3
          color: rgb(0.65, 0.65, 0.65),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText(deedFormTextPlaceHolder, {
          x: 60,
          y: 603,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0.65, 0.65, 0.65),
          lineHeight: fontSize * 1.2,
          font: timesRomanItalicFont,
        });

        deedPageTwo.drawText(declarationOne, {
          x: 30,
          y: 580,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(absolute, {
          x: 30,
          y: 560,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(formerNameBreak, {
          x: 453,
          y: 560,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });
        deedPageTwo.drawText(titleBreak, {
          x: 30,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });
        deedPageTwo.drawText(absoluteTwo, {
          x: 58,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(newTitleTwo, {
          x: 415,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });
        deedPageTwo.drawText(inContent, {
          x: 520,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(absoluteThree, {
          x: 30,
          y: 536,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(declarationTwo, {
          x: 30,
          y: 500,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(declarationTwoSubscribe, {
          x: 30,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(newTitleTwo, {
          x: 120,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(declarationTwoSubscribeName, {
          x: 210,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(formerTitle, {
          x: 380,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(so, {
          x: 500,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(relinqushed, {
          x: 30,
          y: 461,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(newTitleBreak, {
          x: 510,
          y: 461,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(newTitleBreakTwo, {
          x: 30,
          y: 449,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(only, {
          x: 73,
          y: 449,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(declarationThree, {
          x: 30,
          y: 420,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(adopt, {
          x: 30,
          y: 408,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(newTitleTwo, {
          x: 70,
          y: 408,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(declarationFour, {
          x: 30,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(newTitleTwo, {
          x: 413,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });
        deedPageTwo.drawText(declarationFourTwo, {
          x: 515,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(signed, {
          x: 30,
          y: 300,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawLine({
          start: { x: underlineX3, y: 300 }, // Adjust the y-position for Form Field 3
          end: { x: underlineX4, y: 300 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText(dayOf, {
          x: 190,
          y: 300,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: underlineX1, y: 300 }, // Adjust the y-position for Form Field 3
          end: { x: underlineX2, y: 300 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText(yearIn, {
          x: 330,
          y: 300,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(signedAs, {
          x: 30,
          y: 270,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 30, y: 200 }, // Adjust the y-position for Form Field 3
          end: { x: 250, y: 200 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
        deedPageTwo.drawText(signPlaceHolder, {
          x: 40,
          y: 190,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0.65, 0.65, 0.65),
          lineHeight: fontSize * 1.2,
          font: timesRomanItalicFont,
        });

        deedPageTwo.drawLine({
          start: { x: 30, y: 170 }, // Adjust the y-position for Form Field 3
          end: { x: 250, y: 170 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText(lordNameTwo, {
          x: 40,
          y: 155,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 30, y: 90 }, // Adjust the y-position for Form Field 3
          end: { x: 250, y: 90 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText(formerNameTwo, {
          x: 40,
          y: 75,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(presence, {
          x: 270,
          y: 240,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(witness, {
          x: 270,
          y: 190,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 370, y: 190 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 190 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText("Name", {
          x: 270,
          y: 160,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 300, y: 160 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 160 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText("Address", {
          x: 270,
          y: 130,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 310, y: 130 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 130 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
        deedPageTwo.drawLine({
          start: { x: 270, y: 105 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 105 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
        deedPageTwo.drawLine({
          start: { x: 270, y: 80 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 80 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText("Occupation", {
          x: 270,
          y: 50,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 330, y: 50 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 50 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
      }

      if (propObject.p_8727182704913._Title2) {
        positions.forEach((position) => {
          deedPageTwo.drawText(`${formerTitle}.`, {
            x: position.x,
            y: position.y,
            size: 12,
            width: textWidth,
            height: textHeight,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeading,
          });
        });

        const deedTwoUserNameWidth = `of ${deedModifiedNameTwo}`;
        const formerDeedTwotextWidth = timesRomanFontHeading.widthOfTextAtSize(
          deedTwoUserNameWidth,
          12
        );
        // console.log(formertextWidth, "formertextWidth");
        const totalWidthDeedTwo = formerDeedTwotextWidth + 35;

        const deedTwoNewNameWidth = `now ${propObject.p_8727182704913._Title2} ${deedModifiedNameTwo}`;
        const newDeedTwotextWidth = timesRomanFontHeading.widthOfTextAtSize(
          deedTwoNewNameWidth,
          12
        );

        const newDeedTwoTotalTextWidth = newDeedTwotextWidth + 30;

        deedPageTwo.drawText(`(${formerTitle})`, {
          x: totalWidthDeedTwo,
          y: 710,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(formerTitle, {
          x: 175,
          y: 449,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(newTitle, {
          x: newDeedTwoTotalTextWidth,
          y: 683,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        const deedFormTextTwo = `of ${deedModifiedNameTwo}\n\nnow ${propObject.p_8727182704913._Title2} ${deedModifiedNameTwo}\n\nBY THIS DEED OF CHANGE OF NAME AND TITLE made by myself the undersigned\n\n${propObject.p_8727182704913._Title2} ${deedModifiedNameTwo}\n\nof`;

        const lordNameTwo = `${propObject.p_8727182704913._Title2} ${deedModifiedNameTwo}\n\nFormerly known as`;
        const formerNameTwo = `${deedModifiedNameTwo}`;

        deedPageTwo.drawText(MainHeading, {
          x: 200,
          y: 750,
          size: 20,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });
        deedPageTwo.drawText(SubHeading, {
          x: 180,
          y: 730,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(deedFormTextTwo, {
          x: 30,
          y: 710,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(deedFormTextTwo, {
          x: 30,
          y: 710,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: underlineX5, y: 600 }, // Adjust the y-position for Form Field 3
          end: { x: underlineX6, y: 600 }, // Adjust the y-position for Form Field 3
          color: rgb(0.65, 0.65, 0.65),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText(deedFormTextPlaceHolder, {
          x: 60,
          y: 603,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0.65, 0.65, 0.65),
          lineHeight: fontSize * 1.2,
          font: timesRomanItalicFont,
        });

        deedPageTwo.drawText(declarationOne, {
          x: 30,
          y: 580,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(absolute, {
          x: 30,
          y: 560,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(formerNameBreak, {
          x: 453,
          y: 560,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });
        deedPageTwo.drawText(titleBreak, {
          x: 30,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });
        deedPageTwo.drawText(absoluteTwo, {
          x: 58,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(newTitleTwo, {
          x: 415,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });
        deedPageTwo.drawText(inContent, {
          x: 520,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(absoluteThree, {
          x: 30,
          y: 536,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(declarationTwo, {
          x: 30,
          y: 500,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(declarationTwoSubscribe, {
          x: 30,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(newTitleTwo, {
          x: 120,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(declarationTwoSubscribeName, {
          x: 210,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(formerTitle, {
          x: 380,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(so, {
          x: 500,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(relinqushed, {
          x: 30,
          y: 461,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(newTitleBreak, {
          x: 510,
          y: 461,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(newTitleBreakTwo, {
          x: 30,
          y: 449,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(only, {
          x: 73,
          y: 449,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(declarationThree, {
          x: 30,
          y: 420,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(adopt, {
          x: 30,
          y: 408,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(newTitleTwo, {
          x: 70,
          y: 408,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(declarationFour, {
          x: 30,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(newTitleTwo, {
          x: 413,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });
        deedPageTwo.drawText(declarationFourTwo, {
          x: 515,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(signed, {
          x: 30,
          y: 300,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawLine({
          start: { x: underlineX3, y: 300 }, // Adjust the y-position for Form Field 3
          end: { x: underlineX4, y: 300 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText(dayOf, {
          x: 190,
          y: 300,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: underlineX1, y: 300 }, // Adjust the y-position for Form Field 3
          end: { x: underlineX2, y: 300 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText(yearIn, {
          x: 330,
          y: 300,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(signedAs, {
          x: 30,
          y: 270,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 30, y: 200 }, // Adjust the y-position for Form Field 3
          end: { x: 250, y: 200 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
        deedPageTwo.drawText(signPlaceHolder, {
          x: 40,
          y: 190,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0.65, 0.65, 0.65),
          lineHeight: fontSize * 1.2,
          font: timesRomanItalicFont,
        });

        deedPageTwo.drawLine({
          start: { x: 30, y: 170 }, // Adjust the y-position for Form Field 3
          end: { x: 250, y: 170 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText(lordNameTwo, {
          x: 40,
          y: 155,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 30, y: 90 }, // Adjust the y-position for Form Field 3
          end: { x: 250, y: 90 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText(formerNameTwo, {
          x: 40,
          y: 75,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(presence, {
          x: 270,
          y: 240,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(witness, {
          x: 270,
          y: 190,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 370, y: 190 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 190 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText("Name", {
          x: 270,
          y: 160,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 300, y: 160 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 160 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText("Address", {
          x: 270,
          y: 130,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 310, y: 130 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 130 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
        deedPageTwo.drawLine({
          start: { x: 270, y: 105 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 105 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
        deedPageTwo.drawLine({
          start: { x: 270, y: 80 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 80 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText("Occupation", {
          x: 270,
          y: 50,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 330, y: 50 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 50 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
      }

      // =====================================Printed Title Pack started ================================

      // const tartanCerificatePrinted = pdfDoc.addPage([595, 842]);

      const tartan_certificate_heading = `To Whomsoever These Presents Do Concern`;

      //Name Capital work

      let tartanNameParts = propObject.p_8727182704913._Name1.split(" ");
      console.log(tartanNameParts, "nameParts");
      let tartanModifiedName = tartanNameParts
        .map(
          (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        )
        .join(" ");
      console.log(tartanModifiedName, "modified name");

      //two name
      if (propObject.p_8727182704913._Title2) {
        let tartanNamePartsTwo = propObject.p_8727182704913._Name2.split(" ");
        var tartanModifiedNameTwo = tartanNamePartsTwo
          .map(
            (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
          )
          .join(" ");
        console.log(tartanModifiedNameTwo, "modified name two");
      }

      const tartanCertficateUserName = `${
        propObject.p_8727182704913._Title1
      } ${tartanModifiedName} ${propObject.p_8727182704913._Title2 ? "&" : ""}`;
      const userNametextWidth = oldEng.widthOfTextAtSize(
        tartanCertficateUserName,
        12
      );

      const halfOfWord = userNametextWidth / 2;
      const startingPosition =
        (tartanCertificate.getWidth() - userNametextWidth) / 2;
      const x = startingPosition - halfOfWord;

      const tartanCertficateUserNameTwo = `${
        propObject.p_8727182704913._Title2
          ? `${propObject.p_8727182704913._Title2} ${tartanModifiedNameTwo}`
          : ""
      }`;

      const tartanuserNameTwotextWidth = oldEng.widthOfTextAtSize(
        tartanCertficateUserNameTwo,
        12
      );

      const tartanHalfOfWordTwo = tartanuserNameTwotextWidth / 2;
      const tartanStartingPositionTwo =
        (tartanCertificate.getWidth() - tartanuserNameTwotextWidth) / 2;
      const tartanTwox = tartanStartingPositionTwo - tartanHalfOfWordTwo;
      const declare = `${
        propObject.p_8727182704913._Title2 ? "Do" : "Does"
      } Declare`;
      const Allegiance = "Clan Allegiance";
      const prey = "and Prey to Wear";

      const certified = "Certified Tartan";
      const Greeting = "Scotland Titles send Greeting";

      const tartanCertificateGreetingText = `and do declare that`;
      const tartanCertificateGreetingTextTwo = `having by petition unto us unto this day,\n\n`;

      const know = "Let It Be Known";

      const tartanCertificateknowText = `that the said by virtue of ownership`;
      const tartanCertificateknowTextTwo = `of Land in Scotland and in particular the Land within the\nKingdom of Fife by Cantsdam as described in the Disposition\nand Certificate of Sale, the ${
        propObject.p_8727182704913._Title2 ? "Petitioner are" : "Petitioner is"
      } henceforth and in\nperpetuity amongst all nobles and in all places of honour, to\nbe taken, numbered, accounted and received as a ${
        propObject.p_8727182704913._Title2 ? "Lairds" : "Laird"
      } of\nScotland,\n\n`;

      const Therefore = "Know Ye Therefore";

      const tartanCertificateThereforeText = `that the ${
        propObject.p_8727182704913._Title2 ? "Petitioners" : "Petitioner"
      } having preyed`;
      const tartanCertificateThereforeTextTwo = `that there might be granted unto them to use such Scottish\nTartan as set in law during the dress act of 1746 as repealed in\n1782 and thereinafter adopted, acknowledged and recognised\nas the symbolic National Dress of Scotland,\n\n`;

      const scotlantTiles = "Scilicet that Scotland Titles";

      const tartanCertificateScotlantTilesText = `has assigned, and do`;
      const tartanCertificateScotlantTilesTextTwo = `by these presents assign, ratify and confirm unto the ${
        propObject.p_8727182704913._Title2 ? "Petitioners" : "Petitioner"
      }\nthe following ensemble robes in such tartan as is depicted\nupon the margin sinister hereof, and award unto the\n${
        propObject.p_8727182704913._Title2 ? "Petitioners" : "Petitioner"
      } the rights to use, wear, display and earasay such\nregistered Scottish Tartan in exchange for their sworn\nallegiance to the Clan of Scotland,\n\n`;

      const Tartan = "Videlicet such Tartan";
      const tartanCertificateText = "as is official and certified as set";
      const tartanCertificateTextTwo =
        "out in the Scottish Register of Tartans act 2008 administered\nby the National Records of Scotland with advice from the\nCourt of the Lord Lyon and the Registrar General for Scotland\nacting as the Keeper of the Scottish Register of Tartans,";
      const demostration = "By demonstration of";

      const demonstrationText = " which ensemble robes the said";
      const demonstrationTextTwo = `${
        propObject.p_8727182704913._Title2 ? "Petitioner are" : "Petitioner is"
      }, amongst all nobles and in all places of honour, to\nbe received as a ${
        propObject.p_8727182704913._Title2 ? "Lairds" : "Laird"
      } of Scotland,`; //Signed content

      const tartanFurther = "Furthermore by ownership";
      const tartanFurtherDescription = "of lands in Scotland, the";
      const tartanFurtherDescriptionTwo = `${propObject.p_8727182704913._Title1}, in such display of the proscribed ensemble robes are to\nbe received with honour in all of Scotland,`;

      const tartanTestimony = "In Testimony whereof";
      const tartanTestimonyDescription = "we have subscribed these";
      const tartanTestimonyDescriptionTwo = `presents and the seal of our office is affixed hereto at Scotland\nTitles this day in this year of the reign of our sovereign Charles\nthe Third, by the Grace of God, of the United Kingdom of\nGreat Britain and Northern Ireland, King, Head of the\nCommonwealth, Defender of the Faith, and in the Year of our\n${propObject.p_8727182704913._Title1} stated henceforth.`;

      const tartanSigned = "Signed";

      const tartanBgPath = path.resolve("./public", "images", "tartan_bg.png");

      const tartanbg_Buffer = fs.readFileSync(tartanBgPath);

      const tartan_bg = await pdfDoc.embedPng(tartanbg_Buffer);

      const tartan_borders = await pdfDocPrinted.embedJpg(border_Buffer);

      const tartanlogoPath = path.resolve(
        "./public",
        "images",
        "tartan_logo.jpg"
      );

      const tartan_logo_Buffer = fs.readFileSync(tartanlogoPath);

      const tartan_logo = await pdfDoc.embedJpg(tartan_logo_Buffer);

      const tartan_logo_printed = await pdfDocPrinted.embedJpg(
        tartan_logo_Buffer
      );

      const tartansignPath = path.resolve(
        "./public",
        "images",
        "g_signature.png"
      );
      const tartan_signature_Buffer = fs.readFileSync(tartansignPath);

      const tartan_signature = await pdfDoc.embedPng(tartan_signature_Buffer);
      const tartan_signature_printed = await pdfDocPrinted.embedPng(
        tartan_signature_Buffer
      );

      if (propObject.p_8727182704913.variant.includes("Printed Pack")) {
        var textWidth = tartanCertificatePrinted.getWidth() - 100; // Adjust the width as needed
        var textHeight = tartanCertificatePrinted.getHeight() - 50;
      } else {
        var textWidth = tartanCertificate.getWidth() - 100; // Adjust the width as needed
        var textHeight = tartanCertificate.getHeight() - 50;
      }

      const dateText = "Date";

      const tartandatee = propObject.p_8727182704913._Date;
      const tartandateObj = new Date(tartandatee);
      const tartanyear = tartandateObj.getFullYear();
      const tartanmonth = String(tartandateObj.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are 0-indexed
      const tartanday = String(tartandateObj.getDate()).padStart(2, "0");
      //   const

      const tartanmonthName = monthNames[tartandateObj.getMonth()];
      let tartandayWithSuffix;

      if (tartanday >= 11 && tartanday <= 13) {
        tartandayWithSuffix = `${tartanday}TH`;
      } else {
        switch (tartanday % 10) {
          case 1:
            tartandayWithSuffix = `${tartanday}ST`;
            break;
          case 2:
            tartandayWithSuffix = `${tartanday}ND`;
            break;
          case 3:
            tartandayWithSuffix = `${tartanday}RD`;
            break;
          default:
            tartandayWithSuffix = `${tartanday}TH`;
        }
      }
      const TartandateContent = `THIS ${tartandayWithSuffix} DAY OF ${tartanmonthName} IN THE YEAR ${tartanyear}`;
      const copyright =
        "All content, layout, artwork and illustrations copyright Scotland Titles 2021 and subject to licence";

      tartanCertificate.drawImage(tartan_bg, {
        width: tartanCertificate.getWidth(),
        height: tartanCertificate.getHeight(),
      });

      tartanCertificate.drawImage(img, {
        x: 500,
        y: 710,
        width: pngDims.width,
        height: pngDims.height,
      });

      tartanCertificate.drawImage(stampImg, {
        x: 480,
        y: 70,
        width: stampPngDims.width,
        height: stampPngDims.height,
      });

      tartanCertificate.drawText(tartan_certificate_heading, {
        x: 150,
        y: 750,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(tartanCertficateUserName, {
        x: x,
        y: 720,
        width: textWidth,
        height: textHeight,
        size: 26,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });
      tartanCertificate.drawText(tartanCertficateUserNameTwo, {
        x: tartanTwox,
        y: 690,
        width: textWidth,
        height: textHeight,
        size: 26,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(declare, {
        x: 250,
        y: propObject.p_8727182704913._Title2 ? 665 : 690,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(Allegiance, {
        x: 50,
        y: propObject.p_8727182704913._Title2 ? 640 : 660,
        size: 26,
        width: textWidth,
        height: textHeight,
        color: rgb(0.054, 0.027, 0.301),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(prey, {
        x: 230,
        y: propObject.p_8727182704913._Title2 ? 640 : 660,
        size: 18,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(certified, {
        x: 370,
        y: propObject.p_8727182704913._Title2 ? 640 : 660,
        size: 26,
        width: textWidth,
        height: textHeight,
        color: rgb(0.054, 0.027, 0.301),

        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawImage(certificateMid, {
        x: 230,
        y: propObject.p_8727182704913._Title2 ? 600 : 610,
        width: ertificateMidpngDims.width,
        height: ertificateMidpngDims.height,
      });
      tartanCertificate.drawText(Greeting, {
        x: 20,
        y: 560,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(tartanCertificateGreetingText, {
        x: 220,
        y: 560,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(tartanCertificateGreetingTextTwo, {
        x: 20,
        y: 545,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //shewen text

      tartanCertificate.drawText(know, {
        x: 20,
        y: 520,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(tartanCertificateknowText, {
        x: 143,
        y: 520,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(tartanCertificateknowTextTwo, {
        x: 20,
        y: 505,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //videlict

      tartanCertificate.drawText(Therefore, {
        x: 20,
        y: 410,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(tartanCertificateThereforeText, {
        x: 155,
        y: 410,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(tartanCertificateThereforeTextTwo, {
        x: 20,
        y: 395,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //In Testimony Whereof

      tartanCertificate.drawText(scotlantTiles, {
        x: 20,
        y: 320,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(tartanCertificateScotlantTilesText, {
        x: 208,
        y: 320,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(tartanCertificateScotlantTilesTextTwo, {
        x: 20,
        y: 305,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(Tartan, {
        x: 20,
        y: 210,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(tartanCertificateText, {
        x: 165,
        y: 210,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(tartanCertificateTextTwo, {
        x: 20,
        y: 195,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText("Royal Stewart Hunting", {
        x: 360,
        y: 570,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawImage(tartan_logo, {
        x: 330,
        y: 330,
        height: 230,
        width: 230,
      });

      tartanCertificate.drawText(demostration, {
        x: 310,
        y: 300,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(demonstrationText, {
        x: 445,
        y: 300,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(demonstrationTextTwo, {
        x: 310,
        y: 285,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(tartanTestimony, {
        x: 310,
        y: 250,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(tartanTestimonyDescription, {
        x: 460,
        y: 250,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(tartanTestimonyDescriptionTwo, {
        x: 310,
        y: 235,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //SIGNED
      tartanCertificate.drawText(tartanSigned, {
        x: 150,
        y: 120,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(dateText, {
        x: 170,
        y: 80,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(TartandateContent, {
        x: 210,
        y: 80,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(copyright, {
        x: 190,
        y: 70,
        width: textWidth,
        height: textHeight,
        size: 6,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      tartanCertificate.drawImage(tartan_signature, {
        x: 210,
        y: 100,
        height: 50,
        width: 30,
      });

      //========================================== Tartan Printed Work Started ================================

      // if (propObject.p_8727182704913.variant.includes("Printed Pack")) {

      //master deed page two

      if (propObject.p_8727182704913.variant.includes("Printed Pack")) {
        console.log(propObject.p_8727182704913.variant);

        printedPage.drawText(propObject.p_8727182704913._Date, {
          x: 70,
          y: 710,
          size: fontSize,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printedPage.drawText(heading, {
          x: 70,
          y: 650,
          width: textWidth,
          height: textHeight,
          size: headingFontSize,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });

        printedPage.drawText(content, {
          x: 70,
          y: 620,
          width: textWidth,
          height: textHeight,
          size: fontSize,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printedPage.drawText(welcomeContent, {
          x: 240,
          y: 320,
          width: textWidth,
          height: textHeight,
          size: 14,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printedPage.drawText(welcomeSignContent, {
          x: 70,
          y: 250,
          width: textWidth,
          height: textHeight,
          size: 14,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanItalicFontPrinted,
        });

        printedPage.drawImage(welcome_emblem_signature_printed, {
          x: 170,
          y: 210,
          height: 70,
          width: 50,
        });

        printedPage.drawText(facebookContent, {
          x: 70,
          y: 170,
          width: textWidth,
          height: textHeight,
          size: 11,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printedPage.drawText(facebookLink, {
          x: 120,
          y: 170,
          width: textWidth,
          height: textHeight,
          size: 11,
          color: rgb(0.027, 0.388, 0.756),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printedPage.drawLine({
          start: { x: 120, y: 165 }, // Adjust the y-position for Form Field 3
          end: { x: 215, y: 165 }, // Adjust the y-position for Form Field 3
          color: rgb(0.027, 0.388, 0.756),
          thickness: 0.5,
        });

        printedPage.drawText(scotalndTitleAddress, {
          x: 120,
          y: 70,
          width: textWidth,
          height: textHeight,
          size: 11,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printedPage.drawText("info@scotlandtitles.com", {
          x: 150,
          y: 50,
          width: textWidth,
          height: textHeight,
          size: 11,
          color: rgb(0.027, 0.388, 0.756),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printedPage.drawLine({
          start: { x: 150, y: 45 }, // Adjust the y-position for Form Field 3
          end: { x: 260, y: 45 }, // Adjust the y-position for Form Field 3
          color: rgb(0.027, 0.388, 0.756),
          thickness: 0.5,
        });

        printedPage.drawText("www.ScotlandTitles.com", {
          x: 350,
          y: 50,
          width: textWidth,
          height: textHeight,
          size: 11,
          color: rgb(0.027, 0.388, 0.756),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printedPage.drawLine({
          start: { x: 350, y: 45 }, // Adjust the y-position for Form Field 3
          end: { x: 460, y: 45 }, // Adjust the y-position for Form Field 3
          color: rgb(0.027, 0.388, 0.756),
          thickness: 0.5,
        });
        printedPage.drawImage(img_printed, {
          x: 440,
          y: 690,
          width: pngDims.width,
          height: pngDims.height,
        });

        printedpagetwo.drawImage(titlePack_borders, {
          y: 550,
          width: printedpagetwo.getWidth(),
          height: 60,
        });
        printedpagetwo.drawImage(yellow_middle_printed, {
          x: 380,
          y: propObject.p_8727182704913._Title2 ? 385 : 405,
          width: ertificateMidpngDims.width,
          height: ertificateMidpngDims.height,
        });
        printedpagetwo.drawImage(ribbonImgPrinted, {
          x: 30,
          y: 410,
          width: pngDimsRibbon.width,
          height: pngDimsRibbon.height,
        });

        printedpagetwo.drawImage(stampImgPrinted, {
          x: 720,
          y: 70,
          width: stampPngDims.width,
          height: stampPngDims.height,
        });

        printedpagetwo.drawImage(SignaturetwoPrinted, {
          x: 580,
          y: 70,
          height: 30,
          width: 100,
        });

        printedpagetwo.drawText("Witnessed", {
          x: 600,
          y: 60,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
          // font: tempusFont,
        });

        printedpagetwo.drawImage(welcome_emblem_signature_printed, {
          x: 500,
          y: 70,
          height: 50,
          width: 30,
        });

        printedpagetwo.drawText("Signed", {
          x: 500,
          y: 60,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        printedpagetwo.drawText(certificateHeading, {
          x: 200,
          y: 520,
          size: 26,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });
        printedpagetwo.drawText(certficateAddress, {
          x: 220,
          y: 500,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        printedpagetwo.drawText(certficateUserName, {
          x: certificateX,
          y: 470,
          width: textWidth,
          height: textHeight,
          size: 24,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });
        {
          propObject.p_8727182704913._Title2 &&
            printedpagetwo.drawText(and, {
              x: 400,
              y: 460,
              width: textWidth,
              height: textHeight,
              size: 10,
              color: rgb(0, 0, 0),
              lineHeight: fontSize * 1.2,
              font: tempusFontPrinted,
            });

          printedpagetwo.drawText(certficateUserNameTwo, {
            x: certificateTwoX,
            y: 435,
            width: textWidth,
            height: textHeight,
            size: 24,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: oldEngPrinted,
          });
        }
        printedpagetwo.drawText(certificateAddressTwo, {
          x: 195,
          y: propObject.p_8727182704913._Title2 ? 415 : 450,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        printedpagetwo.drawText(certificateText, {
          x: 60,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        printedpagetwo.drawText(certificateTextTwo, {
          x: 460,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        printedpagetwo.drawImage(titlePack_borders, {
          y: 0,
          width: printedpagetwo.getWidth(),
          height: 50,
        });

        // printed deed page start =========================

        printeddeedPage.drawText(`(${formerTitle})`, {
          x: totalWidth,
          y: 710,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });

        printeddeedPage.drawText(formerTitle, {
          x: 175,
          y: 449,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });

        printeddeedPage.drawText(newTitle, {
          x: newTotalTextWidth,
          y: 683,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });
        printeddeedPage.drawText(MainHeading, {
          x: 200,
          y: 750,
          size: 20,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });
        printeddeedPage.drawText(SubHeading, {
          x: 180,
          y: 730,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(deedFormText, {
          x: 30,
          y: 710,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(deedFormText, {
          x: 30,
          y: 710,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: underlineX5, y: 600 }, // Adjust the y-position for Form Field 3
          end: { x: underlineX6, y: 600 }, // Adjust the y-position for Form Field 3
          color: rgb(0.65, 0.65, 0.65),
          thickness: underlineHeight,
        });

        printeddeedPage.drawText(deedFormTextPlaceHolder, {
          x: 60,
          y: 603,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0.65, 0.65, 0.65),
          lineHeight: fontSize * 1.2,
          font: timesRomanItalicFontPrinted,
        });

        printeddeedPage.drawText(declarationOne, {
          x: 30,
          y: 580,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(absolute, {
          x: 30,
          y: 560,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printeddeedPage.drawText(formerNameBreak, {
          x: 453,
          y: 560,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });
        printeddeedPage.drawText(titleBreak, {
          x: 30,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });
        printeddeedPage.drawText(absoluteTwo, {
          x: 58,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printeddeedPage.drawText(newTitleTwo, {
          x: 415,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });
        printeddeedPage.drawText(inContent, {
          x: 520,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printeddeedPage.drawText(absoluteThree, {
          x: 30,
          y: 536,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(declarationTwo, {
          x: 30,
          y: 500,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(declarationTwoSubscribe, {
          x: 30,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printeddeedPage.drawText(newTitleTwo, {
          x: 120,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(declarationTwoSubscribeName, {
          x: 210,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(formerTitle, {
          x: 380,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });

        printeddeedPage.drawText(so, {
          x: 500,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(relinqushed, {
          x: 30,
          y: 461,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printeddeedPage.drawText(newTitleBreak, {
          x: 510,
          y: 461,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });

        printeddeedPage.drawText(newTitleBreakTwo, {
          x: 30,
          y: 449,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });

        printeddeedPage.drawText(only, {
          x: 73,
          y: 449,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });

        printeddeedPage.drawText(declarationThree, {
          x: 30,
          y: 420,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(adopt, {
          x: 30,
          y: 408,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(newTitleTwo, {
          x: 70,
          y: 408,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });

        printeddeedPage.drawText(declarationFour, {
          x: 30,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printeddeedPage.drawText(newTitleTwo, {
          x: 413,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });
        printeddeedPage.drawText(declarationFourTwo, {
          x: 515,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(signed, {
          x: 30,
          y: 300,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printeddeedPage.drawLine({
          start: { x: underlineX3, y: 300 }, // Adjust the y-position for Form Field 3
          end: { x: underlineX4, y: 300 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        printeddeedPage.drawText(dayOf, {
          x: 190,
          y: 300,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: underlineX1, y: 300 }, // Adjust the y-position for Form Field 3
          end: { x: underlineX2, y: 300 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        printeddeedPage.drawText(yearIn, {
          x: 330,
          y: 300,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(signedAs, {
          x: 30,
          y: 270,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: 30, y: 200 }, // Adjust the y-position for Form Field 3
          end: { x: 250, y: 200 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
        printeddeedPage.drawText(signPlaceHolder, {
          x: 40,
          y: 190,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0.65, 0.65, 0.65),
          lineHeight: fontSize * 1.2,
          font: timesRomanItalicFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: 30, y: 170 }, // Adjust the y-position for Form Field 3
          end: { x: 250, y: 170 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        printeddeedPage.drawText(lordName, {
          x: 40,
          y: 155,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: 30, y: 90 }, // Adjust the y-position for Form Field 3
          end: { x: 250, y: 90 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        printeddeedPage.drawText(formerName, {
          x: 40,
          y: 75,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(presence, {
          x: 270,
          y: 240,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(witness, {
          x: 270,
          y: 190,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: 370, y: 190 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 190 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        printeddeedPage.drawText("Name", {
          x: 270,
          y: 160,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: 300, y: 160 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 160 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        printeddeedPage.drawText("Address", {
          x: 270,
          y: 130,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: 310, y: 130 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 130 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
        printeddeedPage.drawLine({
          start: { x: 270, y: 105 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 105 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
        printeddeedPage.drawLine({
          start: { x: 270, y: 80 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 80 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        printeddeedPage.drawText("Occupation", {
          x: 270,
          y: 50,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: 330, y: 50 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 50 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        if (propObject.p_8727182704913._Title2) {
          positions.forEach((position) => {
            printeddeedPageTwo.drawText(`${formerTitle}.`, {
              x: position.x,
              y: position.y,
              size: 12,
              width: textWidth,
              height: textHeight,
              color: rgb(0, 0, 0),
              lineHeight: fontSize * 1.2,
              font: timesRomanFontHeadingPrinted,
            });
          });

          const deedTwoUserNameWidth = `of ${deedModifiedNameTwo}`;
          const formerDeedTwotextWidth =
            timesRomanFontHeading.widthOfTextAtSize(deedTwoUserNameWidth, 12);
          // console.log(formertextWidth, "formertextWidth");
          const totalWidthDeedTwo = formerDeedTwotextWidth + 35;

          const deedTwoNewNameWidth = `now ${propObject.p_8727182704913._Title2} ${deedModifiedNameTwo}`;
          const newDeedTwotextWidth = timesRomanFontHeading.widthOfTextAtSize(
            deedTwoNewNameWidth,
            12
          );

          const newDeedTwoTotalTextWidth = newDeedTwotextWidth + 30;

          printeddeedPageTwo.drawText(`(${formerTitle})`, {
            x: totalWidthDeedTwo,
            y: 710,
            size: 12,
            width: textWidth,
            height: textHeight,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });

          printeddeedPageTwo.drawText(formerTitle, {
            x: 175,
            y: 449,
            size: 12,
            width: textWidth,
            height: textHeight,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });

          printeddeedPageTwo.drawText(newTitle, {
            x: newDeedTwoTotalTextWidth,
            y: 683,
            size: 12,
            width: textWidth,
            height: textHeight,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });

          const deedFormTextTwo = `of ${deedModifiedNameTwo}\n\nnow ${propObject.p_8727182704913._Title2} ${deedModifiedNameTwo}\n\nBY THIS DEED OF CHANGE OF NAME AND TITLE made by myself the undersigned\n\n${propObject.p_8727182704913._Title2} ${deedModifiedNameTwo}\n\nof`;

          const lordNameTwo = `${propObject.p_8727182704913._Title2} ${deedModifiedNameTwo}\n\nFormerly known as`;
          const formerNameTwo = `${deedModifiedNameTwo}`;

          printeddeedPageTwo.drawText(MainHeading, {
            x: 200,
            y: 750,
            size: 20,
            width: textWidth,
            height: textHeight,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });
          printeddeedPageTwo.drawText(SubHeading, {
            x: 180,
            y: 730,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(deedFormTextTwo, {
            x: 30,
            y: 710,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(deedFormTextTwo, {
            x: 30,
            y: 710,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: underlineX5, y: 600 }, // Adjust the y-position for Form Field 3
            end: { x: underlineX6, y: 600 }, // Adjust the y-position for Form Field 3
            color: rgb(0.65, 0.65, 0.65),
            thickness: underlineHeight,
          });

          printeddeedPageTwo.drawText(deedFormTextPlaceHolder, {
            x: 60,
            y: 603,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0.65, 0.65, 0.65),
            lineHeight: fontSize * 1.2,
            font: timesRomanItalicFontPrinted,
          });

          printeddeedPageTwo.drawText(declarationOne, {
            x: 30,
            y: 580,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(absolute, {
            x: 30,
            y: 560,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });
          printeddeedPageTwo.drawText(formerNameBreak, {
            x: 453,
            y: 560,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });
          printeddeedPageTwo.drawText(titleBreak, {
            x: 30,
            y: 548,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });
          printeddeedPageTwo.drawText(absoluteTwo, {
            x: 58,
            y: 548,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFont,
          });
          printeddeedPageTwo.drawText(newTitleTwo, {
            x: 415,
            y: 548,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });
          printeddeedPageTwo.drawText(inContent, {
            x: 520,
            y: 548,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFont,
          });
          printeddeedPageTwo.drawText(absoluteThree, {
            x: 30,
            y: 536,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(declarationTwo, {
            x: 30,
            y: 500,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(declarationTwoSubscribe, {
            x: 30,
            y: 473,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });
          printeddeedPageTwo.drawText(newTitleTwo, {
            x: 120,
            y: 473,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(declarationTwoSubscribeName, {
            x: 210,
            y: 473,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(formerTitle, {
            x: 380,
            y: 473,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });

          printeddeedPageTwo.drawText(so, {
            x: 500,
            y: 473,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(relinqushed, {
            x: 30,
            y: 461,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });
          printeddeedPageTwo.drawText(newTitleBreak, {
            x: 510,
            y: 461,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });

          printeddeedPageTwo.drawText(newTitleBreakTwo, {
            x: 30,
            y: 449,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });

          printeddeedPageTwo.drawText(only, {
            x: 73,
            y: 449,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });

          printeddeedPageTwo.drawText(declarationThree, {
            x: 30,
            y: 420,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(adopt, {
            x: 30,
            y: 408,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(newTitleTwo, {
            x: 70,
            y: 408,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });

          printeddeedPageTwo.drawText(declarationFour, {
            x: 30,
            y: 370,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });
          printeddeedPageTwo.drawText(newTitleTwo, {
            x: 413,
            y: 370,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });
          printeddeedPageTwo.drawText(declarationFourTwo, {
            x: 515,
            y: 370,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(signed, {
            x: 30,
            y: 300,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });
          printeddeedPageTwo.drawLine({
            start: { x: underlineX3, y: 300 }, // Adjust the y-position for Form Field 3
            end: { x: underlineX4, y: 300 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });

          printeddeedPageTwo.drawText(dayOf, {
            x: 190,
            y: 300,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: underlineX1, y: 300 }, // Adjust the y-position for Form Field 3
            end: { x: underlineX2, y: 300 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });

          printeddeedPageTwo.drawText(yearIn, {
            x: 330,
            y: 300,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(signedAs, {
            x: 30,
            y: 270,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: 30, y: 200 }, // Adjust the y-position for Form Field 3
            end: { x: 250, y: 200 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });
          printeddeedPageTwo.drawText(signPlaceHolder, {
            x: 40,
            y: 190,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0.65, 0.65, 0.65),
            lineHeight: fontSize * 1.2,
            font: timesRomanItalicFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: 30, y: 170 }, // Adjust the y-position for Form Field 3
            end: { x: 250, y: 170 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });

          printeddeedPageTwo.drawText(lordNameTwo, {
            x: 40,
            y: 155,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: 30, y: 90 }, // Adjust the y-position for Form Field 3
            end: { x: 250, y: 90 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });

          printeddeedPageTwo.drawText(formerNameTwo, {
            x: 40,
            y: 75,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(presence, {
            x: 270,
            y: 240,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(witness, {
            x: 270,
            y: 190,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: 370, y: 190 }, // Adjust the y-position for Form Field 3
            end: { x: 540, y: 190 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });

          printeddeedPageTwo.drawText("Name", {
            x: 270,
            y: 160,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: 300, y: 160 }, // Adjust the y-position for Form Field 3
            end: { x: 540, y: 160 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });

          printeddeedPageTwo.drawText("Address", {
            x: 270,
            y: 130,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: 310, y: 130 }, // Adjust the y-position for Form Field 3
            end: { x: 540, y: 130 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });
          printeddeedPageTwo.drawLine({
            start: { x: 270, y: 105 }, // Adjust the y-position for Form Field 3
            end: { x: 540, y: 105 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });
          printeddeedPageTwo.drawLine({
            start: { x: 270, y: 80 }, // Adjust the y-position for Form Field 3
            end: { x: 540, y: 80 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });

          printeddeedPageTwo.drawText("Occupation", {
            x: 270,
            y: 50,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: 330, y: 50 }, // Adjust the y-position for Form Field 3
            end: { x: 540, y: 50 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });
        }

        tartanCertificatePrinted.drawImage(tartan_borders, {
          y: 790,
          width: tartanCertificatePrinted.getWidth(),
          height: 70,
        });

        tartanCertificatePrinted.drawImage(img_printed, {
          x: 500,
          y: 710,
          width: pngDims.width,
          height: pngDims.height,
        });

        tartanCertificatePrinted.drawImage(stampImgPrinted, {
          x: 480,
          y: 70,
          width: stampPngDims.width,
          height: stampPngDims.height,
        });

        tartanCertificatePrinted.drawText(tartan_certificate_heading, {
          x: 150,
          y: 750,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(tartanCertficateUserName, {
          x: x,
          y: 720,
          width: textWidth,
          height: textHeight,
          size: 26,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });
        tartanCertificatePrinted.drawText(tartanCertficateUserNameTwo, {
          x: tartanTwox,
          y: 690,
          width: textWidth,
          height: textHeight,
          size: 26,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(declare, {
          x: 250,
          y: propObject.p_8727182704913._Title2 ? 665 : 690,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(Allegiance, {
          x: 50,
          y: propObject.p_8727182704913._Title2 ? 640 : 660,
          size: 26,
          width: textWidth,
          height: textHeight,
          color: rgb(0.054, 0.027, 0.301),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(prey, {
          x: 230,
          y: propObject.p_8727182704913._Title2 ? 640 : 660,
          size: 18,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(certified, {
          x: 370,
          y: propObject.p_8727182704913._Title2 ? 640 : 660,
          size: 26,
          width: textWidth,
          height: textHeight,
          color: rgb(0.054, 0.027, 0.301),

          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawImage(certificateMidPrinted, {
          x: 230,
          y: propObject.p_8727182704913._Title2 ? 600 : 610,
          width: ertificateMidpngDims.width,
          height: ertificateMidpngDims.height,
        });
        tartanCertificatePrinted.drawText(Greeting, {
          x: 20,
          y: 560,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(tartanCertificateGreetingText, {
          x: 220,
          y: 560,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        tartanCertificatePrinted.drawText(tartanCertificateGreetingTextTwo, {
          x: 20,
          y: 545,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        //shewen text

        tartanCertificatePrinted.drawText(know, {
          x: 20,
          y: 520,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(tartanCertificateknowText, {
          x: 143,
          y: 520,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        tartanCertificatePrinted.drawText(tartanCertificateknowTextTwo, {
          x: 20,
          y: 505,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        //videlict

        tartanCertificatePrinted.drawText(Therefore, {
          x: 20,
          y: 410,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(tartanCertificateThereforeText, {
          x: 155,
          y: 410,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        tartanCertificatePrinted.drawText(tartanCertificateThereforeTextTwo, {
          x: 20,
          y: 395,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        //In Testimony Whereof

        tartanCertificatePrinted.drawText(scotlantTiles, {
          x: 20,
          y: 320,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(tartanCertificateScotlantTilesText, {
          x: 208,
          y: 320,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        tartanCertificatePrinted.drawText(
          tartanCertificateScotlantTilesTextTwo,
          {
            x: 20,
            y: 305,
            width: textWidth,
            height: textHeight,
            size: 10,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: tempusFontPrinted,
          }
        );

        tartanCertificatePrinted.drawText(Tartan, {
          x: 20,
          y: 210,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(tartanCertificateText, {
          x: 165,
          y: 210,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        tartanCertificatePrinted.drawText(tartanCertificateTextTwo, {
          x: 20,
          y: 195,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        tartanCertificatePrinted.drawText("Royal Stewart Hunting", {
          x: 360,
          y: 570,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawImage(tartan_logo_printed, {
          x: 330,
          y: 330,
          height: 230,
          width: 230,
        });

        tartanCertificatePrinted.drawText(demostration, {
          x: 310,
          y: 300,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(demonstrationText, {
          x: 445,
          y: 300,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        tartanCertificatePrinted.drawText(demonstrationTextTwo, {
          x: 310,
          y: 285,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        tartanCertificatePrinted.drawText(tartanTestimony, {
          x: 310,
          y: 250,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(tartanTestimonyDescription, {
          x: 460,
          y: 250,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        tartanCertificatePrinted.drawText(tartanTestimonyDescriptionTwo, {
          x: 310,
          y: 235,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        //SIGNED
        tartanCertificatePrinted.drawText(tartanSigned, {
          x: 150,
          y: 120,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(dateText, {
          x: 170,
          y: 80,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(TartandateContent, {
          x: 210,
          y: 80,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        tartanCertificatePrinted.drawText(copyright, {
          x: 190,
          y: 70,
          width: textWidth,
          height: textHeight,
          size: 6,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        tartanCertificatePrinted.drawImage(tartan_signature_printed, {
          x: 210,
          y: 100,
          height: 50,
          width: 30,
        });

        tartanCertificatePrinted.drawImage(tartan_borders, {
          y: 0,
          width: tartanCertificatePrinted.getWidth(),
          height: 60,
        });

        //=============== printeddeedPageTwo ended=====================
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  };

  const titlePackWithFreeEmblem = async (propObject) => {
    let titleConditions;
    // return;

    try {
      if (propObject.p_8950348644625.variant.includes("Printed Pack")) {
        if (propObject.p_8950348644625._Title2) {
          var page = pdfDoc.addPage([595, 842]);
          var pagetwo = pdfDoc.addPage([842, 595]);
          var deedPage = pdfDoc.addPage([595, 842]);
          var deedPageTwo = pdfDoc.addPage([595, 842]);
          var emblemCertificate = pdfDoc.addPage([595, 842]);

          var printedPage = pdfDocPrinted.addPage([595, 842]);
          var printedpagetwo = pdfDocPrinted.addPage([842, 595]);
          var printeddeedPage = pdfDocPrinted.addPage([595, 842]);
          var printeddeedPageTwo = pdfDocPrinted.addPage([595, 842]);
          var emblemCertificatePrinted = pdfDocPrinted.addPage([595, 842]);
        } else {
          var page = pdfDoc.addPage([595, 842]);
          var pagetwo = pdfDoc.addPage([842, 595]);
          var deedPage = pdfDoc.addPage([595, 842]);
          var emblemCertificate = pdfDoc.addPage([595, 842]);

          var printedPage = pdfDocPrinted.addPage([595, 842]);
          var printedpagetwo = pdfDocPrinted.addPage([842, 595]);
          var printeddeedPage = pdfDocPrinted.addPage([595, 842]);
          var emblemCertificatePrinted = pdfDocPrinted.addPage([595, 842]);
        }
      } else {
        // type = false;
        if (propObject.p_8950348644625._Title2) {
          console.log("herrrrrrrrrrrrreeeeee");
          var page = pdfDoc.addPage([595, 842]);
          var pagetwo = pdfDoc.addPage([842, 595]);
          var deedPage = pdfDoc.addPage([595, 842]);
          var deedPageTwo = pdfDoc.addPage([595, 842]);
          var emblemCertificate = pdfDoc.addPage([595, 842]);
        } else {
          var page = pdfDoc.addPage([595, 842]);
          var pagetwo = pdfDoc.addPage([842, 595]);
          var deedPage = pdfDoc.addPage([595, 842]);
          var emblemCertificate = pdfDoc.addPage([595, 842]);
        }
      }
      const filePath = path.resolve("./public", "images", "scotland_log.png");

      const imgBuffer = fs.readFileSync(filePath);
      // console.log(imgBuffer, "imgBuffer");
      const img = await pdfDoc.embedPng(imgBuffer);
      const img_printed = await pdfDocPrinted.embedPng(imgBuffer);

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

      const welcome_emblem_signature_printed = await pdfDocPrinted.embedPng(
        welcom_signature_Buffer
      );

      let firstPageNameParts = propObject.p_8950348644625._Name1.split(" ");
      console.log(firstPageNameParts, "nameParts");
      let firstPageModifiedName = firstPageNameParts
        .map(
          (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        )
        .join(" ");
      console.log(firstPageModifiedName, "modified name");

      //two name
      if (propObject.p_8950348644625._Title2) {
        let firstPageNamePartsTwo =
          propObject.p_8950348644625._Name2.split(" ");
        console.log(firstPageNamePartsTwo, "nameParts");
        let firstPageModifiedNameTwo = firstPageNamePartsTwo
          .map(
            (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
          )
          .join(" ");
        console.log(firstPageModifiedNameTwo, "modified name two");
      }

      const heading = `Land with reference number ${order_number} ${
        propObject.p_8950348644625.reference != 0
          ? `- ${propObject.p_8950348644625.reference}`
          : ""
      } ${propObject.p_8950348644625._Title1} ${
        // propObject.p_8950348644625._Name1
        firstPageModifiedName
      } ${
        propObject.p_8950348644625._Title2
          ? `& ${propObject.p_8950348644625._Title2}\n${firstPageModifiedNameTwo}`
          : ""
      } of ${!propObject.p_8950348644625._Name2 ? `\n` : ""}Blairadam`;
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

      page.drawText(propObject.p_8950348644625._Date, {
        x: 70,
        y: 710,
        size: fontSize,
        width: textWidth,
        height: textHeight,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      page.drawText(heading, {
        x: 70,
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
        x: 70,
        y: 620,
        width: textWidth,
        height: textHeight,
        size: fontSize,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      page.drawText(welcomeContent, {
        x: 240,
        y: 320,
        width: textWidth,
        height: textHeight,
        size: 14,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      page.drawText(welcomeSignContent, {
        x: 70,
        y: 250,
        width: textWidth,
        height: textHeight,
        size: 14,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanItalicFont,
      });

      page.drawImage(welcome_emblem_signature, {
        x: 170,
        y: 210,
        height: 70,
        width: 50,
      });

      page.drawText(facebookContent, {
        x: 70,
        y: 170,
        width: textWidth,
        height: textHeight,
        size: 11,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      page.drawText(facebookLink, {
        x: 120,
        y: 170,
        width: textWidth,
        height: textHeight,
        size: 11,
        color: rgb(0.027, 0.388, 0.756),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      page.drawLine({
        start: { x: 120, y: 165 }, // Adjust the y-position for Form Field 3
        end: { x: 215, y: 165 }, // Adjust the y-position for Form Field 3
        color: rgb(0.027, 0.388, 0.756),
        thickness: 0.5,
      });

      page.drawText(scotalndTitleAddress, {
        x: 120,
        y: 70,
        width: textWidth,
        height: textHeight,
        size: 11,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      page.drawText("info@scotlandtitles.com", {
        x: 150,
        y: 50,
        width: textWidth,
        height: textHeight,
        size: 11,
        color: rgb(0.027, 0.388, 0.756),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      page.drawLine({
        start: { x: 150, y: 45 }, // Adjust the y-position for Form Field 3
        end: { x: 260, y: 45 }, // Adjust the y-position for Form Field 3
        color: rgb(0.027, 0.388, 0.756),
        thickness: 0.5,
      });

      page.drawText("www.ScotlandTitles.com", {
        x: 350,
        y: 50,
        width: textWidth,
        height: textHeight,
        size: 11,
        color: rgb(0.027, 0.388, 0.756),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      page.drawLine({
        start: { x: 350, y: 45 }, // Adjust the y-position for Form Field 3
        end: { x: 460, y: 45 }, // Adjust the y-position for Form Field 3
        color: rgb(0.027, 0.388, 0.756),
        thickness: 0.5,
      });
      page.drawImage(img, {
        x: 440,
        y: 690,
        width: pngDims.width,
        height: pngDims.height,
      });

      //Certificate title

      const filePathTwo = path.resolve("./public", "images", "pdf-bg.jpg");

      const imgBufferTwo = fs.readFileSync(filePathTwo);
      // console.log(imgBuffer, "imgBuffer");
      const imgBg = await pdfDoc.embedJpg(imgBufferTwo);

      const border = path.resolve("./public", "images", "borders.jpg");

      const border_Buffer = fs.readFileSync(border);

      const titlePack_borders = await pdfDocPrinted.embedJpg(border_Buffer);

      const filePathThree = path.resolve(
        "./public",
        "images",
        "certificate-stamp.png"
      );

      const imgBufferThree = fs.readFileSync(filePathThree);
      // console.log(imgBuffer, "imgBuffer");
      const stampImg = await pdfDoc.embedPng(imgBufferThree);

      const stampImgPrinted = await pdfDocPrinted.embedPng(imgBufferThree);

      const stampPngDims = stampImg.scale(0.3);

      const filePathRibbon = path.resolve(
        "./public",
        "images",
        "scotland_ribbon.png"
      );

      const imgBufferRibbon = fs.readFileSync(filePathRibbon);
      // console.log(imgBuffer, "imgBuffer");
      const ribbonImg = await pdfDoc.embedPng(imgBufferRibbon);
      const ribbonImgPrinted = await pdfDocPrinted.embedPng(imgBufferRibbon);

      const pngDimsRibbon = ribbonImg.scale(0.3);

      const filePathYellow = path.resolve(
        "./public",
        "images",
        "yellow_middle.png"
      );

      const imgBufferYellowMiddle = fs.readFileSync(filePathYellow);
      // console.log(imgBuffer, "imgBuffer");
      const yellow_middle = await pdfDoc.embedPng(imgBufferYellowMiddle);
      const yellow_middle_printed = await pdfDocPrinted.embedPng(
        imgBufferYellowMiddle
      );

      const filePathSignaturetwo = path.resolve(
        "./public",
        "images",
        "signTwo.png"
      );
      const imgBufferSignaturetwo = fs.readFileSync(filePathSignaturetwo);
      // console.log(imgBuffer, "imgBuffer");
      const Signaturetwo = await pdfDoc.embedPng(imgBufferSignaturetwo);
      const SignaturetwoPrinted = await pdfDocPrinted.embedPng(
        imgBufferSignaturetwo
      );

      const SignaturetwodimsRibbon = ribbonImg.scale(0.25);

      // console.log(imgBuffer, "imgBuffer");
      const filePathFour = path.resolve(
        "./public",
        "images",
        "certificate-mid.png"
      );

      const imgBufferFour = fs.readFileSync(filePathFour);
      const certificateMid = await pdfDoc.embedPng(imgBufferFour);
      const certificateMidPrinted = await pdfDocPrinted.embedPng(imgBufferFour);

      const ertificateMidpngDims = certificateMid.scale(0.3);

      const certificateHeading = "Certificate of Disposition and Proclamation";
      const certficateAddress =
        "between Scotland Titles, Unit 61892, PO Box 26965, Glasgow G1 9BW United Kingdom and";
      //   const certficateUserName = `${propObject.p_8950348644625._Title1} ${propObject.p_8950348644625._Name1} of Blairadam`;
      let nameParts = propObject.p_8950348644625._Name1.split(" ");
      console.log(nameParts, "nameParts");
      let modifiedName = nameParts
        .map(
          (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        )
        .join(" ");
      console.log(modifiedName, "modified name");

      //two name
      if (propObject.p_8950348644625._Title2) {
        let namePartsTwo = propObject.p_8950348644625._Name2.split(" ");
        console.log(nameParts, "nameParts");
        if (propObject.p_8950348644625._Title2) {
          var modifiedNameTwo = namePartsTwo
            .map(
              (part) =>
                part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
            )
            .join(" ");
          console.log(modifiedNameTwo, "modified name two");
        }
      }

      const certficateUserName = `${propObject.p_8950348644625._Title1} ${modifiedName} of Blairadam`;

      // const and = "and";
      const certficateUserNameTwo = `${
        propObject.p_8950348644625._Title2
          ? propObject.p_8950348644625._Title2
          : ""
      } ${propObject.p_8950348644625._Title2 ? modifiedNameTwo : ""} ${
        propObject.p_8950348644625._Title2 ? `of Blairadam` : ""
      }`;

      const and = "and";

      //   const emblemCertficateUserName = `${propObject.p_8727183065361._Title1} ${propObject.p_8727183065361._Name1}`;
      const certificateUserNametextWidth = oldEng.widthOfTextAtSize(
        certficateUserName,
        12
      );
      const addressTitle = propObject.p_8950348644625._Title1;
      const certificateHalfOfWord = certificateUserNametextWidth / 2;
      const certificateStartingPosition =
        (pagetwo.getWidth() - certificateUserNametextWidth) / 2;
      const certificateX = certificateStartingPosition - certificateHalfOfWord;

      const certificateUserNameTwotextWidth = oldEng.widthOfTextAtSize(
        certficateUserNameTwo,
        12
      );
      const certificateTwoHalfOfWord = certificateUserNameTwotextWidth / 2;
      const certificateTwoStartingPosition =
        (pagetwo.getWidth() - certificateUserNameTwotextWidth) / 2;
      const certificateTwoX =
        certificateTwoStartingPosition - certificateTwoHalfOfWord;

      // var titleConditions = "";

      if (
        !propObject.p_8950348644625._Title2 &&
        propObject.p_8950348644625._Title1
      ) {
        if (propObject.p_8950348644625._Title1 == "Lord") {
          titleConditions = "LORD";
        } else if (propObject.p_8950348644625._Title1 == "Laird") {
          titleConditions = "LAIRD";
        } else if (propObject.p_8950348644625._Title1 == "Lady") {
          titleConditions = "LADY";
        }
      } else if (
        propObject.p_8950348644625._Title1 &&
        propObject.p_8950348644625._Title2
      ) {
        if (
          propObject.p_8950348644625._Title1 == "Lord" &&
          propObject.p_8950348644625._Title2 == "Lord"
        ) {
          titleConditions = "LORDS";
        } else if (
          propObject.p_8950348644625._Title1 == "Laird" &&
          propObject.p_8950348644625._Title2 == "Laird"
        ) {
          titleConditions = "LAIRDS";
        } else if (
          propObject.p_8950348644625._Title1 == "Lady" &&
          propObject.p_8950348644625._Title2 == "Lady"
        ) {
          titleConditions = "LADIES";
        } else if (
          propObject.p_8950348644625._Title1 == "Lord" &&
          propObject.p_8950348644625._Title2 == "Lady"
        ) {
          titleConditions = "LORD AND LADY";
        } else if (
          propObject.p_8950348644625._Title1 == "Lady" &&
          propObject.p_8950348644625._Title2 == "Lord"
        ) {
          console.log("LADY AND LORD condition");
          titleConditions = "LADY AND LORD";
        } else if (
          propObject.p_8950348644625._Title1 == "Lord" &&
          propObject.p_8950348644625._Title2 == "Laird"
        ) {
          titleConditions = "LORD AND LAIRD";
        } else if (
          propObject.p_8950348644625._Title1 == "Laird" &&
          propObject.p_8950348644625._Title2 == "Lord"
        ) {
          titleConditions = "LAIRD AND LORD";
        } else if (
          propObject.p_8950348644625._Title1 == "Lady" &&
          propObject.p_8950348644625._Title2 == "Laird"
        ) {
          titleConditions = "LADY AND LAIRD";
        } else if (
          propObject.p_8950348644625._Title1 == "Laird" &&
          propObject.p_8950348644625._Title2 == "Lady"
        ) {
          titleConditions = "LAIRD AND LADY";
        }
        console.log(
          titleConditions,
          "titleConditionstitleConditionstitleConditions"
        );
      }
      const certificateAddressTwo = `(hereafter to be proclaimed as “THE ${titleConditions}”), care of Unit 61892, PO Box 26965, Glasgow G1 9BW United Kingdom`;

      const certificateText = `The Scotland Titles Estate in Fife, Scotland, hereinafter referred to as “THE ESTATE”,\nhas been partitioned into dedicated souvenir plots of land.\n\nTHE ${titleConditions} ${
        propObject.p_8950348644625._Title2 ? "have" : "has"
      } petitioned unto Scotland Titles on this day their ${
        titleConditions == "LADY AND LAIRD" ||
        titleConditions == "LAIRD AND LADY" ||
        titleConditions == "LORD AND LAIRD" ||
        titleConditions == "LAIRD AND LORD" ||
        titleConditions == "LORD AND LADY" ||
        titleConditions == "LADY AND LORD"
          ? "\nintention to"
          : "intention to\n"
      }purchase, and Scotland Titles has determined to accept the disposition ${
        titleConditions == "LADY AND LAIRD" ||
        titleConditions == "LAIRD AND LADY" ||
        titleConditions == "LORD AND LAIRD" ||
        titleConditions == "LAIRD AND LORD" ||
        titleConditions == "LORD AND LADY" ||
        titleConditions == "LADY AND LORD"
          ? "\nof a plot of"
          : "of a plot of\n"
      }land within THE ESTATE, at Cantsdam, hereafter referred to as “THE ${
        titleConditions == "LADY AND LAIRD" ||
        titleConditions == "LAIRD AND LADY" ||
        titleConditions == "LORD AND LAIRD" ||
        titleConditions == "LAIRD AND LORD" ||
        titleConditions == "LORD AND LADY" ||
        titleConditions == "LADY AND LORD"
          ? "\nLAND"
          : "LAND"
      }”.\n\nScotland Titles, in CONSIDERATION of all monies due to be paid to us by THE\n${titleConditions}, of which we have received of in full, we do hereby DISCHARGE ${
        titleConditions == "LADY AND LAIRD" ||
        titleConditions == "LAIRD AND LADY" ||
        titleConditions == "LORD AND LAIRD" ||
        titleConditions == "LAIRD AND LORD" ||
        titleConditions == "LORD AND LADY" ||
        titleConditions == "LADY AND LORD"
          ? "\nunto them"
          : "unto them\n"
      }and DISPONE to and in perpetuity in favour of THE ${titleConditions} ${
        titleConditions == "LADY AND LAIRD" ||
        titleConditions == "LAIRD AND LADY" ||
        titleConditions == "LORD AND LAIRD" ||
        titleConditions == "LAIRD AND LORD" ||
        titleConditions == "LORD AND LADY" ||
        titleConditions == "LADY AND LORD"
          ? "\nand to their future"
          : "and to their future\n"
      }assignees the whole of THE LAND but always with ${
        titleConditions == "LADY AND LAIRD" ||
        titleConditions == "LAIRD AND LADY" ||
        titleConditions == "LORD AND LAIRD" ||
        titleConditions == "LAIRD AND LORD" ||
        titleConditions == "LORD AND LADY" ||
        titleConditions == "LADY AND LORD"
          ? "pedestrian\naccess only over THE "
          : "pedestrian access only over THE\n"
      }ESTATE; such rights of vehicular access are reserved ${
        titleConditions == "LADY AND LAIRD" ||
        titleConditions == "LAIRD AND LADY" ||
        titleConditions == "LORD AND LAIRD" ||
        titleConditions == "LAIRD AND LORD" ||
        titleConditions == "LORD AND LADY" ||
        titleConditions == "LADY AND LORD"
          ? "\nto Scotland Titles and its"
          : "to Scotland Titles and its\n"
      }successors in title plus any and all others authorised by it; ${
        titleConditions == "LADY AND LAIRD" ||
        titleConditions == "LAIRD AND LADY" ||
        titleConditions == "LORD AND LAIRD" ||
        titleConditions == "LAIRD AND LORD" ||
        titleConditions == "LORD AND LADY" ||
        titleConditions == "LADY AND LORD"
          ? `\nTHE ${titleConditions} ${
              propObject.p_8950348644625._Title2 ? "covenant" : "covenants"
            } not`
          : `THE ${titleConditions} ${
              propObject.p_8950348644625._Title2 ? "covenant" : "covenants"
            } not\n`
      } to dispose of THE LAND in part only.\n\nScotland Titles is a trading name of Blairdam Corporation PA. Terms and Conditions,\nand this CERTIFICATE shall be governed by the Law of Scotland.`;
      const datee = propObject.p_8950348644625._Date;
      const dateObj = new Date(datee);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are 0-indexed
      const day = String(dateObj.getDate()).padStart(2, "0");

      const monthNames = [
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER",
      ];

      const monthName = monthNames[dateObj.getMonth()];
      let titledayWithSuffix;

      if (day >= 11 && day <= 13) {
        titledayWithSuffix = `${day}TH`;
      } else {
        switch (day % 10) {
          case 1:
            titledayWithSuffix = `${day}ST`;
            break;
          case 2:
            titledayWithSuffix = `${day}ND`;
            break;
          case 3:
            titledayWithSuffix = `${day}RD`;
            break;
          default:
            titledayWithSuffix = `${day}TH`;
        }
      }
      let text = propObject.p_8950348644625.variant;
      const myArray = text.split(" ");
      let word = myArray[0];

      const certificateTextTwo = `THE ESTATE location is KINGSEAT ROAD (OFF CANTSDAM ROAD),\nCANTSDAM, KELTY, FIFE, SCOTLAND KY12 0SW\n\nTHE ESTATE is recorded in the General Register of Sasines RS30-32\n\nCoordinates to the centre of THE ESTATE are;\nLatitude, Longitude in degrees 56°07${"`"}18 N , 003°23 08 W\nX Easting 313956 , Y Northing 692954\n\nThe Plot Number of THE LAND within THE ESTATE is ${order_number}${
        propObject.p_8950348644625.reference != 0
          ? ` - ${propObject.p_8950348644625.reference}`
          : ""
      }\n\nThe size of THE LAND is ${word} square foot\n\nDate of Entry of THE LAND is as the date of this CERTIFICATE\n\nThis Disposition is signed for and on behalf of Scotland Titles and witnessed on the\n${titledayWithSuffix} Day of ${monthName} ${year}`;
      pagetwo.drawImage(imgBg, {
        width: pagetwo.getWidth(),
        height: pagetwo.getHeight(),
      });

      pagetwo.drawImage(yellow_middle, {
        x: 380,
        y: propObject.p_8950348644625._Title2 ? 385 : 405,
        width: ertificateMidpngDims.width,
        height: ertificateMidpngDims.height,
      });
      pagetwo.drawImage(ribbonImg, {
        x: 30,
        y: 410,
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
        x: 580,
        y: 70,
        height: 30,
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
        font: tempusFont,
        // font: customFont,
        // font: tempusFont,
      });

      pagetwo.drawImage(welcome_emblem_signature, {
        x: 500,
        y: 70,
        height: 50,
        width: 30,
      });

      pagetwo.drawText("Signed", {
        x: 500,
        y: 60,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
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
        font: tempusFont,
      });

      pagetwo.drawText(certficateUserName, {
        x: certificateX,
        y: 470,
        width: textWidth,
        height: textHeight,
        size: 24,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });
      {
        propObject.p_8950348644625._Title2 &&
          pagetwo.drawText(and, {
            x: 400,
            y: 460,
            width: textWidth,
            height: textHeight,
            size: 10,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: tempusFont,
          });

        pagetwo.drawText(certficateUserNameTwo, {
          x: certificateTwoX,
          y: 435,
          width: textWidth,
          height: textHeight,
          size: 24,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: oldEng,
        });
      }
      pagetwo.drawText(certificateAddressTwo, {
        x: 195,
        y: propObject.p_8950348644625._Title2 ? 415 : 450,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      pagetwo.drawText(certificateText, {
        x: 60,
        y: 370,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      pagetwo.drawText(certificateTextTwo, {
        x: 460,
        y: 370,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //printed pagetwo  ========

      //deed page one

      const MainHeading = "Master Title Deed";
      const SubHeading = "Deed of Change of Name and Title (Deed Poll)";
      const formerTitle = "Former Name & Title";
      const newTitle = "(New Name & Title)";
      const underlineHeight = 0.5;
      const underlineY = 680; // Adjust the y-position as needed

      // Adjust the x-positions as needed for each form field

      const underlineX1 = 240; // For Form Field 1
      const underlineX2 = 320; // For Form Field 1
      const underlineX3 = 110; // For Form Field 2
      const underlineX4 = 180; // For Form Field 2
      const underlineX5 = 50; // For Form Field 3
      const underlineX6 = 580; // For Form Field 3
      const deedFormTextPlaceHolder = "Home Address";
      // const formerNameAndTitle="Former Name & Title"
      // const newNameAndTitle="New Name & Title"

      const positions = [
        // { x: 110, y: 710 }, //first
        { x: 125, y: 536 }, //second
        // { x: 395, y: 473 },
        { x: 30, y: 355 }, //in witneess

        // Add more positions as needed
      ];
      positions.forEach((position) => {
        deedPage.drawText(`${formerTitle}.`, {
          x: position.x,
          y: position.y,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });
      });

      //Capital name
      let deedNameParts = propObject.p_8950348644625._Name1.split(" ");
      console.log(nameParts, "nameParts");
      let deedModifiedName = deedNameParts
        .map(
          (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        )
        .join(" ");

      //two name
      if (propObject.p_8950348644625._Title2) {
        let deedNamePartsTwo = propObject.p_8950348644625._Name2.split(" ");
        var deedModifiedNameTwo = deedNamePartsTwo
          .map(
            (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
          )
          .join(" ");
      }
      const deedUserNameWidth = `of ${deedModifiedName}`;
      const formertextWidth = timesRomanFontHeading.widthOfTextAtSize(
        deedUserNameWidth,
        12
      );
      console.log(formertextWidth, "formertextWidth");
      const totalWidth = formertextWidth + 35;

      const deedNewNameWidth = `now ${propObject.p_8950348644625._Title1} ${deedModifiedName}`;
      const newtextWidth = timesRomanFontHeading.widthOfTextAtSize(
        deedNewNameWidth,
        12
      );

      const newTotalTextWidth = newtextWidth + 30;

      deedPage.drawText(`(${formerTitle})`, {
        x: totalWidth,
        y: 710,
        size: 12,
        width: textWidth,
        height: textHeight,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });

      deedPage.drawText(formerTitle, {
        x: 175,
        y: 449,
        size: 12,
        width: textWidth,
        height: textHeight,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });

      deedPage.drawText(newTitle, {
        x: newTotalTextWidth,
        y: 683,
        size: 12,
        width: textWidth,
        height: textHeight,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });

      const deedFormText = `of ${deedModifiedName}\n\nnow ${propObject.p_8950348644625._Title1} ${deedModifiedName}\n\nBY THIS DEED OF CHANGE OF NAME AND TITLE made by myself the undersigned\n\n${propObject.p_8950348644625._Title1} ${deedModifiedName}\n\nof`;
      const declarationOne = `HEREBY DECLARE AS FOLLOWS;`;
      const absolute =
        "1.   I ABSOLUTELY and entirely renounce, relinquish and abandon the use of my said";
      const formerNameBreak = `Former Name &`;
      const titleBreak = "Title";
      const absoluteTwo =
        "and assume, adopt and determine to take and use from the date hereof the";
      const newTitleTwo = "New Name & Title";
      const inContent = "in";
      const absoluteThree = "substitution for my";
      const declarationTwo = `2.    I SHALL AT ALL TIMES hereafter in all records, deeds, documents and other writings and in all\nactions and proceedings as well as in all dealings and transactions and on all occasions whatsoever use and`;
      const declarationTwoSubscribe = "subscribe the said";
      const declarationTwoSubscribeName = "as my name in substitution for my";
      const so = "so";
      const relinqushed =
        "relinquished as aforesaid to the intent that I may hereafter be called, known or distinguished by the";
      const newTitleBreak = "New Name";
      const newTitleBreakTwo = "& Title";
      const only = "only and not by the";

      const declarationThree = `3.    I AUTHORISE AND REQUIRE all persons at all times to designate, describe and address me by my`;
      const adopt = "adopted";
      const declarationFour = `IN WITNESS whereof I have hereunto subscribed my adopted and substituted`;
      const declarationFourTwo = "and also my";
      const signed = "SIGNED THIS";
      const dayOf = "DAY OF";
      const yearIn = "IN THE YEAR";
      const signedAs = "SIGNED AS A DEED AND DELIVERED\n\nby the above named";
      const signPlaceHolder = "Signature";
      const lordName = `${propObject.p_8950348644625._Title1} ${deedModifiedName}\n\nFormerly known as`;
      const formerName = `${deedModifiedName}`;

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
        color: rgb(0.65, 0.65, 0.65),
        thickness: underlineHeight,
      });

      deedPage.drawText(deedFormTextPlaceHolder, {
        x: 60,
        y: 603,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0.65, 0.65, 0.65),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanItalicFont,
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

      deedPage.drawText(absolute, {
        x: 30,
        y: 560,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });
      deedPage.drawText(formerNameBreak, {
        x: 453,
        y: 560,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFontHeading,
      });
      deedPage.drawText(titleBreak, {
        x: 30,
        y: 548,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFontHeading,
      });
      deedPage.drawText(absoluteTwo, {
        x: 58,
        y: 548,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });
      deedPage.drawText(newTitleTwo, {
        x: 415,
        y: 548,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFontHeading,
      });
      deedPage.drawText(inContent, {
        x: 520,
        y: 548,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });
      deedPage.drawText(absoluteThree, {
        x: 30,
        y: 536,
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

      deedPage.drawText(declarationTwoSubscribe, {
        x: 30,
        y: 473,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });
      deedPage.drawText(newTitleTwo, {
        x: 120,
        y: 473,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });

      deedPage.drawText(declarationTwoSubscribeName, {
        x: 210,
        y: 473,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });

      deedPage.drawText(formerTitle, {
        x: 380,
        y: 473,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFontHeading,
      });

      deedPage.drawText(so, {
        x: 500,
        y: 473,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      deedPage.drawText(relinqushed, {
        x: 30,
        y: 461,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });
      deedPage.drawText(newTitleBreak, {
        x: 510,
        y: 461,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });

      deedPage.drawText(newTitleBreakTwo, {
        x: 30,
        y: 449,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
      });

      deedPage.drawText(only, {
        x: 73,
        y: 449,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFontHeading,
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

      deedPage.drawText(adopt, {
        x: 30,
        y: 408,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });

      deedPage.drawText(newTitleTwo, {
        x: 70,
        y: 408,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFontHeading,
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
      deedPage.drawText(newTitleTwo, {
        x: 413,
        y: 370,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFontHeading,
      });
      deedPage.drawText(declarationFourTwo, {
        x: 515,
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

      deedPage.drawText(dayOf, {
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

      deedPage.drawText(yearIn, {
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
        font: timesRomanItalicFont,
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
        y: 240,
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
        y: 190,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });

      deedPage.drawLine({
        start: { x: 370, y: 190 }, // Adjust the y-position for Form Field 3
        end: { x: 540, y: 190 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });

      deedPage.drawText("Name", {
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
        start: { x: 300, y: 160 }, // Adjust the y-position for Form Field 3
        end: { x: 540, y: 160 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });

      deedPage.drawText("Address", {
        x: 270,
        y: 130,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });

      deedPage.drawLine({
        start: { x: 310, y: 130 }, // Adjust the y-position for Form Field 3
        end: { x: 540, y: 130 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });
      deedPage.drawLine({
        start: { x: 270, y: 105 }, // Adjust the y-position for Form Field 3
        end: { x: 540, y: 105 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });
      deedPage.drawLine({
        start: { x: 270, y: 80 }, // Adjust the y-position for Form Field 3
        end: { x: 540, y: 80 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });

      deedPage.drawText("Occupation", {
        x: 270,
        y: 50,
        width: textWidth,
        height: textHeight,
        size: 12,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        // font: customFont,
        font: timesRomanFont,
      });

      deedPage.drawLine({
        start: { x: 330, y: 50 }, // Adjust the y-position for Form Field 3
        end: { x: 540, y: 50 }, // Adjust the y-position for Form Field 3
        color: rgb(0, 0, 0),
        thickness: underlineHeight,
      });

      //master deed page two
      if (propObject.p_8950348644625._Title2) {
        positions.forEach((position) => {
          deedPageTwo.drawText(`${formerTitle}.`, {
            x: position.x,
            y: position.y,
            size: 12,
            width: textWidth,
            height: textHeight,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeading,
          });
        });

        const deedTwoUserNameWidth = `of ${deedModifiedNameTwo}`;
        const formerDeedTwotextWidth = timesRomanFontHeading.widthOfTextAtSize(
          deedTwoUserNameWidth,
          12
        );
        // console.log(formertextWidth, "formertextWidth");
        const totalWidthDeedTwo = formerDeedTwotextWidth + 35;

        const deedTwoNewNameWidth = `now ${propObject.p_8950348644625._Title2} ${deedModifiedNameTwo}`;
        const newDeedTwotextWidth = timesRomanFontHeading.widthOfTextAtSize(
          deedTwoNewNameWidth,
          12
        );

        const newDeedTwoTotalTextWidth = newDeedTwotextWidth + 30;

        deedPageTwo.drawText(`(${formerTitle})`, {
          x: totalWidthDeedTwo,
          y: 710,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(formerTitle, {
          x: 175,
          y: 449,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(newTitle, {
          x: newDeedTwoTotalTextWidth,
          y: 683,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        const deedFormTextTwo = `of ${deedModifiedNameTwo}\n\nnow ${propObject.p_8950348644625._Title2} ${deedModifiedNameTwo}\n\nBY THIS DEED OF CHANGE OF NAME AND TITLE made by myself the undersigned\n\n${propObject.p_8950348644625._Title2} ${deedModifiedNameTwo}\n\nof`;

        const lordNameTwo = `${propObject.p_8950348644625._Title2} ${deedModifiedNameTwo}\n\nFormerly known as`;
        const formerNameTwo = `${deedModifiedNameTwo}`;

        deedPageTwo.drawText(MainHeading, {
          x: 200,
          y: 750,
          size: 20,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });
        deedPageTwo.drawText(SubHeading, {
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

        deedPageTwo.drawText(deedFormTextTwo, {
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

        deedPageTwo.drawText(deedFormTextTwo, {
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

        deedPageTwo.drawLine({
          start: { x: underlineX5, y: 600 }, // Adjust the y-position for Form Field 3
          end: { x: underlineX6, y: 600 }, // Adjust the y-position for Form Field 3
          color: rgb(0.65, 0.65, 0.65),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText(deedFormTextPlaceHolder, {
          x: 60,
          y: 603,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0.65, 0.65, 0.65),
          lineHeight: fontSize * 1.2,
          // font: customFont,
          font: timesRomanItalicFont,
        });

        deedPageTwo.drawText(declarationOne, {
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

        deedPageTwo.drawText(absolute, {
          x: 30,
          y: 560,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          // font: customFont,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(formerNameBreak, {
          x: 453,
          y: 560,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          // font: customFont,
          font: timesRomanFontHeading,
        });
        deedPageTwo.drawText(titleBreak, {
          x: 30,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          // font: customFont,
          font: timesRomanFontHeading,
        });
        deedPageTwo.drawText(absoluteTwo, {
          x: 58,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          // font: customFont,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(newTitleTwo, {
          x: 415,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          // font: customFont,
          font: timesRomanFontHeading,
        });
        deedPageTwo.drawText(inContent, {
          x: 520,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          // font: customFont,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(absoluteThree, {
          x: 30,
          y: 536,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(declarationTwo, {
          x: 30,
          y: 500,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(declarationTwoSubscribe, {
          x: 30,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(newTitleTwo, {
          x: 120,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(declarationTwoSubscribeName, {
          x: 210,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(formerTitle, {
          x: 380,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(so, {
          x: 500,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(relinqushed, {
          x: 30,
          y: 461,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(newTitleBreak, {
          x: 510,
          y: 461,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(newTitleBreakTwo, {
          x: 30,
          y: 449,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(only, {
          x: 73,
          y: 449,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(declarationThree, {
          x: 30,
          y: 420,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(adopt, {
          x: 30,
          y: 408,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(newTitleTwo, {
          x: 70,
          y: 408,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(declarationFour, {
          x: 30,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(newTitleTwo, {
          x: 413,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });
        deedPageTwo.drawText(declarationFourTwo, {
          x: 515,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(signed, {
          x: 30,
          y: 300,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawLine({
          start: { x: underlineX3, y: 300 }, // Adjust the y-position for Form Field 3
          end: { x: underlineX4, y: 300 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText(dayOf, {
          x: 190,
          y: 300,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: underlineX1, y: 300 }, // Adjust the y-position for Form Field 3
          end: { x: underlineX2, y: 300 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText(yearIn, {
          x: 330,
          y: 300,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(signedAs, {
          x: 30,
          y: 270,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 30, y: 200 }, // Adjust the y-position for Form Field 3
          end: { x: 250, y: 200 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
        deedPageTwo.drawText(signPlaceHolder, {
          x: 40,
          y: 190,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0.65, 0.65, 0.65),
          lineHeight: fontSize * 1.2,
          font: timesRomanItalicFont,
        });

        deedPageTwo.drawLine({
          start: { x: 30, y: 170 }, // Adjust the y-position for Form Field 3
          end: { x: 250, y: 170 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText(lordNameTwo, {
          x: 40,
          y: 155,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 30, y: 90 }, // Adjust the y-position for Form Field 3
          end: { x: 250, y: 90 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText(formerNameTwo, {
          x: 40,
          y: 75,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(presence, {
          x: 270,
          y: 240,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(witness, {
          x: 270,
          y: 190,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 370, y: 190 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 190 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText("Name", {
          x: 270,
          y: 160,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 300, y: 160 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 160 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText("Address", {
          x: 270,
          y: 130,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 310, y: 130 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 130 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
        deedPageTwo.drawLine({
          start: { x: 270, y: 105 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 105 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
        deedPageTwo.drawLine({
          start: { x: 270, y: 80 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 80 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText("Occupation", {
          x: 270,
          y: 50,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 330, y: 50 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 50 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
      }

      if (propObject.p_8950348644625._Title2) {
        positions.forEach((position) => {
          deedPageTwo.drawText(`${formerTitle}.`, {
            x: position.x,
            y: position.y,
            size: 12,
            width: textWidth,
            height: textHeight,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeading,
          });
        });

        const deedTwoUserNameWidth = `of ${deedModifiedNameTwo}`;
        const formerDeedTwotextWidth = timesRomanFontHeading.widthOfTextAtSize(
          deedTwoUserNameWidth,
          12
        );
        const totalWidthDeedTwo = formerDeedTwotextWidth + 35;

        const deedTwoNewNameWidth = `now ${propObject.p_8950348644625._Title2} ${deedModifiedNameTwo}`;
        const newDeedTwotextWidth = timesRomanFontHeading.widthOfTextAtSize(
          deedTwoNewNameWidth,
          12
        );

        const newDeedTwoTotalTextWidth = newDeedTwotextWidth + 30;

        deedPageTwo.drawText(`(${formerTitle})`, {
          x: totalWidthDeedTwo,
          y: 710,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(formerTitle, {
          x: 175,
          y: 449,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(newTitle, {
          x: newDeedTwoTotalTextWidth,
          y: 683,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        const deedFormTextTwo = `of ${deedModifiedNameTwo}\n\nnow ${propObject.p_8950348644625._Title2} ${deedModifiedNameTwo}\n\nBY THIS DEED OF CHANGE OF NAME AND TITLE made by myself the undersigned\n\n${propObject.p_8950348644625._Title2} ${deedModifiedNameTwo}\n\nof`;

        const lordNameTwo = `${propObject.p_8950348644625._Title2} ${deedModifiedNameTwo}\n\nFormerly known as`;
        const formerNameTwo = `${deedModifiedNameTwo}`;

        deedPageTwo.drawText(MainHeading, {
          x: 200,
          y: 750,
          size: 20,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });
        deedPageTwo.drawText(SubHeading, {
          x: 180,
          y: 730,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(deedFormTextTwo, {
          x: 30,
          y: 710,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(deedFormTextTwo, {
          x: 30,
          y: 710,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: underlineX5, y: 600 }, // Adjust the y-position for Form Field 3
          end: { x: underlineX6, y: 600 }, // Adjust the y-position for Form Field 3
          color: rgb(0.65, 0.65, 0.65),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText(deedFormTextPlaceHolder, {
          x: 60,
          y: 603,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0.65, 0.65, 0.65),
          lineHeight: fontSize * 1.2,
          font: timesRomanItalicFont,
        });

        deedPageTwo.drawText(declarationOne, {
          x: 30,
          y: 580,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(absolute, {
          x: 30,
          y: 560,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(formerNameBreak, {
          x: 453,
          y: 560,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });
        deedPageTwo.drawText(titleBreak, {
          x: 30,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });
        deedPageTwo.drawText(absoluteTwo, {
          x: 58,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(newTitleTwo, {
          x: 415,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });
        deedPageTwo.drawText(inContent, {
          x: 520,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(absoluteThree, {
          x: 30,
          y: 536,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(declarationTwo, {
          x: 30,
          y: 500,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(declarationTwoSubscribe, {
          x: 30,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(newTitleTwo, {
          x: 120,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(declarationTwoSubscribeName, {
          x: 210,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(formerTitle, {
          x: 380,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(so, {
          x: 500,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(relinqushed, {
          x: 30,
          y: 461,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(newTitleBreak, {
          x: 510,
          y: 461,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(newTitleBreakTwo, {
          x: 30,
          y: 449,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(only, {
          x: 73,
          y: 449,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(declarationThree, {
          x: 30,
          y: 420,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(adopt, {
          x: 30,
          y: 408,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(newTitleTwo, {
          x: 70,
          y: 408,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });

        deedPageTwo.drawText(declarationFour, {
          x: 30,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawText(newTitleTwo, {
          x: 413,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeading,
        });
        deedPageTwo.drawText(declarationFourTwo, {
          x: 515,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(signed, {
          x: 30,
          y: 300,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });
        deedPageTwo.drawLine({
          start: { x: underlineX3, y: 300 }, // Adjust the y-position for Form Field 3
          end: { x: underlineX4, y: 300 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText(dayOf, {
          x: 190,
          y: 300,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: underlineX1, y: 300 }, // Adjust the y-position for Form Field 3
          end: { x: underlineX2, y: 300 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText(yearIn, {
          x: 330,
          y: 300,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(signedAs, {
          x: 30,
          y: 270,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 30, y: 200 }, // Adjust the y-position for Form Field 3
          end: { x: 250, y: 200 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
        deedPageTwo.drawText(signPlaceHolder, {
          x: 40,
          y: 190,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0.65, 0.65, 0.65),
          lineHeight: fontSize * 1.2,
          font: timesRomanItalicFont,
        });

        deedPageTwo.drawLine({
          start: { x: 30, y: 170 }, // Adjust the y-position for Form Field 3
          end: { x: 250, y: 170 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText(lordNameTwo, {
          x: 40,
          y: 155,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 30, y: 90 }, // Adjust the y-position for Form Field 3
          end: { x: 250, y: 90 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText(formerNameTwo, {
          x: 40,
          y: 75,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(presence, {
          x: 270,
          y: 240,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawText(witness, {
          x: 270,
          y: 190,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 370, y: 190 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 190 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText("Name", {
          x: 270,
          y: 160,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 300, y: 160 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 160 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText("Address", {
          x: 270,
          y: 130,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 310, y: 130 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 130 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
        deedPageTwo.drawLine({
          start: { x: 270, y: 105 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 105 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
        deedPageTwo.drawLine({
          start: { x: 270, y: 80 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 80 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        deedPageTwo.drawText("Occupation", {
          x: 270,
          y: 50,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFont,
        });

        deedPageTwo.drawLine({
          start: { x: 330, y: 50 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 50 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
      }

      // =====================================Printed Title Pack started ================================

      // if (propObject.p_8950348644625.variant.includes("Printed Pack")) {

      //master deed page two

      if (propObject.p_8950348644625.variant.includes("Printed Pack")) {
        console.log(propObject.p_8950348644625.variant);

        printedPage.drawText(propObject.p_8950348644625._Date, {
          x: 70,
          y: 710,
          size: fontSize,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printedPage.drawText(heading, {
          x: 70,
          y: 650,
          width: textWidth,
          height: textHeight,
          size: headingFontSize,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });

        printedPage.drawText(content, {
          x: 70,
          y: 620,
          width: textWidth,
          height: textHeight,
          size: fontSize,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printedPage.drawText(welcomeContent, {
          x: 240,
          y: 320,
          width: textWidth,
          height: textHeight,
          size: 14,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printedPage.drawText(welcomeSignContent, {
          x: 70,
          y: 250,
          width: textWidth,
          height: textHeight,
          size: 14,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanItalicFontPrinted,
        });

        printedPage.drawImage(welcome_emblem_signature_printed, {
          x: 170,
          y: 210,
          height: 70,
          width: 50,
        });

        printedPage.drawText(facebookContent, {
          x: 70,
          y: 170,
          width: textWidth,
          height: textHeight,
          size: 11,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printedPage.drawText(facebookLink, {
          x: 120,
          y: 170,
          width: textWidth,
          height: textHeight,
          size: 11,
          color: rgb(0.027, 0.388, 0.756),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printedPage.drawLine({
          start: { x: 120, y: 165 }, // Adjust the y-position for Form Field 3
          end: { x: 215, y: 165 }, // Adjust the y-position for Form Field 3
          color: rgb(0.027, 0.388, 0.756),
          thickness: 0.5,
        });

        printedPage.drawText(scotalndTitleAddress, {
          x: 120,
          y: 70,
          width: textWidth,
          height: textHeight,
          size: 11,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printedPage.drawText("info@scotlandtitles.com", {
          x: 150,
          y: 50,
          width: textWidth,
          height: textHeight,
          size: 11,
          color: rgb(0.027, 0.388, 0.756),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printedPage.drawLine({
          start: { x: 150, y: 45 }, // Adjust the y-position for Form Field 3
          end: { x: 260, y: 45 }, // Adjust the y-position for Form Field 3
          color: rgb(0.027, 0.388, 0.756),
          thickness: 0.5,
        });

        printedPage.drawText("www.ScotlandTitles.com", {
          x: 350,
          y: 50,
          width: textWidth,
          height: textHeight,
          size: 11,
          color: rgb(0.027, 0.388, 0.756),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printedPage.drawLine({
          start: { x: 350, y: 45 }, // Adjust the y-position for Form Field 3
          end: { x: 460, y: 45 }, // Adjust the y-position for Form Field 3
          color: rgb(0.027, 0.388, 0.756),
          thickness: 0.5,
        });
        printedPage.drawImage(img_printed, {
          x: 440,
          y: 690,
          width: pngDims.width,
          height: pngDims.height,
        });

        printedpagetwo.drawImage(titlePack_borders, {
          y: 550,
          width: printedpagetwo.getWidth(),
          height: 60,
        });
        printedpagetwo.drawImage(yellow_middle_printed, {
          x: 380,
          y: propObject.p_8950348644625._Title2 ? 385 : 405,
          width: ertificateMidpngDims.width,
          height: ertificateMidpngDims.height,
        });
        printedpagetwo.drawImage(ribbonImgPrinted, {
          x: 30,
          y: 410,
          width: pngDimsRibbon.width,
          height: pngDimsRibbon.height,
        });

        printedpagetwo.drawImage(stampImgPrinted, {
          x: 720,
          y: 70,
          width: stampPngDims.width,
          height: stampPngDims.height,
        });

        printedpagetwo.drawImage(SignaturetwoPrinted, {
          x: 580,
          y: 70,
          height: 30,
          width: 100,
        });

        printedpagetwo.drawText("Witnessed", {
          x: 600,
          y: 60,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
          // font: tempusFont,
        });

        printedpagetwo.drawImage(welcome_emblem_signature_printed, {
          x: 500,
          y: 70,
          height: 50,
          width: 30,
        });

        printedpagetwo.drawText("Signed", {
          x: 500,
          y: 60,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        printedpagetwo.drawText(certificateHeading, {
          x: 200,
          y: 520,
          size: 26,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });
        printedpagetwo.drawText(certficateAddress, {
          x: 220,
          y: 500,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        printedpagetwo.drawText(certficateUserName, {
          x: certificateX,
          y: 470,
          width: textWidth,
          height: textHeight,
          size: 24,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });
        {
          propObject.p_8950348644625._Title2 &&
            printedpagetwo.drawText(and, {
              x: 400,
              y: 460,
              width: textWidth,
              height: textHeight,
              size: 10,
              color: rgb(0, 0, 0),
              lineHeight: fontSize * 1.2,
              font: tempusFontPrinted,
            });

          printedpagetwo.drawText(certficateUserNameTwo, {
            x: certificateTwoX,
            y: 435,
            width: textWidth,
            height: textHeight,
            size: 24,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: oldEngPrinted,
          });
        }
        printedpagetwo.drawText(certificateAddressTwo, {
          x: 195,
          y: propObject.p_8950348644625._Title2 ? 415 : 450,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        printedpagetwo.drawText(certificateText, {
          x: 60,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        printedpagetwo.drawText(certificateTextTwo, {
          x: 460,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        printedpagetwo.drawImage(titlePack_borders, {
          y: 0,
          width: printedpagetwo.getWidth(),
          height: 50,
        });

        // printed deed page start =========================

        printeddeedPage.drawText(`(${formerTitle})`, {
          x: totalWidth,
          y: 710,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });

        printeddeedPage.drawText(formerTitle, {
          x: 175,
          y: 449,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });

        printeddeedPage.drawText(newTitle, {
          x: newTotalTextWidth,
          y: 683,
          size: 12,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });
        printeddeedPage.drawText(MainHeading, {
          x: 200,
          y: 750,
          size: 20,
          width: textWidth,
          height: textHeight,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });
        printeddeedPage.drawText(SubHeading, {
          x: 180,
          y: 730,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(deedFormText, {
          x: 30,
          y: 710,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(deedFormText, {
          x: 30,
          y: 710,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: underlineX5, y: 600 }, // Adjust the y-position for Form Field 3
          end: { x: underlineX6, y: 600 }, // Adjust the y-position for Form Field 3
          color: rgb(0.65, 0.65, 0.65),
          thickness: underlineHeight,
        });

        printeddeedPage.drawText(deedFormTextPlaceHolder, {
          x: 60,
          y: 603,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0.65, 0.65, 0.65),
          lineHeight: fontSize * 1.2,
          font: timesRomanItalicFontPrinted,
        });

        printeddeedPage.drawText(declarationOne, {
          x: 30,
          y: 580,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(absolute, {
          x: 30,
          y: 560,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printeddeedPage.drawText(formerNameBreak, {
          x: 453,
          y: 560,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });
        printeddeedPage.drawText(titleBreak, {
          x: 30,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });
        printeddeedPage.drawText(absoluteTwo, {
          x: 58,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printeddeedPage.drawText(newTitleTwo, {
          x: 415,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });
        printeddeedPage.drawText(inContent, {
          x: 520,
          y: 548,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printeddeedPage.drawText(absoluteThree, {
          x: 30,
          y: 536,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(declarationTwo, {
          x: 30,
          y: 500,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(declarationTwoSubscribe, {
          x: 30,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printeddeedPage.drawText(newTitleTwo, {
          x: 120,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(declarationTwoSubscribeName, {
          x: 210,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(formerTitle, {
          x: 380,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });

        printeddeedPage.drawText(so, {
          x: 500,
          y: 473,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(relinqushed, {
          x: 30,
          y: 461,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printeddeedPage.drawText(newTitleBreak, {
          x: 510,
          y: 461,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });

        printeddeedPage.drawText(newTitleBreakTwo, {
          x: 30,
          y: 449,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });

        printeddeedPage.drawText(only, {
          x: 73,
          y: 449,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });

        printeddeedPage.drawText(declarationThree, {
          x: 30,
          y: 420,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(adopt, {
          x: 30,
          y: 408,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(newTitleTwo, {
          x: 70,
          y: 408,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });

        printeddeedPage.drawText(declarationFour, {
          x: 30,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printeddeedPage.drawText(newTitleTwo, {
          x: 413,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontHeadingPrinted,
        });
        printeddeedPage.drawText(declarationFourTwo, {
          x: 515,
          y: 370,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(signed, {
          x: 30,
          y: 300,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });
        printeddeedPage.drawLine({
          start: { x: underlineX3, y: 300 }, // Adjust the y-position for Form Field 3
          end: { x: underlineX4, y: 300 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        printeddeedPage.drawText(dayOf, {
          x: 190,
          y: 300,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: underlineX1, y: 300 }, // Adjust the y-position for Form Field 3
          end: { x: underlineX2, y: 300 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        printeddeedPage.drawText(yearIn, {
          x: 330,
          y: 300,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(signedAs, {
          x: 30,
          y: 270,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: 30, y: 200 }, // Adjust the y-position for Form Field 3
          end: { x: 250, y: 200 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
        printeddeedPage.drawText(signPlaceHolder, {
          x: 40,
          y: 190,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0.65, 0.65, 0.65),
          lineHeight: fontSize * 1.2,
          font: timesRomanItalicFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: 30, y: 170 }, // Adjust the y-position for Form Field 3
          end: { x: 250, y: 170 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        printeddeedPage.drawText(lordName, {
          x: 40,
          y: 155,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: 30, y: 90 }, // Adjust the y-position for Form Field 3
          end: { x: 250, y: 90 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        printeddeedPage.drawText(formerName, {
          x: 40,
          y: 75,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(presence, {
          x: 270,
          y: 240,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawText(witness, {
          x: 270,
          y: 190,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: 370, y: 190 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 190 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        printeddeedPage.drawText("Name", {
          x: 270,
          y: 160,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: 300, y: 160 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 160 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        printeddeedPage.drawText("Address", {
          x: 270,
          y: 130,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: 310, y: 130 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 130 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
        printeddeedPage.drawLine({
          start: { x: 270, y: 105 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 105 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });
        printeddeedPage.drawLine({
          start: { x: 270, y: 80 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 80 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        printeddeedPage.drawText("Occupation", {
          x: 270,
          y: 50,
          width: textWidth,
          height: textHeight,
          size: 12,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        printeddeedPage.drawLine({
          start: { x: 330, y: 50 }, // Adjust the y-position for Form Field 3
          end: { x: 540, y: 50 }, // Adjust the y-position for Form Field 3
          color: rgb(0, 0, 0),
          thickness: underlineHeight,
        });

        if (propObject.p_8950348644625._Title2) {
          positions.forEach((position) => {
            printeddeedPageTwo.drawText(`${formerTitle}.`, {
              x: position.x,
              y: position.y,
              size: 12,
              width: textWidth,
              height: textHeight,
              color: rgb(0, 0, 0),
              lineHeight: fontSize * 1.2,
              font: timesRomanFontHeadingPrinted,
            });
          });

          const deedTwoUserNameWidth = `of ${deedModifiedNameTwo}`;
          const formerDeedTwotextWidth =
            timesRomanFontHeading.widthOfTextAtSize(deedTwoUserNameWidth, 12);
          // console.log(formertextWidth, "formertextWidth");
          const totalWidthDeedTwo = formerDeedTwotextWidth + 35;

          const deedTwoNewNameWidth = `now ${propObject.p_8950348644625._Title2} ${deedModifiedNameTwo}`;
          const newDeedTwotextWidth = timesRomanFontHeading.widthOfTextAtSize(
            deedTwoNewNameWidth,
            12
          );

          const newDeedTwoTotalTextWidth = newDeedTwotextWidth + 30;

          printeddeedPageTwo.drawText(`(${formerTitle})`, {
            x: totalWidthDeedTwo,
            y: 710,
            size: 12,
            width: textWidth,
            height: textHeight,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });

          printeddeedPageTwo.drawText(formerTitle, {
            x: 175,
            y: 449,
            size: 12,
            width: textWidth,
            height: textHeight,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });

          printeddeedPageTwo.drawText(newTitle, {
            x: newDeedTwoTotalTextWidth,
            y: 683,
            size: 12,
            width: textWidth,
            height: textHeight,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });

          const deedFormTextTwo = `of ${deedModifiedNameTwo}\n\nnow ${propObject.p_8950348644625._Title2} ${deedModifiedNameTwo}\n\nBY THIS DEED OF CHANGE OF NAME AND TITLE made by myself the undersigned\n\n${propObject.p_8950348644625._Title2} ${deedModifiedNameTwo}\n\nof`;

          const lordNameTwo = `${propObject.p_8950348644625._Title2} ${deedModifiedNameTwo}\n\nFormerly known as`;
          const formerNameTwo = `${deedModifiedNameTwo}`;

          printeddeedPageTwo.drawText(MainHeading, {
            x: 200,
            y: 750,
            size: 20,
            width: textWidth,
            height: textHeight,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });
          printeddeedPageTwo.drawText(SubHeading, {
            x: 180,
            y: 730,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(deedFormTextTwo, {
            x: 30,
            y: 710,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(deedFormTextTwo, {
            x: 30,
            y: 710,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: underlineX5, y: 600 }, // Adjust the y-position for Form Field 3
            end: { x: underlineX6, y: 600 }, // Adjust the y-position for Form Field 3
            color: rgb(0.65, 0.65, 0.65),
            thickness: underlineHeight,
          });

          printeddeedPageTwo.drawText(deedFormTextPlaceHolder, {
            x: 60,
            y: 603,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0.65, 0.65, 0.65),
            lineHeight: fontSize * 1.2,
            font: timesRomanItalicFontPrinted,
          });

          printeddeedPageTwo.drawText(declarationOne, {
            x: 30,
            y: 580,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(absolute, {
            x: 30,
            y: 560,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });
          printeddeedPageTwo.drawText(formerNameBreak, {
            x: 453,
            y: 560,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });
          printeddeedPageTwo.drawText(titleBreak, {
            x: 30,
            y: 548,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });
          printeddeedPageTwo.drawText(absoluteTwo, {
            x: 58,
            y: 548,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFont,
          });
          printeddeedPageTwo.drawText(newTitleTwo, {
            x: 415,
            y: 548,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });
          printeddeedPageTwo.drawText(inContent, {
            x: 520,
            y: 548,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFont,
          });
          printeddeedPageTwo.drawText(absoluteThree, {
            x: 30,
            y: 536,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(declarationTwo, {
            x: 30,
            y: 500,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(declarationTwoSubscribe, {
            x: 30,
            y: 473,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });
          printeddeedPageTwo.drawText(newTitleTwo, {
            x: 120,
            y: 473,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(declarationTwoSubscribeName, {
            x: 210,
            y: 473,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(formerTitle, {
            x: 380,
            y: 473,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });

          printeddeedPageTwo.drawText(so, {
            x: 500,
            y: 473,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(relinqushed, {
            x: 30,
            y: 461,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });
          printeddeedPageTwo.drawText(newTitleBreak, {
            x: 510,
            y: 461,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });

          printeddeedPageTwo.drawText(newTitleBreakTwo, {
            x: 30,
            y: 449,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });

          printeddeedPageTwo.drawText(only, {
            x: 73,
            y: 449,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });

          printeddeedPageTwo.drawText(declarationThree, {
            x: 30,
            y: 420,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(adopt, {
            x: 30,
            y: 408,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(newTitleTwo, {
            x: 70,
            y: 408,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });

          printeddeedPageTwo.drawText(declarationFour, {
            x: 30,
            y: 370,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });
          printeddeedPageTwo.drawText(newTitleTwo, {
            x: 413,
            y: 370,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontHeadingPrinted,
          });
          printeddeedPageTwo.drawText(declarationFourTwo, {
            x: 515,
            y: 370,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(signed, {
            x: 30,
            y: 300,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });
          printeddeedPageTwo.drawLine({
            start: { x: underlineX3, y: 300 }, // Adjust the y-position for Form Field 3
            end: { x: underlineX4, y: 300 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });

          printeddeedPageTwo.drawText(dayOf, {
            x: 190,
            y: 300,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: underlineX1, y: 300 }, // Adjust the y-position for Form Field 3
            end: { x: underlineX2, y: 300 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });

          printeddeedPageTwo.drawText(yearIn, {
            x: 330,
            y: 300,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(signedAs, {
            x: 30,
            y: 270,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: 30, y: 200 }, // Adjust the y-position for Form Field 3
            end: { x: 250, y: 200 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });
          printeddeedPageTwo.drawText(signPlaceHolder, {
            x: 40,
            y: 190,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0.65, 0.65, 0.65),
            lineHeight: fontSize * 1.2,
            font: timesRomanItalicFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: 30, y: 170 }, // Adjust the y-position for Form Field 3
            end: { x: 250, y: 170 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });

          printeddeedPageTwo.drawText(lordNameTwo, {
            x: 40,
            y: 155,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: 30, y: 90 }, // Adjust the y-position for Form Field 3
            end: { x: 250, y: 90 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });

          printeddeedPageTwo.drawText(formerNameTwo, {
            x: 40,
            y: 75,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(presence, {
            x: 270,
            y: 240,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawText(witness, {
            x: 270,
            y: 190,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: 370, y: 190 }, // Adjust the y-position for Form Field 3
            end: { x: 540, y: 190 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });

          printeddeedPageTwo.drawText("Name", {
            x: 270,
            y: 160,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: 300, y: 160 }, // Adjust the y-position for Form Field 3
            end: { x: 540, y: 160 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });

          printeddeedPageTwo.drawText("Address", {
            x: 270,
            y: 130,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: 310, y: 130 }, // Adjust the y-position for Form Field 3
            end: { x: 540, y: 130 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });
          printeddeedPageTwo.drawLine({
            start: { x: 270, y: 105 }, // Adjust the y-position for Form Field 3
            end: { x: 540, y: 105 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });
          printeddeedPageTwo.drawLine({
            start: { x: 270, y: 80 }, // Adjust the y-position for Form Field 3
            end: { x: 540, y: 80 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });

          printeddeedPageTwo.drawText("Occupation", {
            x: 270,
            y: 50,
            width: textWidth,
            height: textHeight,
            size: 12,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: timesRomanFontPrinted,
          });

          printeddeedPageTwo.drawLine({
            start: { x: 330, y: 50 }, // Adjust the y-position for Form Field 3
            end: { x: 540, y: 50 }, // Adjust the y-position for Form Field 3
            color: rgb(0, 0, 0),
            thickness: underlineHeight,
          });
        }

        //=============== printeddeedPageTwo ended=====================
      }

      //========================================== Emblem Work Started ================================

      const emblem_certificate_heading = `To All & Sundry whom these presents do concern\n
      Scotland Titles does declare that`;

      //Name Capital work

      let emblemNameParts = propObject.p_8950348644625._Name1.split(" ");
      console.log(emblemNameParts, "nameParts");
      let emblemModifiedName = emblemNameParts
        .map(
          (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        )
        .join(" ");
      console.log(emblemModifiedName, "modified name");

      //two name
      if (propObject.p_8950348644625._Title2) {
        let emblemNamePartsTwo = propObject.p_8950348644625._Name2.split(" ");
        console.log(emblemNamePartsTwo, "nameParts");
        let emblemModifiedNameTwo = emblemNamePartsTwo
          .map(
            (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
          )
          .join(" ");
        console.log(emblemModifiedNameTwo, "modified name two");
      }

      const emblemCertficateUserName = `${
        propObject.p_8950348644625._Title1
      } ${emblemModifiedName} ${propObject.p_8950348644625._Title2 ? "&" : ""}`;

      const userNametextWidth = oldEng.widthOfTextAtSize(
        emblemCertficateUserName,
        12
      );

      const halfOfWord = userNametextWidth / 2;
      const startingPosition =
        (emblemCertificate.getWidth() - userNametextWidth) / 2;
      const x = startingPosition - halfOfWord;

      const emblememblemCertficateUserNameTwo = `${
        propObject.p_8950348644625._Title2
          ? `${propObject.p_8950348644625._Title2} ${emblemModifiedNameTwo}`
          : ""
      }`;
      const userNametextTwoWidth = oldEng.widthOfTextAtSize(
        emblememblemCertficateUserNameTwo,
        12
      );

      const halfOfWordTwo = userNametextTwoWidth / 2;
      const startingPositionTwo =
        (emblemCertificate.getWidth() - userNametextTwoWidth) / 2;
      const xTwo = startingPositionTwo - halfOfWordTwo;

      const petition = "Having By Petition";

      const emblemCertificateText = `UNTO US THIS DAY IN THIS`;
      const emblemCertificateTextTwo = `YEAR OF THE REIGN OF OUR SOVEREIGN CHARLES THE\nTHIRD, BY THE GRACE OF GOD, OF THE UNITED\nKINGDOM OF GREAT BRITAIN AND NORTHERN\nIRELAND, KING, HEAD OF THE COMMONWEALTH,\nDEFENDER OF THE FAITH\n\n`;

      const Shewen = "Shewen:";

      const emblemCertificateShewenText = `THAT THE SAID ${
        propObject.p_8950348644625._Title2
          ? "PETITIONERS HAVE"
          : "PETITIONER HAS"
      }`;
      const emblemCertificateShewenTextTwo = `OWNERSHIP OF LANDS IN SCOTLAND AND THE\n${
        propObject.p_8950348644625._Title2 ? "PETITIONERS" : "PETITIONER"
      } HAVING PREYED THAT THERE MIGHT BE\nGRANTED UNTO THEM TO USE SUCH ENSIGNS\nARMORIAL AS MAY BE THE LAWFUL PROPERTY OF\nSCOTLAND TITLES AND MIGHT BE SUITABLE AND\nACCORDING TO THE LAWS OF ARMS, KNOW YE\nTHEREFORE THAT WE HAVE ASSIGNED, AND DO BY\nTHESE PRESENTS DECLARE, RATIFY AND CONFIRM UNTO\nTHE ${
        propObject.p_8950348644625._Title2 ? "PETITIONERS" : "PETITIONER"
      } THE FOLLOWING ENSIGNS ARMORIAL,\nAS DEPICTED HEREOF, AND MATRICULATED OF EVEN\nDATE WITH THESE PRESENTS AS A MARK OF THE\nINTELLECTUAL PROPERTY OF SCOTLAND TITLES, TO BE\nPRESENTED BY THE ${
        propObject.p_8950348644625._Title2 ? "PETITIONERS" : "PETITIONER"
      } AS THEY DEEM,\n\n`;

      const videlicit = "Videlicit:";

      const emblemCertificateVidelicitText = `BY DEMONSTRATION OF WHICH ENSIGNS`;
      const emblemCertificateVidelicitTextTwo = `ARMORIAL THE SAID ${
        propObject.p_8950348644625._Title2 ? "PETITIONERS ARE" : "PETITIONER IS"
      }, AMONGST ALL\nNOBLES AND IN ALL PLACES OF HONOUR, TO BE\nTAKEN, NUMBERED, ACCOUNTED AND RECEIVED ${
        propObject.p_8950348644625._Title2
          ? "AS\nLAIRDS OF SCOTLAND,"
          : "A\nLAIRD OF SCOTLAND,"
      }\n\n`;

      const testimony = "In Testimony Whereof:";

      const emblemCertificateTestimonyText = `WE HAVE SUBSCRIBED`;
      const emblemCertificateTestimonyTextTwo = `THESE PRESENTS AND THE SEAL OF OUR OFFICE IS\nAFFIXED HERETO AT SCOTLAND TITLES THIS DAY.\n\n`;

      const further = "furthermore know ye therefore that";
      const furtherDescription =
        "SCOTLAND TITLES HAS SET OUT PART OF THE ESTATE BY\nBLAIRADAM FOREST KNOWN AS CANTSDAM, FIFE,\nSCOTLAND, HEREINAFTER REFERRED TO AS ‘THE\nESTATE’, AS A SCHEME OF SOUVENIR PLOTS AND";

      const Scilicet = "Scilicet";
      const scilicetSubDescription = "BY VIRTUE OF OWNERSHIP OF THE LAND IN ";
      const ScilicetDescription = `SCOTLAND AND IN PARTICULAR THE LAND DESCRIBED\nABOVE WITHIN THE KINGDOM OF FIFE BY CANTSDAM\nAS FURTHER DESCRIBEDIN THE CERTIFICATE OF\nDISPOSITION AND PROCLAMATION, THE ${
        propObject.p_8950348644625._Title2 ? "PETITIONERS" : "PETITIONER"
      }\nMAY HENCEFORTH AND IN PERPETUITY BE KNOWN BY\nTHE STYLE OF ${
        propObject.p_8950348644625._Title2 ? "LAIRDS" : "A LAIRD"
      } AND IN PARTICULAR ${
        propObject.p_8950348644625._Title2 ? "LAIRDS" : "LAIRD"
      } OF\nBLAIRADAM.`;
      //Signed content

      const emblemSigned = "Signed";

      const dateText = "Date";

      const emblemdate = propObject.p_8950348644625._Date;
      const emblemdateObj = new Date(emblemdate);
      const emblemyear = emblemdateObj.getFullYear();
      const emblemmonth = String(emblemdateObj.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are 0-indexed
      const emblemday = String(emblemdateObj.getDate()).padStart(2, "0");

      const emblemmonthName = monthNames[emblemdateObj.getMonth()];
      let dayWithSuffix;

      if (emblemday >= 11 && emblemday <= 13) {
        dayWithSuffix = `${emblemday}TH`;
      } else {
        switch (emblemday % 10) {
          case 1:
            dayWithSuffix = `${emblemday}ST`;
            break;
          case 2:
            dayWithSuffix = `${emblemday}ND`;
            break;
          case 3:
            dayWithSuffix = `${emblemday}RD`;
            break;
          default:
            dayWithSuffix = `${emblemday}TH`;
        }
      }
      const dateContent = `THIS ${dayWithSuffix} DAY OF ${emblemmonthName} IN THE YEAR ${emblemyear}`;
      const copyright =
        "All content, layout, artwork and illustrations copyright Scotland Titles 2021 and subject to licence";

      const emblemBgPath = path.resolve("./public", "images", "emblem_bg.png");

      const emblembg_Buffer = fs.readFileSync(emblemBgPath);

      // console.log(imgBuffer, "imgBuffer");
      const emblem_bg = await pdfDoc.embedPng(emblembg_Buffer);
      //borders image

      const emblemlogoPath = path.resolve(
        "./public",
        "images",
        "emblem_logo.png"
      );

      const emblem_logo_Buffer = fs.readFileSync(emblemlogoPath);

      // console.log(imgBuffer, "imgBuffer");
      const emblem_logo = await pdfDoc.embedPng(emblem_logo_Buffer);

      const emblem_logo_printed = await pdfDocPrinted.embedPng(
        emblem_logo_Buffer
      );

      const emblemsignPath = path.resolve(
        "./public",
        "images",
        "g_signature.png"
      );
      const emblem_signature_Buffer = fs.readFileSync(emblemsignPath);

      // console.log(imgBuffer, "imgBuffer");
      const emblem_signature = await pdfDoc.embedPng(emblem_signature_Buffer);

      const emblem_signature_printed = await pdfDocPrinted.embedPng(
        emblem_signature_Buffer
      );

      if (propObject.p_8950348644625.variant.includes("Printed Pack")) {
        var textWidth = emblemCertificatePrinted.getWidth() - 100; // Adjust the width as needed
        var textHeight = emblemCertificatePrinted.getHeight() - 50;
      } else {
        var textWidth = emblemCertificate.getWidth() - 100; // Adjust the width as needed
        var textHeight = emblemCertificate.getHeight() - 50;
      }

      emblemCertificate.drawImage(emblem_bg, {
        width: emblemCertificate.getWidth(),
        height: emblemCertificate.getHeight(),
      });

      emblemCertificate.drawImage(certificateMid, {
        x: 250,
        y: propObject.p_8950348644625._Title2 ? 610 : 630,
        width: ertificateMidpngDims.width,
        height: ertificateMidpngDims.height,
      });
      emblemCertificate.drawImage(img, {
        x: 40,
        y: 710,
        width: pngDims.width,
        height: pngDims.height,
      });

      emblemCertificate.drawImage(stampImg, {
        x: 490,
        y: 70,
        width: stampPngDims.width,
        height: stampPngDims.height,
      });

      emblemCertificate.drawText(emblem_certificate_heading, {
        x: 150,
        y: 730,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(emblemCertficateUserName, {
        // x: 200,
        x: x,
        y: 670,
        width: textWidth,
        height: textHeight,
        size: 26,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(emblememblemCertficateUserNameTwo, {
        // x: 200,
        x: xTwo,
        y: 640,
        width: textWidth,
        height: textHeight,
        size: 26,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(petition, {
        x: 25,
        y: 580,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(emblemCertificateText, {
        x: 160,
        y: 580,
        width: textWidth,
        height: textHeight,
        size: 9,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      emblemCertificate.drawText(emblemCertificateTextTwo, {
        x: 25,
        y: 565,
        width: textWidth,
        height: textHeight,
        size: 9,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //shewen text

      emblemCertificate.drawText(Shewen, {
        x: 25,
        y: 490,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(emblemCertificateShewenText, {
        x: 85,
        y: 490,
        width: textWidth,
        height: textHeight,
        size: 9,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      emblemCertificate.drawText(emblemCertificateShewenTextTwo, {
        x: 25,
        y: 475,
        width: textWidth,
        height: textHeight,
        size: 9,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //videlict

      emblemCertificate.drawText(videlicit, {
        x: 25,
        y: 290,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(emblemCertificateVidelicitText, {
        x: 90,
        y: 290,
        width: textWidth,
        height: textHeight,
        size: 9,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      emblemCertificate.drawText(emblemCertificateVidelicitTextTwo, {
        x: 25,
        y: 275,
        width: textWidth,
        height: textHeight,
        size: 9,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //In Testimony Whereof

      emblemCertificate.drawText(testimony, {
        x: 25,
        y: 210,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(emblemCertificateTestimonyText, {
        x: 180,
        y: 210,
        width: textWidth,
        height: textHeight,
        size: 9,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      emblemCertificate.drawText(emblemCertificateTestimonyTextTwo, {
        x: 25,
        y: 195,
        width: textWidth,
        height: textHeight,
        size: 9,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      emblemCertificate.drawImage(emblem_logo, {
        x: 320,
        y: 400,
        height: 200,
        width: 250,
      });

      emblemCertificate.drawText(further, {
        x: 310,
        y: 380,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(furtherDescription, {
        x: 310,
        y: 355,
        width: textWidth,
        height: textHeight,
        size: 9,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      emblemCertificate.drawText(Scilicet, {
        x: 310,
        y: 275,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(scilicetSubDescription, {
        x: 360,
        y: 275,
        width: textWidth,
        height: textHeight,
        size: 9,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      emblemCertificate.drawText(ScilicetDescription, {
        x: 310,
        y: 260,
        width: textWidth,
        height: textHeight,
        size: 9,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //SIGNED
      emblemCertificate.drawText(emblemSigned, {
        x: 150,
        y: 120,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(dateText, {
        x: 170,
        y: 80,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(dateContent, {
        x: 210,
        y: 80,
        width: textWidth,
        height: textHeight,
        size: 9,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      emblemCertificate.drawText(copyright, {
        x: 190,
        y: 70,
        width: textWidth,
        height: textHeight,
        size: 6,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      emblemCertificate.drawImage(emblem_signature, {
        x: 210,
        y: 100,
        height: 50,
        width: 30,
      });

      //========================Printed Emblem Page Start===========================
      const border_two = path.resolve("./public", "images", "borders.jpg");

      const border_Buffer_emblem = fs.readFileSync(border_two);

      const emblem_borders = await pdfDocPrinted.embedJpg(border_Buffer_emblem);
      if (propObject.p_8950348644625.variant.includes("Printed Pack")) {
        emblemCertificatePrinted.drawImage(emblem_borders, {
          y: 790,
          width: emblemCertificatePrinted.getWidth(),
          height: 70,
        });

        emblemCertificatePrinted.drawImage(certificateMidPrinted, {
          x: 250,
          y: propObject.p_8950348644625._Title2 ? 610 : 630,
          width: ertificateMidpngDims.width,
          height: ertificateMidpngDims.height,
        });

        emblemCertificatePrinted.drawImage(img_printed, {
          x: 40,
          y: 710,
          width: pngDims.width,
          height: pngDims.height,
        });

        emblemCertificatePrinted.drawImage(stampImgPrinted, {
          x: 490,
          y: 70,
          width: stampPngDims.width,
          height: stampPngDims.height,
        });

        emblemCertificatePrinted.drawText(emblem_certificate_heading, {
          x: 150,
          y: 730,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        emblemCertificatePrinted.drawText(emblemCertficateUserName, {
          // x: 200,
          x: x,
          y: 670,
          width: textWidth,
          height: textHeight,
          size: 26,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        emblemCertificatePrinted.drawText(emblememblemCertficateUserNameTwo, {
          // x: 200,
          x: xTwo,
          y: 640,
          width: textWidth,
          height: textHeight,
          size: 26,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        emblemCertificatePrinted.drawText(petition, {
          x: 25,
          y: 580,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        emblemCertificatePrinted.drawText(emblemCertificateText, {
          x: 160,
          y: 580,
          width: textWidth,
          height: textHeight,
          size: 9,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        emblemCertificatePrinted.drawText(emblemCertificateTextTwo, {
          x: 25,
          y: 565,
          width: textWidth,
          height: textHeight,
          size: 9,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        // //shewen text

        emblemCertificatePrinted.drawText(Shewen, {
          x: 25,
          y: 490,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        emblemCertificatePrinted.drawText(emblemCertificateShewenText, {
          x: 85,
          y: 490,
          width: textWidth,
          height: textHeight,
          size: 9,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        emblemCertificatePrinted.drawText(emblemCertificateShewenTextTwo, {
          x: 25,
          y: 475,
          width: textWidth,
          height: textHeight,
          size: 9,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        // //videlict

        emblemCertificatePrinted.drawText(videlicit, {
          x: 25,
          y: 290,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        emblemCertificatePrinted.drawText(emblemCertificateVidelicitText, {
          x: 90,
          y: 290,
          width: textWidth,
          height: textHeight,
          size: 9,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        emblemCertificatePrinted.drawText(emblemCertificateVidelicitTextTwo, {
          x: 25,
          y: 275,
          width: textWidth,
          height: textHeight,
          size: 9,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        // //In Testimony Whereof

        emblemCertificatePrinted.drawText(testimony, {
          x: 25,
          y: 210,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        emblemCertificatePrinted.drawText(emblemCertificateTestimonyText, {
          x: 180,
          y: 210,
          width: textWidth,
          height: textHeight,
          size: 9,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        emblemCertificatePrinted.drawText(emblemCertificateTestimonyTextTwo, {
          x: 25,
          y: 195,
          width: textWidth,
          height: textHeight,
          size: 9,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        emblemCertificatePrinted.drawImage(emblem_logo_printed, {
          x: 320,
          y: 400,
          height: 200,
          width: 250,
        });

        emblemCertificatePrinted.drawText(further, {
          x: 310,
          y: 380,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        emblemCertificatePrinted.drawText(furtherDescription, {
          x: 310,
          y: 355,
          width: textWidth,
          height: textHeight,
          size: 9,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        emblemCertificatePrinted.drawText(Scilicet, {
          x: 310,
          y: 275,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        emblemCertificatePrinted.drawText(scilicetSubDescription, {
          x: 360,
          y: 275,
          width: textWidth,
          height: textHeight,
          size: 9,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        emblemCertificatePrinted.drawText(ScilicetDescription, {
          x: 310,
          y: 260,
          width: textWidth,
          height: textHeight,
          size: 9,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        // //SIGNED
        emblemCertificatePrinted.drawText(emblemSigned, {
          x: 150,
          y: 120,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        emblemCertificatePrinted.drawText(dateText, {
          x: 170,
          y: 80,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        emblemCertificatePrinted.drawText(dateContent, {
          x: 210,
          y: 80,
          width: textWidth,
          height: textHeight,
          size: 9,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        emblemCertificatePrinted.drawText(copyright, {
          x: 190,
          y: 70,
          width: textWidth,
          height: textHeight,
          size: 6,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        emblemCertificatePrinted.drawImage(emblem_signature_printed, {
          x: 210,
          y: 100,
          height: 50,
          width: 30,
        });

        emblemCertificatePrinted.drawImage(emblem_borders, {
          y: 0,
          width: emblemCertificatePrinted.getWidth(),
          height: 60,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  };

  const onlyEmblem = async (propObject) => {
    console.log(propObject, "in emblum func");

    try {
      if (propObject.p_8727183065361.variant.includes("Printed Pack")) {
        var emblemCertificatePrinted = pdfDocPrinted.addPage([595, 842]);
        var emblemCertificate = pdfDoc.addPage([595, 842]);
      } else {
        var emblemCertificate = pdfDoc.addPage([595, 842]);
      }

      const emblem_certificate_heading = `To All & Sundry whom these presents do concern\n
              Scotland Titles does declare that`;

      //Name Capital work

      let emblemNameParts = propObject.p_8727183065361._Name1.split(" ");
      console.log(emblemNameParts, "nameParts");
      let emblemModifiedName = emblemNameParts
        .map(
          (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        )
        .join(" ");
      console.log(emblemModifiedName, "modified name");

      //two name
      if (propObject.p_8727183065361._Title2) {
        let emblemNamePartsTwo = propObject.p_8727183065361._Name2.split(" ");
        console.log(emblemNamePartsTwo, "nameParts");
        let emblemModifiedNameTwo = emblemNamePartsTwo
          .map(
            (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
          )
          .join(" ");
        console.log(emblemModifiedNameTwo, "modified name two");
      }

      const emblemCertficateUserName = `${
        propObject.p_8727183065361._Title1
      } ${emblemModifiedName} ${propObject.p_8727183065361._Title2 ? "&" : ""}`;

      const userNametextWidth = oldEng.widthOfTextAtSize(
        emblemCertficateUserName,
        12
      );

      const halfOfWord = userNametextWidth / 2;
      const startingPosition =
        (emblemCertificate.getWidth() - userNametextWidth) / 2;
      const x = startingPosition - halfOfWord;

      const emblememblemCertficateUserNameTwo = `${
        propObject.p_8727183065361._Title2
          ? `${propObject.p_8727183065361._Title2} ${emblemModifiedNameTwo}`
          : ""
      }`;
      const userNametextTwoWidth = oldEng.widthOfTextAtSize(
        emblememblemCertficateUserNameTwo,
        12
      );

      const halfOfWordTwo = userNametextTwoWidth / 2;
      const startingPositionTwo =
        (emblemCertificate.getWidth() - userNametextTwoWidth) / 2;
      const xTwo = startingPositionTwo - halfOfWordTwo;

      const petition = "Having By Petition";

      const emblemCertificateText = `UNTO US THIS DAY IN THIS`;
      const emblemCertificateTextTwo = `YEAR OF THE REIGN OF OUR SOVEREIGN CHARLES THE\nTHIRD, BY THE GRACE OF GOD, OF THE UNITED\nKINGDOM OF GREAT BRITAIN AND NORTHERN\nIRELAND, KING, HEAD OF THE COMMONWEALTH,\nDEFENDER OF THE FAITH\n\n`;

      const Shewen = "Shewen:";

      const emblemCertificateShewenText = `THAT THE SAID ${
        propObject.p_8727183065361._Title2
          ? "PETITIONERS HAVE"
          : "PETITIONER HAS"
      }`;
      const emblemCertificateShewenTextTwo = `OWNERSHIP OF LANDS IN SCOTLAND AND THE\n${
        propObject.p_8727183065361._Title2 ? "PETITIONERS" : "PETITIONER"
      } HAVING PREYED THAT THERE MIGHT BE\nGRANTED UNTO THEM TO USE SUCH ENSIGNS\nARMORIAL AS MAY BE THE LAWFUL PROPERTY OF\nSCOTLAND TITLES AND MIGHT BE SUITABLE AND\nACCORDING TO THE LAWS OF ARMS, KNOW YE\nTHEREFORE THAT WE HAVE ASSIGNED, AND DO BY\nTHESE PRESENTS DECLARE, RATIFY AND CONFIRM UNTO\nTHE ${
        propObject.p_8727183065361._Title2 ? "PETITIONERS" : "PETITIONER"
      } THE FOLLOWING ENSIGNS ARMORIAL,\nAS DEPICTED HEREOF, AND MATRICULATED OF EVEN\nDATE WITH THESE PRESENTS AS A MARK OF THE\nINTELLECTUAL PROPERTY OF SCOTLAND TITLES, TO BE\nPRESENTED BY THE ${
        propObject.p_8727183065361._Title2 ? "PETITIONERS" : "PETITIONER"
      } AS THEY DEEM,\n\n`;

      const videlicit = "Videlicit:";

      const emblemCertificateVidelicitText = `BY DEMONSTRATION OF WHICH ENSIGNS`;
      const emblemCertificateVidelicitTextTwo = `ARMORIAL THE SAID ${
        propObject.p_8727183065361._Title2 ? "PETITIONERS ARE" : "PETITIONER IS"
      }, AMONGST ALL\nNOBLES AND IN ALL PLACES OF HONOUR, TO BE\nTAKEN, NUMBERED, ACCOUNTED AND RECEIVED ${
        propObject.p_8727183065361._Title2
          ? "AS\nLAIRDS OF SCOTLAND,"
          : "A\nLAIRD OF SCOTLAND,"
      }\n\n`;

      const testimony = "In Testimony Whereof:";

      const emblemCertificateTestimonyText = `WE HAVE SUBSCRIBED`;
      const emblemCertificateTestimonyTextTwo = `THESE PRESENTS AND THE SEAL OF OUR OFFICE IS\nAFFIXED HERETO AT SCOTLAND TITLES THIS DAY.\n\n`;

      const further = "furthermore know ye therefore that";
      const furtherDescription =
        "SCOTLAND TITLES HAS SET OUT PART OF THE ESTATE BY\nBLAIRADAM FOREST KNOWN AS CANTSDAM, FIFE,\nSCOTLAND, HEREINAFTER REFERRED TO AS ‘THE\nESTATE’, AS A SCHEME OF SOUVENIR PLOTS AND";

      const Scilicet = "Scilicet";
      const scilicetSubDescription = "BY VIRTUE OF OWNERSHIP OF THE LAND IN ";
      const ScilicetDescription = `SCOTLAND AND IN PARTICULAR THE LAND DESCRIBED\nABOVE WITHIN THE KINGDOM OF FIFE BY CANTSDAM\nAS FURTHER DESCRIBEDIN THE CERTIFICATE OF\nDISPOSITION AND PROCLAMATION, THE ${
        propObject.p_8727183065361._Title2 ? "PETITIONERS" : "PETITIONER"
      }\nMAY HENCEFORTH AND IN PERPETUITY BE KNOWN BY\nTHE STYLE OF ${
        propObject.p_8727183065361._Title2 ? "LAIRDS" : "A LAIRD"
      } AND IN PARTICULAR ${
        propObject.p_8727183065361._Title2 ? "LAIRDS" : "LAIRD"
      } OF\nBLAIRADAM.`;
      //Signed content

      const emblemSigned = "Signed";

      const dateText = "Date";

      const emblemdate = propObject.p_8727183065361._Date;
      const emblemdateObj = new Date(emblemdate);
      const emblemyear = emblemdateObj.getFullYear();
      const emblemmonth = String(emblemdateObj.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are 0-indexed
      const emblemday = String(emblemdateObj.getDate()).padStart(2, "0");
      const filePathThree = path.resolve(
        "./public",
        "images",
        "certificate-stamp.png"
      );

      const imgBufferThree = fs.readFileSync(filePathThree);
      // console.log(imgBuffer, "imgBuffer");
      const stampImg = await pdfDoc.embedPng(imgBufferThree);
      const stampImgPrinted = await pdfDocPrinted.embedPng(imgBufferThree);

      const stampPngDims = stampImg.scale(0.3);
      const monthNames = [
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER",
      ];

      const emblemmonthName = monthNames[emblemdateObj.getMonth()];
      let dayWithSuffix;

      if (emblemday >= 11 && emblemday <= 13) {
        dayWithSuffix = `${emblemday}TH`;
      } else {
        switch (emblemday % 10) {
          case 1:
            dayWithSuffix = `${emblemday}ST`;
            break;
          case 2:
            dayWithSuffix = `${emblemday}ND`;
            break;
          case 3:
            dayWithSuffix = `${emblemday}RD`;
            break;
          default:
            dayWithSuffix = `${emblemday}TH`;
        }
      }
      const dateContent = `THIS ${dayWithSuffix} DAY OF ${emblemmonthName} IN THE YEAR ${emblemyear}`;
      const copyright =
        "All content, layout, artwork and illustrations copyright Scotland Titles 2021 and subject to licence";

      const emblemBgPath = path.resolve("./public", "images", "emblem_bg.png");

      const emblembg_Buffer = fs.readFileSync(emblemBgPath);

      // console.log(imgBuffer, "imgBuffer");
      const emblem_bg = await pdfDoc.embedPng(emblembg_Buffer);
      //borders image

      const border = path.resolve("./public", "images", "borders.jpg");

      const border_Buffer = fs.readFileSync(border);

      const emblem_borders = await pdfDocPrinted.embedJpg(border_Buffer);

      const filePathFour = path.resolve(
        "./public",
        "images",
        "certificate-mid.png"
      );

      const imgBufferFour = fs.readFileSync(filePathFour);
      const certificateMid = await pdfDoc.embedPng(imgBufferFour);

      const certificateMidPrinted = await pdfDocPrinted.embedPng(imgBufferFour);

      const ertificateMidpngDims = certificateMid.scale(0.3);

      const emblemlogoPath = path.resolve(
        "./public",
        "images",
        "emblem_logo.png"
      );

      const emblem_logo_Buffer = fs.readFileSync(emblemlogoPath);

      // console.log(imgBuffer, "imgBuffer");
      const emblem_logo = await pdfDoc.embedPng(emblem_logo_Buffer);

      const emblem_logo_printed = await pdfDocPrinted.embedPng(
        emblem_logo_Buffer
      );

      const filePath = path.resolve("./public", "images", "scotland_log.png");

      const imgBuffer = fs.readFileSync(filePath);
      const img = await pdfDoc.embedPng(imgBuffer);
      const img_printed = await pdfDocPrinted.embedPng(imgBuffer);

      const pngDims = img.scale(0.25);

      const emblemsignPath = path.resolve(
        "./public",
        "images",
        "g_signature.png"
      );
      const emblem_signature_Buffer = fs.readFileSync(emblemsignPath);

      // console.log(imgBuffer, "imgBuffer");
      const emblem_signature = await pdfDoc.embedPng(emblem_signature_Buffer);

      const emblem_signature_printed = await pdfDocPrinted.embedPng(
        emblem_signature_Buffer
      );

      if (propObject.p_8727183065361.variant.includes("Printed Pack")) {
        var textWidth = emblemCertificatePrinted.getWidth() - 100; // Adjust the width as needed
        var textHeight = emblemCertificatePrinted.getHeight() - 50;
      } else {
        var textWidth = emblemCertificate.getWidth() - 100; // Adjust the width as needed
        var textHeight = emblemCertificate.getHeight() - 50;
      }

      emblemCertificate.drawImage(emblem_bg, {
        width: emblemCertificate.getWidth(),
        height: emblemCertificate.getHeight(),
      });

      emblemCertificate.drawImage(certificateMid, {
        x: 250,
        y: propObject.p_8727183065361._Title2 ? 610 : 630,
        width: ertificateMidpngDims.width,
        height: ertificateMidpngDims.height,
      });
      emblemCertificate.drawImage(img, {
        x: 40,
        y: 710,
        width: pngDims.width,
        height: pngDims.height,
      });

      emblemCertificate.drawImage(stampImg, {
        x: 490,
        y: 70,
        width: stampPngDims.width,
        height: stampPngDims.height,
      });

      emblemCertificate.drawText(emblem_certificate_heading, {
        x: 150,
        y: 730,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(emblemCertficateUserName, {
        // x: 200,
        x: x,
        y: 670,
        width: textWidth,
        height: textHeight,
        size: 26,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(emblememblemCertficateUserNameTwo, {
        // x: 200,
        x: xTwo,
        y: 640,
        width: textWidth,
        height: textHeight,
        size: 26,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(petition, {
        x: 25,
        y: 580,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(emblemCertificateText, {
        x: 160,
        y: 580,
        width: textWidth,
        height: textHeight,
        size: 9,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      emblemCertificate.drawText(emblemCertificateTextTwo, {
        x: 25,
        y: 565,
        width: textWidth,
        height: textHeight,
        size: 9,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //shewen text

      emblemCertificate.drawText(Shewen, {
        x: 25,
        y: 490,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(emblemCertificateShewenText, {
        x: 85,
        y: 490,
        width: textWidth,
        height: textHeight,
        size: 9,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      emblemCertificate.drawText(emblemCertificateShewenTextTwo, {
        x: 25,
        y: 475,
        width: textWidth,
        height: textHeight,
        size: 9,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //videlict

      emblemCertificate.drawText(videlicit, {
        x: 25,
        y: 290,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(emblemCertificateVidelicitText, {
        x: 90,
        y: 290,
        width: textWidth,
        height: textHeight,
        size: 9,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      emblemCertificate.drawText(emblemCertificateVidelicitTextTwo, {
        x: 25,
        y: 275,
        width: textWidth,
        height: textHeight,
        size: 9,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //In Testimony Whereof

      emblemCertificate.drawText(testimony, {
        x: 25,
        y: 210,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(emblemCertificateTestimonyText, {
        x: 180,
        y: 210,
        width: textWidth,
        height: textHeight,
        size: 9,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      emblemCertificate.drawText(emblemCertificateTestimonyTextTwo, {
        x: 25,
        y: 195,
        width: textWidth,
        height: textHeight,
        size: 9,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      emblemCertificate.drawImage(emblem_logo, {
        x: 320,
        y: 400,
        height: 200,
        width: 250,
      });

      emblemCertificate.drawText(further, {
        x: 310,
        y: 380,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(furtherDescription, {
        x: 310,
        y: 355,
        width: textWidth,
        height: textHeight,
        size: 9,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      emblemCertificate.drawText(Scilicet, {
        x: 310,
        y: 275,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(scilicetSubDescription, {
        x: 360,
        y: 275,
        width: textWidth,
        height: textHeight,
        size: 9,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      emblemCertificate.drawText(ScilicetDescription, {
        x: 310,
        y: 260,
        width: textWidth,
        height: textHeight,
        size: 9,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //SIGNED
      emblemCertificate.drawText(emblemSigned, {
        x: 150,
        y: 120,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(dateText, {
        x: 170,
        y: 80,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      emblemCertificate.drawText(dateContent, {
        x: 210,
        y: 80,
        width: textWidth,
        height: textHeight,
        size: 9,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      emblemCertificate.drawText(copyright, {
        x: 190,
        y: 70,
        width: textWidth,
        height: textHeight,
        size: 6,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      emblemCertificate.drawImage(emblem_signature, {
        x: 210,
        y: 100,
        height: 50,
        width: 30,
      });

      //========================Printed Emblem Page Start===========================

      if (propObject.p_8727183065361.variant.includes("Printed Pack")) {
        emblemCertificatePrinted.drawImage(emblem_borders, {
          y: 790,
          width: emblemCertificatePrinted.getWidth(),
          height: 70,
        });

        emblemCertificatePrinted.drawImage(certificateMidPrinted, {
          x: 250,
          y: propObject.p_8727183065361._Title2 ? 610 : 630,
          width: ertificateMidpngDims.width,
          height: ertificateMidpngDims.height,
        });

        emblemCertificatePrinted.drawImage(img_printed, {
          x: 40,
          y: 710,
          width: pngDims.width,
          height: pngDims.height,
        });

        emblemCertificatePrinted.drawImage(stampImgPrinted, {
          x: 490,
          y: 70,
          width: stampPngDims.width,
          height: stampPngDims.height,
        });

        emblemCertificatePrinted.drawText(emblem_certificate_heading, {
          x: 150,
          y: 730,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        emblemCertificatePrinted.drawText(emblemCertficateUserName, {
          // x: 200,
          x: x,
          y: 670,
          width: textWidth,
          height: textHeight,
          size: 26,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        emblemCertificatePrinted.drawText(emblememblemCertficateUserNameTwo, {
          // x: 200,
          x: xTwo,
          y: 640,
          width: textWidth,
          height: textHeight,
          size: 26,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        emblemCertificatePrinted.drawText(petition, {
          x: 25,
          y: 580,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        emblemCertificatePrinted.drawText(emblemCertificateText, {
          x: 160,
          y: 580,
          width: textWidth,
          height: textHeight,
          size: 9,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        emblemCertificatePrinted.drawText(emblemCertificateTextTwo, {
          x: 25,
          y: 565,
          width: textWidth,
          height: textHeight,
          size: 9,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        // //shewen text

        emblemCertificatePrinted.drawText(Shewen, {
          x: 25,
          y: 490,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        emblemCertificatePrinted.drawText(emblemCertificateShewenText, {
          x: 85,
          y: 490,
          width: textWidth,
          height: textHeight,
          size: 9,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        emblemCertificatePrinted.drawText(emblemCertificateShewenTextTwo, {
          x: 25,
          y: 475,
          width: textWidth,
          height: textHeight,
          size: 9,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        // //videlict

        emblemCertificatePrinted.drawText(videlicit, {
          x: 25,
          y: 290,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        emblemCertificatePrinted.drawText(emblemCertificateVidelicitText, {
          x: 90,
          y: 290,
          width: textWidth,
          height: textHeight,
          size: 9,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        emblemCertificatePrinted.drawText(emblemCertificateVidelicitTextTwo, {
          x: 25,
          y: 275,
          width: textWidth,
          height: textHeight,
          size: 9,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        // //In Testimony Whereof

        emblemCertificatePrinted.drawText(testimony, {
          x: 25,
          y: 210,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        emblemCertificatePrinted.drawText(emblemCertificateTestimonyText, {
          x: 180,
          y: 210,
          width: textWidth,
          height: textHeight,
          size: 9,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        emblemCertificatePrinted.drawText(emblemCertificateTestimonyTextTwo, {
          x: 25,
          y: 195,
          width: textWidth,
          height: textHeight,
          size: 9,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        emblemCertificatePrinted.drawImage(emblem_logo_printed, {
          x: 320,
          y: 400,
          height: 200,
          width: 250,
        });

        emblemCertificatePrinted.drawText(further, {
          x: 310,
          y: 380,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        emblemCertificatePrinted.drawText(furtherDescription, {
          x: 310,
          y: 355,
          width: textWidth,
          height: textHeight,
          size: 9,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        emblemCertificatePrinted.drawText(Scilicet, {
          x: 310,
          y: 275,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        emblemCertificatePrinted.drawText(scilicetSubDescription, {
          x: 360,
          y: 275,
          width: textWidth,
          height: textHeight,
          size: 9,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        emblemCertificatePrinted.drawText(ScilicetDescription, {
          x: 310,
          y: 260,
          width: textWidth,
          height: textHeight,
          size: 9,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        // //SIGNED
        emblemCertificatePrinted.drawText(emblemSigned, {
          x: 150,
          y: 120,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        emblemCertificatePrinted.drawText(dateText, {
          x: 170,
          y: 80,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        emblemCertificatePrinted.drawText(dateContent, {
          x: 210,
          y: 80,
          width: textWidth,
          height: textHeight,
          size: 9,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        emblemCertificatePrinted.drawText(copyright, {
          x: 190,
          y: 70,
          width: textWidth,
          height: textHeight,
          size: 6,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        emblemCertificatePrinted.drawImage(emblem_signature_printed, {
          x: 210,
          y: 100,
          height: 50,
          width: 30,
        });

        emblemCertificatePrinted.drawImage(emblem_borders, {
          y: 0,
          width: emblemCertificatePrinted.getWidth(),
          height: 60,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  };

  const onlyTartan = async (propObject) => {
    // console.log(propObject, "===============propObject==================");
    try {
      if (propObject.p_8727183032593.variant.includes("Printed Pack")) {
        var tartanCertificatePrinted = pdfDocPrinted.addPage([595, 842]);
        var tartanCertificate = pdfDoc.addPage([595, 842]);
      } else {
        var tartanCertificate = pdfDoc.addPage([595, 842]);
      }

      const tartan_certificate_heading = `To Whomsoever These Presents Do Concern`;

      //Name Capital work

      let tartanNameParts = propObject.p_8727183032593._Name1.split(" ");
      console.log(tartanNameParts, "nameParts");
      let tartanModifiedName = tartanNameParts
        .map(
          (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        )
        .join(" ");
      console.log(tartanModifiedName, "modified name");

      //two name
      if (propObject.p_8727183032593._Title2) {
        let tartanNamePartsTwo = propObject.p_8727183032593._Name2.split(" ");
        let tartanModifiedNameTwo = tartanNamePartsTwo
          .map(
            (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
          )
          .join(" ");
        console.log(tartanModifiedNameTwo, "modified name two");
      }

      const tartanCertficateUserName = `${
        propObject.p_8727183032593._Title1
      } ${tartanModifiedName} ${propObject.p_8727183032593._Title2 ? "&" : ""}`;
      const userNametextWidth = oldEng.widthOfTextAtSize(
        tartanCertficateUserName,
        12
      );

      const halfOfWord = userNametextWidth / 2;
      const startingPosition =
        (tartanCertificate.getWidth() - userNametextWidth) / 2;
      const x = startingPosition - halfOfWord;

      const tartanCertficateUserNameTwo = `${
        propObject.p_8727183032593._Title2
          ? `${propObject.p_8727183032593._Title2} ${tartanModifiedNameTwo}`
          : ""
      }`;

      const tartanuserNameTwotextWidth = oldEng.widthOfTextAtSize(
        tartanCertficateUserNameTwo,
        12
      );

      const tartanHalfOfWordTwo = tartanuserNameTwotextWidth / 2;
      const tartanStartingPositionTwo =
        (tartanCertificate.getWidth() - tartanuserNameTwotextWidth) / 2;
      const tartanTwox = tartanStartingPositionTwo - tartanHalfOfWordTwo;
      const declare = `${
        propObject.p_8727183032593._Title2 ? "Do" : "Does"
      } Declare`;
      const Allegiance = "Clan Allegiance";
      const prey = "and Prey to Wear";

      const certified = "Certified Tartan";
      const Greeting = "Scotland Titles send Greeting";

      const tartanCertificateGreetingText = `and do declare that`;
      const tartanCertificateGreetingTextTwo = `having by petition unto us unto this day,\n\n`;

      const know = "Let It Be Known";

      const tartanCertificateknowText = `that the said by virtue of ownership`;
      const tartanCertificateknowTextTwo = `of Land in Scotland and in particular the Land within the\nKingdom of Fife by Cantsdam as described in the Disposition\nand Certificate of Sale, the ${
        propObject.p_8727183032593._Title2 ? "Petitioner are" : "Petitioner is"
      } henceforth and in\nperpetuity amongst all nobles and in all places of honour, to\nbe taken, numbered, accounted and received as a ${
        propObject.p_8727183032593._Title2 ? "Lairds" : "Laird"
      } of\nScotland,\n\n`;

      const Therefore = "Know Ye Therefore";

      const tartanCertificateThereforeText = `that the ${
        propObject.p_8727183032593._Title2 ? "Petitioners" : "Petitioner"
      } having preyed`;
      const tartanCertificateThereforeTextTwo = `that there might be granted unto them to use such Scottish\nTartan as set in law during the dress act of 1746 as repealed in\n1782 and thereinafter adopted, acknowledged and recognised\nas the symbolic National Dress of Scotland,\n\n`;

      const scotlantTiles = "Scilicet that Scotland Titles";

      const tartanCertificateScotlantTilesText = `has assigned, and do`;
      const tartanCertificateScotlantTilesTextTwo = `by these presents assign, ratify and confirm unto the ${
        propObject.p_8727183032593._Title2 ? "Petitioners" : "Petitioner"
      }\nthe following ensemble robes in such tartan as is depicted\nupon the margin sinister hereof, and award unto the\n${
        propObject.p_8727183032593._Title2 ? "Petitioners" : "Petitioner"
      } the rights to use, wear, display and earasay such\nregistered Scottish Tartan in exchange for their sworn\nallegiance to the Clan of Scotland,\n\n`;

      const Tartan = "Videlicet such Tartan";
      const tartanCertificateText = "as is official and certified as set";
      const tartanCertificateTextTwo =
        "out in the Scottish Register of Tartans act 2008 administered\nby the National Records of Scotland with advice from the\nCourt of the Lord Lyon and the Registrar General for Scotland\nacting as the Keeper of the Scottish Register of Tartans,";
      const demostration = "By demonstration of";

      const demonstrationText = " which ensemble robes the said";
      const demonstrationTextTwo = `${
        propObject.p_8727183032593._Title2 ? "Petitioner are" : "Petitioner is"
      }, amongst all nobles and in all places of honour, to\nbe received as a ${
        propObject.p_8727183032593._Title2 ? "Lairds" : "Laird"
      } of Scotland,`; //Signed content

      const tartanFurther = "Furthermore by ownership";
      const tartanFurtherDescription = "of lands in Scotland, the";
      const tartanFurtherDescriptionTwo = `${propObject.p_8727183032593._Title1}, in such display of the proscribed ensemble robes are to\nbe received with honour in all of Scotland,`;

      const tartanTestimony = "In Testimony whereof";
      const tartanTestimonyDescription = "we have subscribed these";
      const tartanTestimonyDescriptionTwo = `presents and the seal of our office is affixed hereto at Scotland\nTitles this day in this year of the reign of our sovereign Charles\nthe Third, by the Grace of God, of the United Kingdom of\nGreat Britain and Northern Ireland, King, Head of the\nCommonwealth, Defender of the Faith, and in the Year of our\n${propObject.p_8727183032593._Title1} stated henceforth.`;

      const tartanSigned = "Signed";

      const tartanBgPath = path.resolve("./public", "images", "tartan_bg.png");

      const tartanbg_Buffer = fs.readFileSync(tartanBgPath);

      const tartan_bg = await pdfDoc.embedPng(tartanbg_Buffer);

      const border = path.resolve("./public", "images", "borders.jpg");

      const border_Buffer = fs.readFileSync(border);

      const tartan_borders = await pdfDocPrinted.embedJpg(border_Buffer);

      const tartanlogoPath = path.resolve(
        "./public",
        "images",
        "tartan_logo.jpg"
      );

      const tartan_logo_Buffer = fs.readFileSync(tartanlogoPath);

      const tartan_logo = await pdfDoc.embedJpg(tartan_logo_Buffer);

      const tartan_logo_printed = await pdfDocPrinted.embedJpg(
        tartan_logo_Buffer
      );

      const tartansignPath = path.resolve(
        "./public",
        "images",
        "g_signature.png"
      );
      const tartan_signature_Buffer = fs.readFileSync(tartansignPath);

      const tartan_signature = await pdfDoc.embedPng(tartan_signature_Buffer);
      const tartan_signature_printed = await pdfDocPrinted.embedPng(
        tartan_signature_Buffer
      );

      const filePath = path.resolve("./public", "images", "scotland_log.png");

      const imgBuffer = fs.readFileSync(filePath);
      const img = await pdfDoc.embedPng(imgBuffer);
      const img_printed = await pdfDocPrinted.embedPng(imgBuffer);

      const pngDims = img.scale(0.25);

      const filePathFour = path.resolve(
        "./public",
        "images",
        "certificate-mid.png"
      );

      const imgBufferFour = fs.readFileSync(filePathFour);
      const certificateMid = await pdfDoc.embedPng(imgBufferFour);

      const certificateMidPrinted = await pdfDocPrinted.embedPng(imgBufferFour);

      const ertificateMidpngDims = certificateMid.scale(0.3);
      const filePathThree = path.resolve(
        "./public",
        "images",
        "certificate-stamp.png"
      );
      const imgBufferThree = fs.readFileSync(filePathThree);
      // console.log(imgBuffer, "imgBuffer");
      const stampImg = await pdfDoc.embedPng(imgBufferThree);
      const stampImgPrinted = await pdfDocPrinted.embedPng(imgBufferThree);

      const stampPngDims = stampImg.scale(0.3);

      if (propObject.p_8727183032593.variant.includes("Printed Pack")) {
        var textWidth = tartanCertificatePrinted.getWidth() - 100; // Adjust the width as needed
        var textHeight = tartanCertificatePrinted.getHeight() - 50;
      } else {
        var textWidth = tartanCertificate.getWidth() - 100; // Adjust the width as needed
        var textHeight = tartanCertificate.getHeight() - 50;
      }

      const dateText = "Date";

      const tartandatee = propObject.p_8727183032593._Date;
      const tartandateObj = new Date(tartandatee);
      const tartanyear = tartandateObj.getFullYear();
      const tartanmonth = String(tartandateObj.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are 0-indexed
      const tartanday = String(tartandateObj.getDate()).padStart(2, "0");
      //   const

      const monthNames = [
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER",
      ];

      const tartanmonthName = monthNames[tartandateObj.getMonth()];
      let tartandayWithSuffix;

      if (tartanday >= 11 && tartanday <= 13) {
        tartandayWithSuffix = `${tartanday}TH`;
      } else {
        switch (tartanday % 10) {
          case 1:
            tartandayWithSuffix = `${tartanday}ST`;
            break;
          case 2:
            tartandayWithSuffix = `${tartanday}ND`;
            break;
          case 3:
            tartandayWithSuffix = `${tartanday}RD`;
            break;
          default:
            tartandayWithSuffix = `${tartanday}TH`;
        }
      }
      const TartandateContent = `THIS ${tartandayWithSuffix} DAY OF ${tartanmonthName} IN THE YEAR ${tartanyear}`;
      const copyright =
        "All content, layout, artwork and illustrations copyright Scotland Titles 2021 and subject to licence";

      tartanCertificate.drawImage(tartan_bg, {
        width: tartanCertificate.getWidth(),
        height: tartanCertificate.getHeight(),
      });

      tartanCertificate.drawImage(img, {
        x: 500,
        y: 710,
        width: pngDims.width,
        height: pngDims.height,
      });

      tartanCertificate.drawImage(stampImg, {
        x: 480,
        y: 70,
        width: stampPngDims.width,
        height: stampPngDims.height,
      });

      tartanCertificate.drawText(tartan_certificate_heading, {
        x: 150,
        y: 750,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(tartanCertficateUserName, {
        x: x,
        y: 720,
        width: textWidth,
        height: textHeight,
        size: 26,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });
      tartanCertificate.drawText(tartanCertficateUserNameTwo, {
        x: tartanTwox,
        y: 690,
        width: textWidth,
        height: textHeight,
        size: 26,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(declare, {
        x: 250,
        y: propObject.p_8727183032593._Title2 ? 665 : 690,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(Allegiance, {
        x: 50,
        y: propObject.p_8727183032593._Title2 ? 640 : 660,
        size: 26,
        width: textWidth,
        height: textHeight,
        color: rgb(0.054, 0.027, 0.301),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(prey, {
        x: 230,
        y: propObject.p_8727183032593._Title2 ? 640 : 660,
        size: 18,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(certified, {
        x: 370,
        y: propObject.p_8727183032593._Title2 ? 640 : 660,
        size: 26,
        width: textWidth,
        height: textHeight,
        color: rgb(0.054, 0.027, 0.301),

        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawImage(certificateMid, {
        x: 230,
        y: propObject.p_8727183032593._Title2 ? 600 : 610,
        width: ertificateMidpngDims.width,
        height: ertificateMidpngDims.height,
      });
      tartanCertificate.drawText(Greeting, {
        x: 20,
        y: 560,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(tartanCertificateGreetingText, {
        x: 220,
        y: 560,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(tartanCertificateGreetingTextTwo, {
        x: 20,
        y: 545,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //shewen text

      tartanCertificate.drawText(know, {
        x: 20,
        y: 520,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(tartanCertificateknowText, {
        x: 143,
        y: 520,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(tartanCertificateknowTextTwo, {
        x: 20,
        y: 505,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //videlict

      tartanCertificate.drawText(Therefore, {
        x: 20,
        y: 410,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(tartanCertificateThereforeText, {
        x: 155,
        y: 410,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(tartanCertificateThereforeTextTwo, {
        x: 20,
        y: 395,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //In Testimony Whereof

      tartanCertificate.drawText(scotlantTiles, {
        x: 20,
        y: 320,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(tartanCertificateScotlantTilesText, {
        x: 208,
        y: 320,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(tartanCertificateScotlantTilesTextTwo, {
        x: 20,
        y: 305,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(Tartan, {
        x: 20,
        y: 210,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(tartanCertificateText, {
        x: 165,
        y: 210,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(tartanCertificateTextTwo, {
        x: 20,
        y: 195,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText("Royal Stewart Hunting", {
        x: 360,
        y: 570,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawImage(tartan_logo, {
        x: 330,
        y: 330,
        height: 230,
        width: 230,
      });

      tartanCertificate.drawText(demostration, {
        x: 310,
        y: 300,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(demonstrationText, {
        x: 445,
        y: 300,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(demonstrationTextTwo, {
        x: 310,
        y: 285,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(tartanTestimony, {
        x: 310,
        y: 250,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(tartanTestimonyDescription, {
        x: 460,
        y: 250,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(tartanTestimonyDescriptionTwo, {
        x: 310,
        y: 235,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      //SIGNED
      tartanCertificate.drawText(tartanSigned, {
        x: 150,
        y: 100,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(dateText, {
        x: 170,
        y: 80,
        size: 16,
        width: textWidth,
        height: textHeight,
        color: rgb(0.219, 0.337, 0.137),
        lineHeight: fontSize * 1.2,
        font: oldEng,
      });

      tartanCertificate.drawText(TartandateContent, {
        x: 210,
        y: 80,
        width: textWidth,
        height: textHeight,
        size: 10,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: tempusFont,
      });

      tartanCertificate.drawText(copyright, {
        x: 190,
        y: 70,
        width: textWidth,
        height: textHeight,
        size: 6,
        color: rgb(0, 0, 0),
        lineHeight: fontSize * 1.2,
        font: timesRomanFont,
      });

      tartanCertificate.drawImage(tartan_signature, {
        x: 210,
        y: 85,
        height: 50,
        width: 30,
      });

      //========================================== Tartan Printed Work Started ================================

      if (propObject.p_8727183032593.variant.includes("Printed Pack")) {
        tartanCertificatePrinted.drawImage(tartan_borders, {
          y: 790,
          width: tartanCertificatePrinted.getWidth(),
          height: 70,
        });

        tartanCertificatePrinted.drawImage(img_printed, {
          x: 500,
          y: 710,
          width: pngDims.width,
          height: pngDims.height,
        });

        tartanCertificatePrinted.drawImage(stampImgPrinted, {
          x: 480,
          y: 70,
          width: stampPngDims.width,
          height: stampPngDims.height,
        });

        tartanCertificatePrinted.drawText(tartan_certificate_heading, {
          x: 150,
          y: 750,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(tartanCertficateUserName, {
          x: x,
          y: 720,
          width: textWidth,
          height: textHeight,
          size: 26,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });
        tartanCertificatePrinted.drawText(tartanCertficateUserNameTwo, {
          x: tartanTwox,
          y: 690,
          width: textWidth,
          height: textHeight,
          size: 26,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(declare, {
          x: 250,
          y: propObject.p_8727183032593._Title2 ? 665 : 690,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(Allegiance, {
          x: 50,
          y: propObject.p_8727183032593._Title2 ? 640 : 660,
          size: 26,
          width: textWidth,
          height: textHeight,
          color: rgb(0.054, 0.027, 0.301),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(prey, {
          x: 230,
          y: propObject.p_8727183032593._Title2 ? 640 : 660,
          size: 18,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(certified, {
          x: 370,
          y: propObject.p_8727183032593._Title2 ? 640 : 660,
          size: 26,
          width: textWidth,
          height: textHeight,
          color: rgb(0.054, 0.027, 0.301),

          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawImage(certificateMidPrinted, {
          x: 230,
          y: propObject.p_8727183032593._Title2 ? 600 : 610,
          width: ertificateMidpngDims.width,
          height: ertificateMidpngDims.height,
        });
        tartanCertificatePrinted.drawText(Greeting, {
          x: 20,
          y: 560,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(tartanCertificateGreetingText, {
          x: 220,
          y: 560,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        tartanCertificatePrinted.drawText(tartanCertificateGreetingTextTwo, {
          x: 20,
          y: 545,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        //shewen text

        tartanCertificatePrinted.drawText(know, {
          x: 20,
          y: 520,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(tartanCertificateknowText, {
          x: 143,
          y: 520,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        tartanCertificatePrinted.drawText(tartanCertificateknowTextTwo, {
          x: 20,
          y: 505,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        //videlict

        tartanCertificatePrinted.drawText(Therefore, {
          x: 20,
          y: 410,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(tartanCertificateThereforeText, {
          x: 155,
          y: 410,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        tartanCertificatePrinted.drawText(tartanCertificateThereforeTextTwo, {
          x: 20,
          y: 395,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        //In Testimony Whereof

        tartanCertificatePrinted.drawText(scotlantTiles, {
          x: 20,
          y: 320,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(tartanCertificateScotlantTilesText, {
          x: 208,
          y: 320,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        tartanCertificatePrinted.drawText(
          tartanCertificateScotlantTilesTextTwo,
          {
            x: 20,
            y: 305,
            width: textWidth,
            height: textHeight,
            size: 10,
            color: rgb(0, 0, 0),
            lineHeight: fontSize * 1.2,
            font: tempusFontPrinted,
          }
        );

        tartanCertificatePrinted.drawText(Tartan, {
          x: 20,
          y: 210,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(tartanCertificateText, {
          x: 165,
          y: 210,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        tartanCertificatePrinted.drawText(tartanCertificateTextTwo, {
          x: 20,
          y: 195,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        tartanCertificatePrinted.drawText("Royal Stewart Hunting", {
          x: 360,
          y: 570,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawImage(tartan_logo_printed, {
          x: 330,
          y: 330,
          height: 230,
          width: 230,
        });

        tartanCertificatePrinted.drawText(demostration, {
          x: 310,
          y: 300,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(demonstrationText, {
          x: 445,
          y: 300,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        tartanCertificatePrinted.drawText(demonstrationTextTwo, {
          x: 310,
          y: 285,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        tartanCertificatePrinted.drawText(tartanTestimony, {
          x: 310,
          y: 250,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(tartanTestimonyDescription, {
          x: 460,
          y: 250,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        tartanCertificatePrinted.drawText(tartanTestimonyDescriptionTwo, {
          x: 310,
          y: 235,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        //SIGNED
        tartanCertificatePrinted.drawText(tartanSigned, {
          x: 150,
          y: 120,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(dateText, {
          x: 170,
          y: 80,
          size: 16,
          width: textWidth,
          height: textHeight,
          color: rgb(0.219, 0.337, 0.137),
          lineHeight: fontSize * 1.2,
          font: oldEngPrinted,
        });

        tartanCertificatePrinted.drawText(TartandateContent, {
          x: 210,
          y: 80,
          width: textWidth,
          height: textHeight,
          size: 10,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: tempusFontPrinted,
        });

        tartanCertificatePrinted.drawText(copyright, {
          x: 190,
          y: 70,
          width: textWidth,
          height: textHeight,
          size: 6,
          color: rgb(0, 0, 0),
          lineHeight: fontSize * 1.2,
          font: timesRomanFontPrinted,
        });

        tartanCertificatePrinted.drawImage(tartan_signature_printed, {
          x: 210,
          y: 100,
          height: 50,
          width: 30,
        });

        tartanCertificatePrinted.drawImage(tartan_borders, {
          y: 0,
          width: tartanCertificatePrinted.getWidth(),
          height: 60,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  };

  var size;
  let type;
  let typeTwo;

  if (email && req.body.line_items.length > 0) {
    try {
      let pId = [];
      let pProperties = {};
      let i = 1;
      var k = 1;
      var titleId = 1;
      var emblemPackId = 1;
      var tartanPackId = 1;
      var freeTartanPackId = 1;
      var freeEmblemPackId = 1;

      req.body.line_items.map((item, index) => {
        console.log(item, "itemitem");
        if (item.product_id == titlePackId) {
          pId.push(item.product_id);
          var word = item.variant_title.split(" ");
          type = word[2];
          typeTwo = word[3];
          size = word[0];

          pProperties["p_" + `${item.product_id}_${titleId}`] = {
            variant_title: item.variant_title,
            properties: item.properties,
            quantity: item.quantity,
          };
          titleId++;
        } else if (item.product_id == emblemId) {
          pId.push(item.product_id);
          var word = item.variant_title.split(" ");
          type = word[2];
          typeTwo = word[3];
          size = word[0];

          pProperties["p_" + `${item.product_id}_${emblemPackId}`] = {
            variant_title: item.variant_title,
            properties: item.properties,
            quantity: item.quantity,
          };
          emblemPackId++;
        } else if (item.product_id == tartanId) {
          console.log(tartanPackId, "tartanPackId");
          pId.push(item.product_id);
          var word = item.variant_title.split(" ");
          type = word[2];

          pProperties["p_" + `${item.product_id}_${tartanPackId}`] = {
            variant_title: item.variant_title,
            properties: item.properties,
            quantity: item.quantity,
          };
          tartanPackId++;
        } else if (item.product_id == freeTartanId) {
          console.log("free tartan id heree");
          pId.push(item.product_id);
          var word = item.variant_title.split(" ");
          type = word[2];
          typeTwo = word[3];
          size = word[0];
          pProperties["p_" + `${item.product_id}_${freeTartanPackId}`] = {
            variant_title: item.variant_title,
            properties: item.properties,
          };

          freeTartanPackId++;
        } else if (item.product_id == freeEmblemId) {
          pId.push(item.product_id);
          var word = item.variant_title.split(" ");
          type = word[2];
          typeTwo = word[3];
          size = word[0];
          pProperties["p_" + `${item.product_id}_${freeEmblemPackId}`] = {
            variant_title: item.variant_title,
            properties: item.properties,
          };

          freeEmblemPackId++;
        }
      });
      let ko = Object.keys(pProperties);
      ko.map((a) => console.log(pProperties[a]));
      const specificId = freeTartanId;
      const specificIdTitlePack = titlePackId;
      const specificIdfreeEmblemPack = freeEmblemId;
      const specificIdCountTitle = pId.filter(
        (id) => id === specificIdTitlePack
      ).length;

      const specificIdCountFreeEmblem = pId.filter(
        (id) => id === specificIdfreeEmblemPack
      ).length;

      const specificIdCount = pId.filter((id) => id === specificId).length;

      var titleIncrement = 1;
      var embelemIncrement = 1;
      var tartanIncrement = 1;
      var freeTartanIncrement = 1;
      var freeEmblemIncrement = 1;

      for (const productId of pId) {
        if (productId == titlePackId) {
          // let j;

          let resultObjectTitlePack = {};
          let namesArrayTitlePacks = "";

          if (pProperties[`p_8727183196433_${titleIncrement}`].properties) {
            namesArrayTitlePacks = pProperties[
              `p_8727183196433_${titleIncrement}`
            ].properties.map((propItem, index) => propItem.name);
            for (const obj of pProperties[`p_8727183196433_${titleIncrement}`]
              .properties) {
              // console.log(obj, "objobj");
              resultObjectTitlePack[obj.name] = obj.value;
            }
          }
          // size = word[0];
          console.log(size, "alllll  size");

          if (!namesArrayTitlePacks.includes("_Title2")) {
            const propertiesObj = {
              p_8727183196433: {
                _Title1: resultObjectTitlePack._Title1,
                _Name1: resultObjectTitlePack._Name1,
                _Date: resultObjectTitlePack._Date,
                variant:
                  pProperties[`p_8727183196433_${titleIncrement}`]
                    .variant_title,
                size: size,
                reference: specificIdCountTitle == 1 ? 0 : i++,
              },
            };
            console.log(propertiesObj);
            console.log("propertiesObj");
            titlePack(propertiesObj);
          } else {
            // console.log("inside else");

            const propertiesObj = {
              p_8727183196433: {
                _Title1: resultObjectTitlePack._Title1,
                _Name1: resultObjectTitlePack._Name1,
                _Title2: resultObjectTitlePack._Title2,
                _Name2: resultObjectTitlePack._Name2,
                variant:
                  pProperties[`p_8727183196433_${titleIncrement}`]
                    .variant_title,

                _Date: resultObjectTitlePack._Date,

                size: size,
                reference: specificIdCountTitle == 1 ? 0 : i++,

                // reference: i++,
              },
            };

            titlePack(propertiesObj);
          }
          titleIncrement++;
          // }
        } else if (productId == emblemId) {
          for (
            let i = 0;
            i < pProperties[`p_8727183065361_${embelemIncrement}`].quantity;
            i++
          ) {
            let resultObjectEmblum = {};
            let namesArrayEmblum = "";

            if (pProperties[`p_8727183065361_${embelemIncrement}`].properties) {
              namesArrayEmblum = pProperties[
                `p_8727183065361_${embelemIncrement}`
              ].properties.map((propItem, index) => propItem.name);
              for (const obj of pProperties[
                `p_8727183065361_${embelemIncrement}`
              ].properties) {
                resultObjectEmblum[obj.name] = obj.value;
              }
            }

            if (!namesArrayEmblum.includes("_Title2")) {
              console.log("in name array emblum");
              const propertiesObj = {
                p_8727183065361: {
                  _Title1: resultObjectEmblum._Title1,
                  _Name1: resultObjectEmblum._Name1,
                  _Date: resultObjectEmblum._Date,
                  variant:
                    pProperties[`p_8727183065361_${embelemIncrement}`]
                      .variant_title,
                },
              };
              onlyEmblem(propertiesObj);
            } else {
              const propertiesObj = {
                p_8727183065361: {
                  _Title1: resultObjectEmblum._Title1,
                  _Name1: resultObjectEmblum._Name1,
                  _Title2: resultObjectEmblum._Title2,
                  _Name2: resultObjectEmblum._name2,
                  _Date: resultObjectEmblum._Date,
                  variant:
                    pProperties[`p_8727183065361_${embelemIncrement}`]
                      .variant_title,
                },
              };
              onlyEmblem(propertiesObj);
            }
          }
          embelemIncrement++;
        } else if (productId == tartanId) {
          for (
            let i = 0;
            i < pProperties[`p_8727183032593_${tartanIncrement}`].quantity;
            i++
          ) {
            let resultObjectTatran = {};
            let namesArrayTatran = "";

            if (pProperties[`p_8727183032593_${tartanIncrement}`].properties) {
              namesArrayTatran = pProperties[
                `p_8727183032593_${tartanIncrement}`
              ].properties.map((propItem, index) => propItem.name);
              for (const obj of pProperties[
                `p_8727183032593_${tartanIncrement}`
              ].properties) {
                resultObjectTatran[obj.name] = obj.value;
              }
            }

            if (
              !namesArrayTatran.includes("_Title2") // resultObjectTitlePack._Title1 == "Lord" &&
            ) {
              const propertiesObj = {
                p_8727183032593: {
                  _Title1: resultObjectTatran._Title1,
                  _Name1: resultObjectTatran._name1,
                  _Date: resultObjectTatran._Date,
                  variant:
                    pProperties[`p_8727183032593_${tartanIncrement}`]
                      .variant_title,
                },
              };
              onlyTartan(propertiesObj);
            } else {
              const propertiesObj = {
                p_8727183032593: {
                  _Title1: resultObjectTatran._Title1,
                  _Name1: resultObjectTatran._name1,
                  _Title2: resultObjectTatran._Title2,
                  _Name2: resultObjectTatran._name2,
                  _Date: resultObjectTatran._Date,
                  variant:
                    pProperties[`p_8727183032593_${tartanIncrement}`]
                      .variant_title,
                },
              };
              console.log(propertiesObj, "all properties");
              onlyTartan(propertiesObj);
            }
          }
          tartanIncrement++;
        } else if (productId == freeTartanId) {
          // for (let j = 0; j < item.quantity; j++) {
          let resultObjectTitleFreePack = {};
          let namesArrayTitleFreePacks = "";

          if (
            pProperties[`p_8727182704913_${freeTartanIncrement}`].properties
          ) {
            namesArrayTitleFreePacks = pProperties[
              `p_8727182704913_${freeTartanIncrement}`
            ].properties.map((propItem, index) => propItem.name);
            for (const obj of pProperties[
              `p_8727182704913_${freeTartanIncrement}`
            ].properties) {
              // console.log(obj, "objobj");
              resultObjectTitleFreePack[obj.name] = obj.value;
            }
          }

          if (!namesArrayTitleFreePacks.includes("_Title2")) {
            const propertiesObj = {
              p_8727182704913: {
                _Title1: resultObjectTitleFreePack._Title1,
                _Name1: resultObjectTitleFreePack._Name1,
                _Date: resultObjectTitleFreePack._Date,
                variant:
                  pProperties[`p_8727182704913_${freeTartanIncrement}`]
                    .variant_title,
                size: size,
                reference: specificIdCount == 1 ? 0 : i++,
              },
            };

            console.log(propertiesObj, "propertiesObj propertiesObj");
            titlePackWithFreeTartan(propertiesObj);
          } else {
            const propertiesObj = {
              p_8727182704913: {
                _Title1: resultObjectTitleFreePack._Title1,
                _Name1: resultObjectTitleFreePack._Name1,
                _Title2: resultObjectTitleFreePack._Title2,
                _Name2: resultObjectTitleFreePack._Name2,
                variant:
                  pProperties[`p_8727182704913_${freeTartanIncrement}`]
                    .variant_title,

                _Date: resultObjectTitleFreePack._Date,

                size: size,
                reference: specificIdCount == 1 ? 0 : i++,
              },
            };
            console.log(
              propertiesObj,
              "propertiesObj propertiesObj double= ===="
            );
            titlePackWithFreeTartan(propertiesObj);
          }
          // }
          freeTartanIncrement++;
        } else if (productId == freeEmblemId) {
          // for (let j = 0; j < item.quantity; j++) {
          let resultObjectTitleFreeEmblemPack = {};
          let namesArrayTitleFreeEmblemPacks = "";

          if (
            pProperties[`p_8950348644625_${freeEmblemIncrement}`].properties
          ) {
            namesArrayTitleFreeEmblemPacks = pProperties[
              `p_8950348644625_${freeEmblemIncrement}`
            ].properties.map((propItem, index) => propItem.name);
            for (const obj of pProperties[
              `p_8950348644625_${freeEmblemIncrement}`
            ].properties) {
              // console.log(obj, "objobj");
              resultObjectTitleFreeEmblemPack[obj.name] = obj.value;
            }
          }

          if (!namesArrayTitleFreeEmblemPacks.includes("_Title2")) {
            const propertiesObj = {
              p_8950348644625: {
                _Title1: resultObjectTitleFreeEmblemPack._Title1,
                _Name1: resultObjectTitleFreeEmblemPack._Name1,
                _Date: resultObjectTitleFreeEmblemPack._Date,
                variant:
                  pProperties[`p_8950348644625_${freeEmblemIncrement}`]
                    .variant_title,
                size: size,
                reference: specificIdCountFreeEmblem == 1 ? 0 : i++,
              },
            };

            console.log(propertiesObj, "propertiesObj propertiesObj");
            titlePackWithFreeEmblem(propertiesObj);
          } else {
            const propertiesObj = {
              p_8950348644625: {
                _Title1: resultObjectTitleFreeEmblemPack._Title1,
                _Name1: resultObjectTitleFreeEmblemPack._Name1,
                _Title2: resultObjectTitleFreeEmblemPack._Title2,
                _Name2: resultObjectTitleFreeEmblemPack._Name2,
                variant:
                  pProperties[`p_8950348644625_${freeEmblemIncrement}`]
                    .variant_title,

                _Date: resultObjectTitleFreeEmblemPack._Date,

                size: size,
                reference: specificIdCountFreeEmblem == 1 ? 0 : i++,
              },
            };
            console.log(
              specificIdCountFreeEmblem,
              " console.log(specificIdCount)"
            );
            console.log(
              propertiesObj,
              "propertiesObj propertiesObj double= ===="
            );
            titlePackWithFreeEmblem(propertiesObj);
          }
          // }
          freeEmblemIncrement++;
        }
      }
      const pdfBytes = await pdfDoc.save();

      const pdfStream = new Readable();

      pdfStream.push(pdfBytes);
      pdfStream.push(null); // End of stream

      const remotePath = `/pdfs/${order_number}.pdf`;
      await client.uploadFrom(pdfStream, remotePath);
      const pageCount = pdfDocPrinted.getPageCount();

      if (pageCount == 0) {
        client.close();
      }
      const pdfUrl = `https://scotlandtitlesapp.com/pdfs/${order_number}.pdf`;

      console.log(pdfUrl, "pdfUrl");

      //for printed page
      console.log(pageCount, "pageCount");
      if (pageCount > 0) {
        const pdfPrintedBytes = await pdfDocPrinted.save();

        const pdfPrintedStream = new Readable();

        pdfPrintedStream.push(pdfPrintedBytes);
        pdfPrintedStream.push(null); // End of stream

        const remotePrintedPath = `/pdfs/${order_number}-printed.pdf`;
        await client.uploadFrom(pdfPrintedStream, remotePrintedPath);

        client.close();

        const pdfPrintedUrl = `https://scotlandtitlesapp.com/pdfs/${order_number}-printed.pdf`;
        console.log(pdfPrintedUrl, "pdfPrintedUrl");
      }

      return res.status(200).send({ data: "success pdf" });
    } catch (error) {
      console.log(error, "catch error final");
      return res.status(500).send({ message: "error" });
    }
  } else {
    console.log("error found ------------");
    return res.status(500).send({ message: "error" });
  }
  return;
}
