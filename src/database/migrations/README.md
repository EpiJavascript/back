# How to generate and run migrations

## Generate

`NODE_ENV=[development | test | production] yarn run migration:generate -n [MigrationName]`
This will create a migration file under the /database/migrations folder with database changes

## Run

`NODE_ENV=[development | test | production] yarn run migration:run`
This will run all the pending migrations files and update the corresponding database schema

## Revert

`NODE_ENV=[development | test | production] yarn run migration:revert`

## Troubleshooting

### Column "xxx" of relation "xxx" contains null values

The new column cannot be null and doesn't contain and default values => set a default value or precise this column as nullable (delete the migration file and re-regenerate it)
