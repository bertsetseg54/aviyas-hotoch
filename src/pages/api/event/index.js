import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("school_db");
    const collection = db.collection("events");

    if (req.method === "GET") {
      const data = await collection.find({}).sort({ date: -1 }).toArray(); // Шинэ нь дээрээ
      return res.status(200).json(data || []);
    }

    if (req.method === "POST") {
      const { _id, ...eventData } = req.body;
      if (_id) {
        await collection.updateOne({ _id: new ObjectId(_id) }, { $set: eventData });
      } else {
        await collection.insertOne({ ...eventData, createdAt: new Date() });
      }
      return res.status(200).json({ success: true });
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      await collection.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}