const { parse } = require('path')
const Hero = require('../models/hero.model')

module.exports.getheroes = async (req, res) => {
    try {
        heroes = await Hero.find()
        res.send(heroes)
    } catch (error) {
        res.status(500).json(error)
    }
    
}

module.exports.gethero = async (req, res) => {
    try {
        const requestedHeroid = req.params['id']

        hero = await Hero.findOne({ id: parseInt(requestedHeroid) })
        res.send(hero)
    } catch (error) {
        res.status(500).json(error)
    }

}

module.exports.deletehero = async  (req, res) => {
    try {
        const requestedHeroid = req.params['id'] 

        hero= await Hero.deleteOne({ id: parseInt(requestedHeroid) })
        res.end()
    } catch (error) {
        res.status(500).json(error)
    }
   
}

module.exports.searchhero = async (req, res) => {
    try {
        const requestedHeroname = req.query.q

        heroes = await Hero.find({ name: new RegExp(requestedHeroname, 'i')}).limit(10)
        res.send(heroes)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.posthero = async (req, res) => {
    try {
        const requestedHeroname = req.body.name
        const genid = await Hero.find().countDocuments()
        let hero = new Hero()
        hero.id = genid + 1
        hero.name = requestedHeroname
        await hero.save()
        res.end()
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.puthero = async (req, res) => {
    try {
        const requestedHeroid = req.params['id']
        const requestedHeroname = req.body.name
        
        hero = await Hero.updateOne({ id: requestedHeroid }, { name: requestedHeroname })
        res.json( {success: requestedHeroname} )
    } catch (error) {
        res.status(500).json(error)
    }
}
