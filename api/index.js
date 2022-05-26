const server = require('./src/app.js');
const { conn, Status } = require('./src/db.js');
const PORT = process.env.PORT || 3001;

// Syncing all the models at once.
conn.sync({ force: false }).then(async() => {
  server.listen(PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
  //["available","pending","sold"]
  await Status.findOrCreate({where:{status:"available"}});
  await Status.findOrCreate({where:{status:"pending"}});
  await Status.findOrCreate({where:{status:"sold"}});
});
