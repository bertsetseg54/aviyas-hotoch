import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Зөвхөн POST хүсэлт зөвшөөрнө" });
  }

  try {
    const { username, password } = req.body;
    const client = await clientPromise;
    const db = client.db("school_db"); 

    // Хэрэглэгчийг хайх
    const user = await db.collection("users").findOne({ 
      username: username, 
      password: String(password) 
    });

    if (user) {
      // Нууц үгийг хасаад бусад мэдээллийг буцаах
      return res.status(200).json({
        fullname: user.fullname,
        role: user.role,
        username: user.username,
        success: true
      });
    } else {
      return res.status(401).json({ message: "Нэр эсвэл нууц үг буруу байна." });
    }
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ 
      message: "Баазтай холбогдож чадсангүй", 
      details: error.message 
    });
  }
}