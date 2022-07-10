//define the port on which the back end is run on
const PORT = 8000

//Save packages
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()
//Listen to changes on the port
app.listen(8000, () => console.log(`Sever is running on port ${PORT}`))

app.get('/schedule', async (req, res) => {
}
)