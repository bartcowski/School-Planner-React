const express = require('express')
const app = express();
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser') //parsing requests

const dataFilePath = "src/data.json"
const testFilePath = "src/testData.json"

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')))

const api = require('./api')
app.use('/api', api)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'))
})

app.listen(5000)