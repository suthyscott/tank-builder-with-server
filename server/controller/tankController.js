const tanks = require('../Tanks')

module.exports = {
    getTanks: (req, res) => {
        
        const {search} = req.query

        let filteredTanks = tanks.filter(tank => {
            return tank.name.toLowerCase().includes(search)
        })

        if(filteredTanks[0]){
            return res.status(200).send(filteredTanks)
        }

        res.status(200).send(tanks)
    }
}