const Index = require("../routes/index_routes");

function setupRoutes(app) {
    new Index(app);
}

module.exports = setupRoutes;