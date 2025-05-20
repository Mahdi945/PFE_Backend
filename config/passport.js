import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

// Options pour extraire le JWT du cookie HTTP-only
const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => req.cookies.jwt, // Extraction du token depuis le cookie "jwt"
  ]),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      // Recherche de l'utilisateur par son ID dans la base de données
      const user = await User.findById(payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false); // Si l'utilisateur n'existe pas, renvoie false
    } catch (error) {
      return done(error, false); // Erreur lors de la recherche
    }
  }),
);

export default passport;
