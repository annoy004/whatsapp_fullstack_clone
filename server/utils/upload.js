// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.
import multer from 'multer';
import{GridFsStorage} from 'multer-gridfs-storage';
import dotenv from 'dotenv';
dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url: `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.dfjmu3d.mongodb.net/whatsapp?retryWrites=true&w=majority`,
    file:(request ,file) => {
        const match = ["image/png", "image/jpg"];

        if (match.indexOf(file.mimetype) === -1) {
            return `${Date.now()}-file-${file.originalname}`
        }
        return{
            bucketName:"photos",
            filename:`${Date.now()}-file-${file.originalname}`
        }
    }
});
export default multer({storage});