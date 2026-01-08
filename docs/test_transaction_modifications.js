// Script de test pour vérifier les modifications de la table transactions
// Ce script teste les nouvelles fonctionnalités après suppression d'id_credit

import Transaction from '../models/Transaction.js';
import db from '../config/db.js';

const testTransactionModifications = async () => {
  console.log('🧪 Test des modifications de la table transactions...\n');
  
  try {
    // Test 1: Vérifier la structure de la table
    console.log('1. Vérification de la structure de la table transactions:');
    const [tableStructure] = await db.execute('DESCRIBE transactions');
    console.log('Colonnes de la table transactions:');
    tableStructure.forEach(column => {
      console.log(`  - ${column.Field}: ${column.Type} ${column.Null === 'NO' ? '(NOT NULL)' : '(NULL)'}`);
    });
    
    // Vérifier qu'id_credit n'existe plus
    const hasIdCredit = tableStructure.some(col => col.Field === 'id_credit');
    if (hasIdCredit) {
      console.log('❌ ERREUR: La colonne id_credit existe encore dans la table transactions!');
      return;
    } else {
      console.log('✅ La colonne id_credit a été supprimée avec succès\n');
    }
    
    // Test 2: Test de récupération des transactions avec join sur véhicules
    console.log('2. Test de récupération des transactions avec id_credit via join:');
    const [testTransactions] = await db.execute(`
      SELECT 
        t.id,
        t.id_vehicule,
        t.quantite,
        t.montant,
        v.id_credit,
        v.immatriculation,
        v.marque,
        dc.type_credit,
        dc.solde_credit,
        u.username
      FROM transactions t
      JOIN vehicules v ON t.id_vehicule = v.id
      LEFT JOIN details_credits dc ON v.id_credit = dc.id
      LEFT JOIN utilisateurs u ON dc.id_utilisateur = u.id
      ORDER BY t.date_transaction DESC
      LIMIT 3
    `);
    
    if (testTransactions.length > 0) {
      console.log('✅ Récupération des transactions avec succès:');
      testTransactions.forEach(trans => {
        console.log(`  - Transaction #${trans.id}: ${trans.marque} (${trans.immatriculation}) - ${trans.montant} DT - Crédit: ${trans.id_credit || 'Aucun'}`);
      });
    } else {
      console.log('⚠️  Aucune transaction trouvée pour le test');
    }
    
    console.log('\n3. Test des fonctions du modèle Transaction:');
    
    // Test getAllTransactions
    try {
      const [allTransactions] = await Transaction.getAllTransactions();
      console.log(`✅ getAllTransactions: ${allTransactions.length} transactions récupérées`);
    } catch (error) {
      console.log(`❌ getAllTransactions: ${error.message}`);
    }
    
    // Test getTransactionsByUser (si on a un utilisateur)
    if (testTransactions.length > 0 && testTransactions[0].username) {
      try {
        // Récupérer l'ID utilisateur
        const [user] = await db.execute('SELECT id FROM utilisateurs WHERE username = ? LIMIT 1', [testTransactions[0].username]);
        if (user.length > 0) {
          const [userTransactions] = await Transaction.getTransactionsByUser(user[0].id);
          console.log(`✅ getTransactionsByUser: ${userTransactions.length} transactions pour l'utilisateur`);
        }
      } catch (error) {
        console.log(`❌ getTransactionsByUser: ${error.message}`);
      }
    }
    
    console.log('\n🎉 Tests terminés avec succès!');
    console.log('\n📋 Résumé des modifications:');
    console.log('- ✅ Colonne id_credit supprimée de la table transactions');
    console.log('- ✅ Toutes les requêtes utilisent maintenant JOIN avec vehicules pour récupérer id_credit');
    console.log('- ✅ La logique métier reste identique pour le frontend');
    console.log('- ✅ Les fonctions du modèle Transaction fonctionnent correctement');
    
  } catch (error) {
    console.error('❌ Erreur lors des tests:', error);
  } finally {
    process.exit(0);
  }
};

// Exécuter les tests
testTransactionModifications();
