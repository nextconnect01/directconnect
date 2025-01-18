import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import dbConnect from "./db/db.js";
import userRouter from "./routes/user.router.js";
import blogRouter from "./routes/blog.routes.js";
import passport from "passport";
import session from "express-session";
import "./auth/google.js"
import googleAuthRouter from "./routes/auth.routes.js"
const app = express()

dotenv.config({})

app.get("/home",(req,res) => {
    return res.status(200).json({
        message : "I am coming home",
        success : true
    })
})
app.use(express.json()) 
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

const corsOption = {
    origin : 'http://localhost:5173',
    credentials : true
}

app.use(cors(corsOption))

app.use(
    session({
        secret : process.env.SESSION_SECRET,
        resave : false,
        saveUninitialized : false,
        cookie : {
            secure : false,
            httpOnly : true,
            maxAge : 24*60*60*1000 // 1 day  
        }
    })
)

//Passport.js middleware
app.use(passport.initialize())
app.use(passport.session())

app.use("/api/v1/user",userRouter)
app.use("/api/v1/blog",blogRouter)
app.use("/api/v1/auth",googleAuthRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    dbConnect()
    console.log(`Server is running on port ${PORT}`);
})