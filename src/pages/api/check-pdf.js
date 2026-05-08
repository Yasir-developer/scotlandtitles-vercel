import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Method not allowed' });
  }
  console.log('Received request to check PDF', req.body);
  const { url, order_number, type = 'digital', month } = req.body;
  let pdfUrl = url;

  if (!pdfUrl) {
    console.log('No pdf Url', pdfUrl);

    if (!order_number || !month) {
      return res.status(400).send({ message: 'order_number, month, or url required' });
    }
    
    const suffix = type === 'printed' ? '-printed' : '';
    pdfUrl = `https://app.scotlandtitlesapp.com/pdfs/${month}/${order_number}${suffix}.pdf`;
    console.log('new PDF url', pdfUrl);
  }

  try {
    console.log(`Checking PDF existence at ${pdfUrl}`);
    const response = await axios.head(pdfUrl, { timeout: 5000 });
    return res.status(200).send({ exists: response.status >= 200 && response.status < 300, url: pdfUrl, resp: response });
  } catch (error) {
    // If 404 or any error, PDF doesn't exist
    console.error(`Error checking PDF at ${pdfUrl}:`, error.response);
    return res.status(200).send({ exists: false, url: pdfUrl , resp: error.response});
  }
}
