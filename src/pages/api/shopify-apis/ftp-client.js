// // const Client = require("ftp-client");
// const ftp = require("basic-ftp");

// // OR
// // const sftp = require('ssh2-sftp-client');

// const generateAndUploadPDF = async () => {
//   try {
//     const client = new ftp.Client();

//     await client.access({
//       host: "92.205.12.5",
//       port: 21, // FTP port
//       user: "yasir-ftp@scotlandtitlesapp.com",
//       password: "hP2PTSSotW!I",
//     });

//     console.log(client);
//     // Path to the remote directory and file name
//     //   const remotePath = '/path/to/remote/directory/filename.pdf';

//     //   await client.uploadFrom(pdfBytes, remotePath);
//     client.close();

//     console.log("PDF uploaded successfully");
//   } catch (error) {
//     console.error("Error uploading PDF:", error);
//   }
// };

// export default generateAndUploadPDF;
// generateAndUploadPDF();
