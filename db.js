const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./ws.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS ideas(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      title TEXT,
      category TEXT,
      description TEXT,
      link TEXT
    );
  `);
  /*
  const query = `
      INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
      ) VALUES (?,?,?,?,?)
  `;

  const values = [
    "https://image.flaticon.com/icons/svg/2729/2729027.svg",
    "Meditação",
    "Mentalidade",
    "Marcia para fica me olhando e vai fazer alguma coisa da vida.. vai descascar batatas para fazer a mistura da janta de hj e almoço de amanha para me eu nao vou fazer nada so vou fazer o que vc faz o dia todo COMER E COMER E COMER",
    "https://google.com"
  ];

  db.run(query, values, err => {
    if (err) return console.log(err);

    console.log(this);
  }); */

  /*
  db.run(`DELETE FROM ideas WHERE id = ?`, [1], err => {
    if (err) return console.log(err);

    console.log("ITEM DELETADO!", this);
  });
  */
  /*
  db.all(`SELECT * FROM ideas`, (err, rows) => {
    if (err) return console.log(err);

    console.log(rows);
  });  */
});

module.exports = db;
