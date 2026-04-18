import cloudinary from "@/lib/cloudinary";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const fileStr = req.body.data;
    
    // Cloudinary руу хуулах
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'ml_default', // Энийг Cloudinary Settings дээрх нэрээрээ сольно
    });

    res.status(200).json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.error("Cloudinary Error:", error);
    res.status(500).json({ error: error.message || 'Зураг хуулахад алдаа гарлаа' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};