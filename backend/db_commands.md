Run all commands from within `/backend`

To test creation of database with existing migrations skip to "Run Tests" below

### Initializing sequelize environment
`npx sequelize init` 

### Creating a Migration
`npx sequelize model:generate --name <ModelName>` 

### Creating a Migration/Model in one command 
`npx sequelize model:generate --name <ModelName> --attributes <columnName>:<dataType>` 

### Running Migrations
run all migrations: 
 - `npx sequelize db:migrate`

### Undoing Migrations 
undo most recent migration: 
- `npx sequelize db:migrate:undo` 

undo specific migration: 
- `npx sequelize db:migrate:undo --name <name of migration`

undo all migrations: 
- `npx sequelize db:migrate:undo:all`

### Run Tests 
If migrations/models are available but no database is currently within `DB_FILE` path, you can go ahead and run `npx sequelize db:migrate`

### If DB exists:
`/db-utils/index.js`, `/tester`, and `test-create-query.js` are simple `INSERT/SELECT` examples that can be tested.

Once done you can delete the `DB_FILE` directory.




