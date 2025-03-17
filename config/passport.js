import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();
// bearer token c est a dire le client porte le token
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

//passport dechiffre le token et extrait le payload qui contient les informations d utilisateur 
passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      // Recherche de l'utilisateur par son ID dans la base de données
      const user = await User.findById(payload.id); // Assurez-vous que cela renvoie un utilisateur ou null
      if (user) {
        return done(null, user); 
      }
      return done(null, false); // Si aucun utilisateur n'est trouvé, on renvoie false
    } catch (error) {
      return done(error, false); 
    }
  })
);

export default passport;