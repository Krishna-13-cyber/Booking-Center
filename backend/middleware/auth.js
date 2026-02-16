import jwt from "jsonwebtoken";

export const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  const extractedToken = authHeader.split(" ")[1];

  if (!extractedToken || extractedToken.trim() === "") {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    const decrypted = jwt.verify(extractedToken, process.env.JWT_SECRET);
    req.adminId = decrypted.id;
    return next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
