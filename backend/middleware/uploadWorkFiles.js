import multer from "multer";
const storage = multer.memoryStorage()
export const uploadWorkFiles = multer({storage}).array("files",10)