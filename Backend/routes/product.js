const router = require('express').Router();
const productControler = require('../controllers/ProductControllers');

router.get('/',productControler.getAllProduct)
router.get('/:id', productControler.getAllProduct)
router.get('/search/:key',productControler.getAllProduct)
router.post('/',productControler.createProduct)

module.exports =router