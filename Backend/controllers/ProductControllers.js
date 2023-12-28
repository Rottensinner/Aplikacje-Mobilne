const Product = require('../models/Products');

module.exports = {
    createProduct: async (req, res) => {
        const newProduct = new Product(req.body);
        try {
            await newProduct.save();
            res.status(200).json("Produkt utworzony poprawnie");
        } catch (error) {
            res.status(500).json("Nie udało się utworzyć produktu");
        }
    },

    getAllProduct: async (req, res) => {
        try {
            const products = await Product.find().sort({ createdAt: -1 });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json("Nie udało się pobrać produktów");
        }
    },

    getProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json("Nie udało się pobrać produktu");
        }
    },

    searchProduct: async (req, res) => {
        try {
            const result = await Product.aggregate([
                {
                    $search: {
                        index: "furniture",
                        text: {
                            query: req.params.key
                        }
                    }
                }
            ]);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json("Nie udało się znaleźć produktu");
        }
    }
};
