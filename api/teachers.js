const express = require('express')
const router = express.Router()
const fs = require('fs')
const jf = require('jsonfile')
const dataFilePath = "src/data.json"
const testFilePath = "src/testData.json"

router.use((req, res, next) => {
    fileData = jf.readFileSync(dataFilePath)
    req.body.jsonData = fileData
    next()
})

router.get('/', (req, res) => {
    data = req.body.jsonData
    return res.send(data.teachers)
})

router.get('/:surname', (req, res) => {
    data = req.body.jsonData
    if(!data.teachers.find(t => t === req.params.surname)) {
        return res.sendStatus(404)
    }

    teachersActivities = data.activities.reduce((acc, cur) => {
        return cur.teacher == req.params.surname ? acc + 1 : acc
    }, 0)

    return res.send({
        surname: req.params.surname,
        teachersActivities
    })
})

router.post('/', (req, res) => {
    data = req.body.jsonData
    if(data.teachers.find(t => t === req.params.surname)) {
        return res.sendStatus(409).send({message: "The teacher of provided surname is already present in the DB"})
    }

    data.teachers.push(req.body.surname)
    jf.writeFileSync(dataFilePath, data, { spaces: 2 })
    return res.sendStatus(200)
})

router.delete('/:surname', (req, res) => {
    data = req.body.jsonData

    if(!data.teachers.find(t => t === req.params.surname)) {
        return res.sendStatus(404)
    }
    data.teachers = data.teachers.filter(t => t !== req.params.surname)
    data.activities = data.activities.filter(act => act.teacher !== req.params.surname)
    jf.writeFileSync(dataFilePath, data, { spaces : 2 })
    return res.sendStatus(200)
})

module.exports = router


