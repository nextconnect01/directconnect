import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    // JWT-based authentication
    const token = req.cookies.token;
    if (token) {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      req.id = decodedToken.userId; // Attach userId for JWT users
      console.log(req.id);
      
      return next();
    }

    // Session-based authentication (Passport.js)
    if (req.isAuthenticated && req.isAuthenticated()) {
      req.id = req.user._id; // Attach userId for session users
      return next();
    }

    // If not authenticated, allow request to proceed without blocking it
    req.id = null; 
    next(); 
  } catch (error) {
    console.error("Authentication Error:", error.message);
    req.id = null;
    next(); 
  }
};

export { isAuthenticated };
