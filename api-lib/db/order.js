export async function insertOrderData(db, { orderId, status }) {
  console.log("orderId", orderId);
  console.log("status", status);

  const orderData = {
    orderId: orderId,
    status,
  };
  const order = await db.collection("totalOrders").insertOne(orderData);
  return order;
}
