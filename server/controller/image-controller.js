const url = "http://localhost:8000";
import grid from "gridfs-stream";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";

let gfs, gridfsBucket;
const conn = mongoose.connection;

conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  }); 
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

export const uploadFile = async (request, response) => {
  if (!request.file) {
    return response.status(404).json("file not found");
  }

  const imageUrl = `${url}/file/${request.file.filename}`;
  return response.status(200).json(imageUrl);
};

export const getImage = async (request, response) => {
  try {
    const file = await gfs.files.findOne({ filename: request.params.filename });

    if (!file) {
      return response.status(404).json({ msg: "File not found" });
    }

    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(response);
  } catch (error) {
    response.status(500).json({ msg: error.message });
  }
};
///////////////////////////////


// 1. Multer + GridFsStorage setup
// import multer from 'multer';
// import { GridFsStorage } from 'multer-gridfs-storage';


// 👉 You’re telling Multer to use MongoDB GridFS as the storage engine.

// Multer parses the incoming multipart/form-data.

// Instead of saving files to local disk, it saves them directly into MongoDB’s GridFS.

// 🔹 2. DB Credentials
// const USERNAME = process.env.DB_USERNAME;
// const PASSWORD = process.env.DB_PASSWORD;


// 👉 Pulled from .env. Example console log:

// ✅ DB Username: myUser
// ✅ DB Password: ********

// 🔹 3. Storage Config
// const storage = new GridFsStorage({
//     url: `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.dfjmu3d.mongodb.net/whatsapp?retryWrites=true&w=majority`,
//     file: (request, file) => {
//         const match = ["image/png", "image/jpg"];

//         if (match.indexOf(file.mimetype) === -1) {
//             return `${Date.now()}-file-${file.originalname}`
//         }
//         return {
//             bucketName: "photos",
//             filename: `${Date.now()}-file-${file.originalname}`
//         }
//     }
// });

// Console scenario:

// If user uploads a .png:

// 📂 Uploading to bucket: photos
// 📄 File saved as: 1694359394000-file-avatar.png


// If user uploads a PDF (not in match list):

// 📂 Uploading to default bucket: fs
// 📄 File saved as: 1694359394000-file-resume.pdf

// 🔹 4. Export Multer middleware
// export default multer({ storage });


// 👉 This creates upload.single("file") middleware. Console:

// ⚙️ Multer middleware initialized with GridFS storage

// 🔹 5. Route for Upload
// route.post('/file/upload', upload.single("file"), uploadFile);


// 👉 When frontend posts /file/upload with file field:

// Multer parses request.

// File gets streamed into MongoDB GridFS bucket.

// uploadFile controller runs after that.

// Console when a request comes:

// ⬆️ Incoming POST /file/upload
// 📦 File received: profile.png
// ✅ Stored in MongoDB GridFS

// 🔹 6. GridFSBucket Initialization
// conn.once("open", () => {
//   gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
//     bucketName: "fs",
//   }); 
//   gfs = grid(conn.db, mongoose.mongo);
//   gfs.collection("fs");
// });


// 👉 This sets up a GridFS bucket (fs.chunks + fs.files collections).

// Default bucket name is "fs", unless overridden.

// Later you can gridfsBucket.openDownloadStream(fileId) to serve files.

// Console when DB connects:

// ✅ MongoDB connection opened
// 📂 GridFS bucket initialized: fs
// 📂 Collections available: fs.files, fs.chunks

// 🔹 End-to-end Console Flow (example upload of avatar.png)
// ✅ DB Username: myUser
// ⚙️ Multer middleware initialized with GridFS storage
// ✅ MongoDB connection opened
// 📂 GridFS bucket initialized: fs

// ⬆️ Incoming POST /file/upload
// 📦 File received: avatar.png
// 📂 Uploading to bucket: photos
// 📄 File saved as: 1694359394000-file-avatar.png
// ✅ Stored in MongoDB GridFS


// ⚡ In short, your code:

// Connects Multer to MongoDB GridFS.

// Decides bucket/filename based on file.mimetype.

// Stores file chunks into MongoDB under photos or fs.

// Exposes /file/upload route to accept files.

// Initializes a GridFS bucket for later retrieval.