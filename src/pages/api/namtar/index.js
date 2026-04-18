import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("school_db");
    const collection = db.collection("namtar");

    if (req.method === "GET") {
      const data = await collection.findOne({});
      return res.status(200).json(data || { timeline: [], stats: [], slogan: "" });
    }

    if (req.method === "POST") {
      console.log("Хүлээж авсан өгөгдөл:", req.body); // Терминал дээр харна
      
      const { _id, ...updateData } = req.body;
      
      // Upsert: true нь хэрэв дата байхгүй бол шинээр үүсгэнэ, байвал шинэчилнэ
      const result = await collection.updateOne(
        {}, 
        { $set: updateData }, 
        { upsert: true }
      );
      
      return res.status(200).json({ success: true, result });
    }
  } catch (error) {
    console.error("API Алдаа:", error);
    return res.status(500).json({ error: error.message });
  }
}