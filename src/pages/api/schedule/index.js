import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("school_db");
  const collection = db.collection("classes");

  if (req.method === "GET") {
    const data = await collection.find({}).toArray();
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const { _id, ...updateData } = req.body;
    if (_id) {
      await collection.updateOne({ _id: new ObjectId(_id) }, { $set: updateData });
    } else {
      await collection.insertOne(updateData);
    }
    return res.status(200).json({ success: true });
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    await collection.deleteOne({ _id: new ObjectId(id) });
    return res.status(200).json({ success: true });
  }
}