This is really dumb, but I was using `/tester` as a way of testing my code against deeply nested file structures to cover edge cases due to some weirdness around .env:
`/backend/config/database.js` 

**BEFORE RUNNING** 
- create environment variable with path to DB 
- CD into /backend 
- run `npx sequelize db:migrate`
- you should now see Tournaments table in root dir of project
- You can run the `test.js` files with `node` which import and invoke a `createTournament` function to populate dummy records with the newly created database.