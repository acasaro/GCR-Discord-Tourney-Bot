Run all commands from within `/backend`

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

### Test Run 
You can run `npx sequelize db:migrate` (with no migrations) to test out and see a database file generate.