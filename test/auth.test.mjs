import { chai } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcrypt';
import app from '../server.js'; // Assurez-vous que votre serveur exporte l'application Express en tant que module ES
import User from '../models/User.js';

chai.use(chaiHttp);

describe('User Registration', () => {
  before(async () => {
    // Optionnellement, vous pouvez vider la table des utilisateurs avant d'exécuter les tests
    await User.clearAll();
  });

  it('should register a new user and hash the password', async () => {
    const newUser = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
      role: 'user'
    };

    const response = await chai.request(app)
      .post('/register') // Assurez-vous que votre route d'inscription est correcte
      .send(newUser);

    expect(response).to.have.status(201);
    expect(response.body).to.have.property('message', 'Utilisateur ajouté avec succès.');

    const user = await User.findByEmail(newUser.email);
    expect(user).to.not.be.null;
    expect(user.username).to.equal(newUser.username);
    expect(user.email).to.equal(newUser.email);

    const isMatch = await bcrypt.compare(newUser.password, user.password);
    expect(isMatch).to.be.true;
  });
});