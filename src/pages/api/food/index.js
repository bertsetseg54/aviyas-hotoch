import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("school_db");
    const collection = db.collection("foods");

    if (req.method === "GET") {
      // Датаг эрэмбэлж авах (Week 1 -> 4, Day 1 -> 5)
      const data = await collection.find({}).sort({ week: 1, day: 1 }).toArray();
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const { week, day, foods, description, image } = req.body;

      const updateData = {
        week: Number(week),
        day: Number(day),
        name: Array.isArray(foods) ? foods : ["", "", "", ""], 
        description: description || "",
        foodPic: image || "",
        updatedAt: new Date()
      };

      await collection.updateOne(
        { week: Number(week), day: Number(day) },
        { $set: updateData },
        { upsert: true }
      );

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}