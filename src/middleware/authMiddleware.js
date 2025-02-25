import jwt from "jsonwebtoken";


const authenticate = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access Denied: No Token Provided" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded; // Attach user details to request object
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or Expired Token" });
  }
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access Denied: Unauthorized Role" });
    }
    next();
  };
};

export { authenticate, authorize };
