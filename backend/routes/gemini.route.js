import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config({});

const router = express.Router();

router.route("/gemini").post(isAuthenticated, async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const {prompt} = req.body

    if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({
          success: false,
          message: "Invalid prompt. Please send a string.",
        });
      }

    const result = await model.generateContent(prompt);
    return res.status(200).json({
        message : "Data Recieved",
        success : true,
        result: result.response.text()
    })
  } catch (error) {
    console.log(error);
  }
});

export default router