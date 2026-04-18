import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("school_db"); 

    // --- 1. ШИНЭ ХЭРЭГЛЭГЧ БҮРТГЭХ (POST) ---
    if (req.method === "POST") {
      const { username, password, role, fullname } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: "Нэр болон нууц үг заавал байх ёстой" });
      }

      const existingUser = await db.collection("users").findOne({ username });
      if (existingUser) {
        return res.status(409).json({ error: "Энэ хэрэглэгчийн нэр бүртгэгдсэн байна" });
      }

      const newUser = {
        username,
        password: String(password),
        role: role || "user",
        fullname: fullname || "",
        createdAt: new Date()
      };

      const result = await db.collection("users").insertOne(newUser);
      return res.status(201).json({ success: true, id: result.insertedId });
    } 
    
    // --- 2. БҮХ ХЭРЭГЛЭГЧДИЙГ ХАРАХ (GET) ---
    if (req.method === "GET") {
      const users = await db.collection("users")
        .find({})
        .project({ password: 0 }) 
        .toArray();
      return res.status(200).json(users);
    }
    
    return res.status(405).json({ message: "Method not allowed" });

  } catch (e) {
    console.error("User API Error:", e);
    return res.status(500).json({ 
      error: "Баазтай холбогдож чадсангүй", 
      message: e.message 
    });
  }
}