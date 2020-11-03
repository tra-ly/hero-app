const express = require('express')
const router = express.Router()
const controller = require('../controllers/hero.controller')
router.get('/heroes', controller.getheroes
)

router.get('/heroes/search', controller.searchhero)

router.post('/heroes/add', controller.posthero)

router.get('/heroes/:id', controller.gethero)

router.put('/heroes/:id', controller.puthero)

router.delete('/heroes/:id', controller.deletehero)

module.exports = router;