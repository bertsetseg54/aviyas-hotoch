import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("school_db"); // Баазын нэр: school_db
    const collection = db.collection("map_images"); // Коллекцийн нэр: map_images

    // 1. Зургийн мэдээлэл татах
    if (req.method === "GET") {
      const mapData = await collection.findOne({ mapId: "main_map" });
      // Хэрэв дата байхгүй бол хоосон объект буцаана
      return res.status(200).json(mapData || { url: "" });
    }

    // 2. Зургийн мэдээлэл хадгалах эсвэл шинэчлэх
    if (req.method === "POST") {
      const { url } = req.body;
      
      if (!url) {
        return res.status(400).json({ error: "Зургийн URL хоосон байна" });
      }

      // mapId: "main_map" гэсэн ганц өгөгдөл дээр байнга шинэчилнэ
      const result = await collection.updateOne(
        { mapId: "main_map" },
        { 
          $set: { 
            url: url, 
            updatedAt: new Date() 
          } 
        },
        { upsert: true } // Энэ маш чухал: Байхгүй бол шинээр үүсгэнэ
      );

      return res.status(200).json({ success: true, result });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("MAP API ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}