/* maryem */
const express = require("express");
const router = express.Router();
const Shop = require("../Models/Shop");

// 🔹 POST – Ajouter plusieurs magasins depuis "depot"
router.post("/", async (req, res) => {
  try {
    const { depot } = req.body; // déstructure la clé "depot"

    // Vérification si depot est bien un tableau
    if (!Array.isArray(depot)) {
      return res.status(400).json({ message: "Données invalides : 'depot' doit être un tableau" });
    }

    // Insertion dans la base
    const insertedShops = await Shop.insertMany(depot);

    res.status(201).json({
      message: `${insertedShops.length} magasins ajoutés avec succès !`,
      data: insertedShops
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur lors de l'ajout des magasins", error: err.message });
  }
});

module.exports = router;


// 🔹 GET – Récupérer tous les magasins
router.get("/", async (req, res) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// DELETE – supprimer tous les magasins
router.delete("/", async (req, res) => {
  try {
    const result = await Shop.deleteMany({});
    res.json({
      message: `${result.deletedCount} magasins supprimés`
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;
