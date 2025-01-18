import multer from "multer"

const storage = multer.memoryStorage()

export const multiUpload = multer({storage}).fields([
    {name : "profilePhoto",maxCount : 1},
    {name : "resume", maxCount : 1},
    {name : "blogPhoto",maxCount : 1}
])