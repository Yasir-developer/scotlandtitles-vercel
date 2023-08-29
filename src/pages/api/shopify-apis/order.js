export default async function handler(req, res) {
  console.log("req.body", req.body);
  //   res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=30"); // set caching header

  return res.status(200);
}
