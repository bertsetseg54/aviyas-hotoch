import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("school_db");
    const collection = db.collection("staff");

    const { method } = req;

    switch (method) {
      case "GET":
        const data = await collection.find({}).toArray();
        return res.status(200).json(data);

      case "POST":
        // Хоосон дата орохоос сэргийлэх
        if (!req.body.name) return res.status(400).json({ error: "Мэдээлэл дутуу" });
        const result = await collection.insertOne(req.body);
        return res.status(201).json(result);

      case "PUT":
        const { _id, ...updateData } = req.body;
        if (!_id || !ObjectId.isValid(_id)) {
          return res.status(400).json({ error: "Буруу ID" });
        }
        // MongoDB үндсэн ID-г update хийхийг зөвшөөрдөггүй тул updateData-аас _id-г хасна
        delete updateData._id; 

        await collection.updateOne(
          { _id: new ObjectId(_id) },
          { $set: updateData }
        );
        return res.status(200).json({ message: "Амжилттай" });

      case "DELETE":
        const { id } = req.query;
        if (!id || !ObjectId.isValid(id)) {
          return res.status(400).json({ error: "Буруу ID" });
        }
        await collection.deleteOne({ _id: new ObjectId(id) });
        return res.status(200).json({ message: "Устгагдлаа" });

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    // Консол дээр алдааг харах боловч хэрэглэгчид ерөнхий мэдээлэл өгнө
    return res.status(500).json({ error: "Серверийн алдаа гарлаа" });
  }
}