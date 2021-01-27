const express = require('express')
const router = express.Router()

const groups = require('./api/groups')
router.use('/groups', groups)

const teachers = require('./api/teachers')
router.use('/teachers', teachers)

const activities = require('./api/activities')
router.use('/activities', activities)

module.exports = router