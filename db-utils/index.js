const db = require("../backend/db/models")
const { Tournament } = db
// future querying utility functions that we can use throughout application

// model queries are promises, so all queries must be async 
// more info can be found here:
// https://sequelize.org/docs/v6/core-concepts/model-querying-basics/


// example of a SELECT * FROM <Table>;
const getTournaments = async () => {
    const allTourneys = await Tournament.findAll({ raw: true }); // returns array
    // {raw: true} removes surrounding metadata (datavalues)
    // not necessary, but helpful for just returning the column data
    console.log(allTourneys)
    return allTourneys
};

getTournaments();