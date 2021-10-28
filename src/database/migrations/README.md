# How to generate and run migrations

<<<<<<< HEAD
## Generate

`NODE_ENV=[development | test | production] yarn run migration:generate -n [MigrationName]`
=======
## Environment variable

Migrations scripts load your dotenv file the same way as the app does.

## Generate

`NODE_ENV=[development | production] yarn run migration:generate -n [MigrationName]`

>>>>>>> master
This will create a migration file under the /database/migrations folder with database changes

## Run

<<<<<<< HEAD
`NODE_ENV=[development | test | production] yarn run migration:run`
=======
`NODE_ENV=[development | production] yarn run migration:run`

>>>>>>> master
This will run all the pending migrations files and update the corresponding database schema

## Revert

<<<<<<< HEAD
`NODE_ENV=[development | test | production] yarn run migration:revert`
=======
`NODE_ENV=[development | production] yarn run migration:revert`
>>>>>>> master

## Troubleshooting

### Column "xxx" of relation "xxx" contains null values

The new column cannot be null and doesn't contain and default values => set a default value or precise this column as nullable (delete the migration file and re-regenerate it)
