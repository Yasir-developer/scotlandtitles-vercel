import connectToDatabase from "../../../../db";

export default async function handler(req, res) {
  const db = await connectToDatabase();

  const shop = process.env.SHOP_NAME;
  console.log(shop);
  const client_id = process.env.CLIENT_ID;

  if (!shop) {
    return res
      .status(400)
      .send(
        "Missing shop parameter. Please add SHOP_NAME=your-shop-name.myshopify.com to your env file."
      );
  }
  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${client_id}&scope=read_products,write_products,read_themes,write_themes,read_orders,write_orders,read_checkouts,write_checkouts,read_content,write_content,read_customers,write_customers&redirect_uri=https://${process.env.APP_URL}/api/auth/callback`;
  //   console.log(installUrl);
  //   res.status(200).json({ message: installUrl });
  res.redirect(installUrl);
}
