import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token found" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user (with role) to request
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};


export const verifyAdmin = (req, res, next) => {
  if (req.user?.role === "admin") {
    next();
  } else {
    res.status(403).json({ msg: "Access denied: Admins only" });
  }
};

// This middleware function checks for a JWT token in the request headers. If the token is present, it verifies it using the secret key stored in the environment variables. If the token is valid, it decodes the token and attaches the user information to the request object (`req.user`). If the token is missing or invalid, it sends a 401 Unauthorized response.
// This middleware is used to protect routes that require authentication. By using this middleware, you can ensure that only authenticated users can access certain routes in your application.