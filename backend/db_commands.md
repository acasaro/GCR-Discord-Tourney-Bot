Run all commands from within `/backend`

### Initializing sequelize environment

`npx sequelize-cli init`

### Creating a Migration

`npx sequelize-cli model:generate --name <ModelName>`

### Creating a Migration/Model in one command

`npx sequelize-cli model:generate --name <ModelName> --attributes <columnName>:<dataType>`

### Running Migrations

run all migrations:

- `npx sequelize-cli db:migrate`

### Undoing Migrations

undo most recent migration:

- `npx sequelize-cli db:migrate:undo`

undo specific migration:

- `npx sequelize-cli db:migrate:undo --name <name of migration`

### Test Run

You can run `npx sequelize-cli db:migrate` (with no migrations) to test out and see a database file generate.

If migrations/models are available, but no database is currently within `/backend/db`, you can go ahead and run the above command to generate a database file.

npx sequelize-cli model:generate --name config --attributes guild_id:string,bot_admin_role_id:string,default_publish_channel_id:string
