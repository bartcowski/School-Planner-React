const express = require('express')
const router = express.Router()
const fs = require('fs')
const jf = require('jsonfile')
const dataFilePath = "src/data.json"
const testFilePath = "src/testData.json"

router.get('/', (req, res) => {
    data = jf.readFileSync(dataFilePath)
    return res.send(data.groups)
})

module.exports = router