import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url) {
    return res.status(400).send({ message: 'URL required' });
  }

  try {
    const response = await axios.head(url, { timeout: 5000 });
    return res.status(200).send({ exists: response.status === 200 });
  } catch (error) {
    // If 404 or any error, PDF doesn't exist
    return res.status(200).send({ exists: false });
  }
}
