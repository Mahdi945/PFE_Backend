import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      // Recherche de l'utilisateur par son ID dans la base de données
      const user = await User.findById(payload.id); // Assurez-vous que cela renvoie un utilisateur ou null
      if (user) {
        return done(null, user); // Si l'utilisateur est trouvé, on le retourne
      }
      return done(null, false); // Si aucun utilisateur n'est trouvé, on renvoie false
    } catch (error) {
      return done(error, false); // En cas d'erreur, renvoyer l'erreur
    }
  })
);

export default passport;