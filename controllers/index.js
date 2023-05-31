const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const userDashboardRoutes = require("./dashboard-routes");

router.use('/api', apiRoutes);
router.use("/dashboard", userDashboardRoutes);
router.use('/', homeRoutes);

module.exports = router;