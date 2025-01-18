import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    // JWT-based authentication
    const token = req.cookies.token;
    if (token) {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      req.id = decodedToken.userId; // Attach userId for JWT users
      return next();
    }

    // Session-based authentication (Passport.js)
    if (req.isAuthenticated()) {
      req.id = req.user._id; // Attach userId for session users
      return next();
    }

    // If neither JWT nor session authentication succeeds
    return res.status(401).json({
      message: "User Not Authenticated (Token or Session missing)",
      success: false,
    });
  } catch (error) {
    console.error("Authentication Error:", error.message);
    return res.status(401).json({
      message: "Invalid or Expired Token",
      success: false,
    });
  }
};

export { isAuthenticated };
