import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("school_db");
    const collection = db.collection("introduction");

    if (req.method === "GET") {
      const data = await collection.findOne({ type: "mendchilgee" });
      return res.status(200).json(data || {});
    }

    if (req.method === "POST") {
      const { name, role, content, image } = req.body;
      await collection.updateOne(
        { type: "mendchilgee" },
        { $set: { name, role, content, image, type: "mendchilgee", updatedAt: new Date() } },
        { upsert: true }
      );
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}