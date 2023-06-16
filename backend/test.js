const { Tournament } = require('./db/models/')


// utility function used to make sure Sequelize is available throughout application
// see /tester directory for examples
const createTournament = async () => {

    newTourny = await Tournament.create({
        title: 'New Tourny',
        description: 'New Description',
        start_date: '06/15/2023'
    })

    allTourneys = await Tournament.findAll();
    console.log(allTourneys)
}


module.exports = createTournament