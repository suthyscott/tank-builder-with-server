const express = require('express')
const tankCtrl = require('./controller/tankController')

const app = express()

const port = 4545

app.get('/api/tanks', tankCtrl.getTanks)

app.listen(port, () =>  console.log(`Take us to warp ${port}!`))