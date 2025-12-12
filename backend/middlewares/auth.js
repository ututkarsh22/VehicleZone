import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token; 

    if (!token)
      return res.status(401).json({ msg: "No token, authorization denied" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    next();
  } catch {
    res.status(401).json({ msg: "Token is invalid" });
  }
};

export default auth;
