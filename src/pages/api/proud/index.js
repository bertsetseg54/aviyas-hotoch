import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("school_db");
    const collection = db.collection("prouds");

    const { method } = req;

    switch (method) {
      case "GET":
        const data = await collection.find({}).sort({ date: -1 }).toArray();
        return res.status(200).json(data);

      case "POST":
        const result = await collection.insertOne(req.body);
        return res.status(201).json(result);

      case "PUT":
        const { _id, ...updateData } = req.body;
        await collection.updateOne(
          { _id: new ObjectId(_id) },
          { $set: updateData }
        );
        return res.status(200).json({ success: true });

      case "DELETE":
        const { id } = req.query;
        await collection.deleteOne({ _id: new ObjectId(id) });
        return res.status(200).json({ success: true });

      default:
        return res.status(405).end();
    }
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
}