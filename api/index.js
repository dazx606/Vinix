const server = require('./src/app.js');
const { conn, Status } = require('./src/db.js');
const PORT = process.env.PORT || 3001;

// Syncing all the models at once.
conn.sync({ force: true }).then(async() => {
  server.listen(PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
  //["available","pending","sold"]
  await Status.create({status:"available"});
  await Status.create({status:"pending"});
  await Status.create({status:"sold"});
});
