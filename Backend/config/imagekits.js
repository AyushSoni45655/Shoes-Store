import ImageKit from "imagekit";
import dotenv from 'dotenv';
dotenv.config();
const imagekitt = new ImageKit({
  urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey:process.env.IMAGEKIT_PRIVATE_KEY
});

export default imagekitt;