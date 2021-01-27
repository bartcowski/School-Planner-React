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
    const group = req.query.group
    const slot = req.query.slot

    let filteredActs = [...data.activities]
    if (group) {
        filteredActs = filteredActs.filter(act => act.group === group)
    } 
    if (slot) {
        filteredActs = filteredActs.filter(act => act.slot == slot)
    }
    return res.send(filteredActs)
})

//get all valid data for chosen slot
router.get('/valid/:slot', (req, res) => {
    data = req.body.jsonData
    slot = req.params.slot
    group = req.query.group

    let groups = [...data.groups]
    let rooms = [...data.rooms]
    let teachers = [...data.teachers]
    
    data.activities.forEach(act => {
        if(act.slot == slot) {
            //filter all already taken groups/rooms/teachers (except current activity's data - recognized by group)
            groups = groups.filter(g => g !== act.group || act.group === group)
            rooms = rooms.filter(r => r !== act.room || act.group === group)
            teachers = teachers.filter(t => t !== act.teacher || act.group === group)
        }
    })
    //lecture might be the same
    let lectures = [...data.lectures]

    return res.send({slot, rooms, groups, lectures, teachers})
})

router.post('/', (req, res) => {
    data = req.body.jsonData
    newActivity = {
        room: req.body.room,
        group: req.body.group,
        lecture: req.body.lecture,
        slot: req.body.slot,
        teacher: req.body.teacher
    }

    data.activities.push(newActivity)
    jf.writeFileSync(dataFilePath, data, { spaces: 2 })
    return res.sendStatus(200)
})

router.delete('/', (req, res) => {
    data = req.body.jsonData
    group = req.body.group
    slot = req.body.slot

    data.activities = data.activities.filter(
        act => act.slot !== slot || act.group !== group
    )

    jf.writeFileSync(dataFilePath, data, { spaces : 2 })
    return res.sendStatus(200)
})

router.put('/', (req, res) => {
    data = req.body.jsonData
    group = req.body.outdated.group
    slot = req.body.outdated.slot

    outdatedActivity = data.activities.find(
        act => act.group === group
        && act.slot == slot
    )

    updatedActivity = {
        room: req.body.updated.room,
        group: req.body.updated.group,
        lecture: req.body.updated.lecture,
        slot: req.body.updated.slot,
        teacher: req.body.updated.teacher
    }

    outdatedActivity.room = updatedActivity.room
    outdatedActivity.group = updatedActivity.group
    outdatedActivity.lecture = updatedActivity.lecture
    outdatedActivity.teacher = updatedActivity.teacher

    jf.writeFileSync(dataFilePath, data, { spaces : 2 })
    return res.sendStatus(200)
})

module.exports = router