# Search For Kits

## Dependencies

1. [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. [SQLite](https://www.sqlite.org/download.html)

## Running the Backend

```
cd kit-api
npm install
npm start
```

## Running the Frontend

```
cd kit-ui
npm install
npm start
```

## Notes

- authentication & authorization
- access to all kits? limit by customer_id?
  - only return results when there is a single result?
- alternate lookup methods? user, date fedex number?
- sqlite -> postgres
- DB mgmt: ORM and migrations
- add TS to backend
- testing
- add DB debug columns created_at, updated_at
  - deleted_at???
- id does it need to be preserved as it is in the JSON file? is it useful in the UI?
  - renamed to `kit_id`
- are the label and tracking code unique?
  - can they be null?

### db setup

what I did to set up the database

1. converted json file to a csv via https://www.convertcsv.com/json-to-csv.htm

```
$ sqlite3 kits.db
sqlite> CREATE TABLE kits(kit_id INTEGER, label_id TEXT, shipping_tracking_code TEXT);
sqlite> .mode csv
sqlite> .import /Users/tim/Documents/work/biobot/search-for-kits/kit-api/data/KITS_SHIPPING_DATA.csv kits
```
