import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Accès refusé. Token manquant." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Stocke les informations de l'utilisateur
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token invalide." });
  }
};

export default authenticateUser;
