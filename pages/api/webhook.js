export default function handler(req, res) {
  if (req.method === "POST") {
    // Handle Farcaster webhook events (notifications, etc.)
    const { event, data } = req.body || {};
    console.log("Farcaster webhook:", event, data);
    return res.status(200).json({ success: true });
  }
  return res.status(405).json({ error: "Method not allowed" });
}
