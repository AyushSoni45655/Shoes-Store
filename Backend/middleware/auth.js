import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();




export const userAdminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};




const userAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // lowercase

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, msg: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Save user info in req.user for later use
    req.user = decoded; 

    next();
  } catch (error) {
    return res.status(401).json({ success: false, msg: "Invalid or expired token" });
  }
};




export default userAuth;