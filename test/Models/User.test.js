const db = require('../../config/db.js');
const User = require('../../models/User.js');

// Mock complet de la base de données
jest.mock('../../config/db.js', () => ({
  execute: jest.fn(),
}));

describe('User Model Tests', () => {
  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    db.execute.mockClear();
  });

  describe('findById', () => {
    it('devrait retourner un utilisateur par son ID', async () => {
      const mockUser = {
        id: 14,
        username: 'Ahmed Zamma',
        email: 'mahdibeyy@gmail.com',
        role: 'gerant',
      };
      db.execute.mockResolvedValue([[mockUser]]);

      const result = await User.findById(14);
      expect(db.execute).toHaveBeenCalledWith(expect.any(String), [14]);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findByEmail', () => {
    it('devrait retourner un utilisateur par son email', async () => {
      const mockUser = {
        id: 14,
        username: 'Ahmed Zamma',
        email: 'mahdibeyy@gmail.com',
        role: 'gerant',
      };
      db.execute.mockResolvedValue([[mockUser]]);

      const result = await User.findByEmail('mahdibeyy@gmail.com');
      expect(db.execute).toHaveBeenCalledWith(expect.any(String), ['mahdibeyy@gmail.com']);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findByUsername', () => {
    it("devrait retourner un utilisateur par son nom d'utilisateur", async () => {
      const mockUser = {
        id: 14,
        username: 'Ahmed Zamma',
        email: 'mahdibeyy@gmail.com',
        role: 'gerant',
      };
      db.execute.mockResolvedValue([[mockUser]]);

      const result = await User.findByUsername('Ahmed Zamma');
      expect(db.execute).toHaveBeenCalledWith(expect.any(String), ['Ahmed Zamma']);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findByPhoneNumber', () => {
    it('devrait retourner un utilisateur par son numéro de téléphone', async () => {
      const mockUser = {
        id: 14,
        username: 'Ahmed Zamma',
        email: 'mahdibeyy@gmail.com',
        role: 'gerant',
      };
      db.execute.mockResolvedValue([[mockUser]]);

      const result = await User.findByPhoneNumber('56327237');
      expect(db.execute).toHaveBeenCalledWith(expect.any(String), ['56327237']);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findByRole', () => {
    it('devrait retourner des utilisateurs par leur rôle', async () => {
      const mockUsers = [
        { id: 15, username: 'Ahmed Bey', email: 'mahdibey2002@gmail.com', role: 'pompiste' },
        { id: 16, username: 'Mahdi', email: 'newuser@example.com', role: 'pompiste' },
      ];
      db.execute.mockResolvedValue([mockUsers]);

      const result = await User.findByRole('pompiste');
      expect(db.execute).toHaveBeenCalledWith(expect.any(String), ['pompiste']);
      expect(result).toEqual(mockUsers);
    });
  });

  describe('findAll', () => {
    it('devrait retourner tous les utilisateurs sauf les gérants', async () => {
      const mockUsers = [
        { id: 15, username: 'Ahmed Bey', email: 'mahdibey2002@gmail.com', role: 'pompiste' },
        { id: 16, username: 'Mahdi', email: 'newuser@example.com', role: 'pompiste' },
      ];
      db.execute.mockResolvedValue([mockUsers]);

      const result = await User.findAll();
      expect(db.execute).toHaveBeenCalledWith(expect.any(String));
      expect(result).toEqual(mockUsers);
    });
  });

  describe('addUser', () => {
    it('devrait ajouter un utilisateur', async () => {
      const mockUserData = {
        username: 'newUser',
        email: 'newuser@example.com',
        phone: '1234567890',
        password: 'hashedPassword',
        role: 'client',
      };
      db.execute.mockResolvedValue([{ insertId: 30 }]);

      const result = await User.addUser(
        mockUserData.username,
        mockUserData.email,
        mockUserData.phone,
        mockUserData.password,
        mockUserData.role,
      );

      expect(db.execute).toHaveBeenCalledWith(expect.any(String), [
        mockUserData.username,
        mockUserData.email,
        mockUserData.phone,
        mockUserData.password,
        mockUserData.role,
      ]);
      expect(result.insertId).toBe(30);
    });
  });

  describe('updateUser', () => {
    it("devrait mettre à jour les informations d'un utilisateur", async () => {
      const updateData = {
        username: 'UpdatedUser',
        email: 'updated@example.com',
        role: 'caissier',
      };
      db.execute.mockResolvedValue([{ affectedRows: 1 }]);

      const result = await User.updateUser(15, updateData);
      expect(db.execute).toHaveBeenCalledWith(expect.any(String), [
        updateData.username,
        updateData.email,
        updateData.role,
        15,
      ]);
      expect(result.affectedRows).toBe(1);
    });
  });

  describe('deleteUser', () => {
    it('devrait supprimer un utilisateur par son ID', async () => {
      db.execute.mockResolvedValue([{ affectedRows: 1 }]);

      const result = await User.deleteUser(15);
      expect(db.execute).toHaveBeenCalledWith(expect.any(String), [15]);
      expect(result.affectedRows).toBe(1);
    });
  });

  describe('updatePasswordByEmail', () => {
    it('devrait mettre à jour le mot de passe par email', async () => {
      db.execute.mockResolvedValue([{ affectedRows: 1 }]);

      const result = await User.updatePasswordByEmail('user@example.com', 'newHashedPassword');
      expect(db.execute).toHaveBeenCalledWith(expect.any(String), [
        'newHashedPassword',
        'user@example.com',
      ]);
      expect(result.affectedRows).toBe(1);
    });
  });

  describe('getUserStats', () => {
    it('devrait retourner les statistiques des utilisateurs', async () => {
      const mockStats = {
        total_users: 10,
        active_users: 8,
        inactive_users: 2,
        clients: 5,
        pompistes: 4,
        gerants: 1,
        cogerants: 0,
      };
      db.execute.mockResolvedValue([[mockStats]]);

      const result = await User.getUserStats();
      expect(db.execute).toHaveBeenCalledWith(expect.any(String));
      expect(result).toEqual(mockStats);
    });
  });
});
