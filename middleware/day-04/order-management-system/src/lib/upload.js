import cloudinary from "./cloudinary.js";

export const uploadBase64Image = async (base64Data, folder = 'Tigren') => {
  try {
    const res = await cloudinary.uploader.upload(base64Data, { folder });
    return res.secure_url;
  } catch (error) {
    console.error(error);
    throw new Error("Image upload failed");
  }
};