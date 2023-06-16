const { Tournament } = require('./backend/db/models/index')
const createTournament = async () => {

    newTourny = await Tournament.create({
        title: 'New Tourny',
        description: 'New Description',
        start_date: '06/15/2023'
    })

    allTourneys = await Tournament.findAll();
    console.log(allTourneys)



}


createTournament();