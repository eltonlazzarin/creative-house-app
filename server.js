const express = require("express");
const server = express();

const nunjucks = require("nunjucks");

const db = require("./db");

server.use(express.static("public"));

server.use(express.urlencoded({ extended: true }));

nunjucks.configure("views", {
  express: server,
  noCache: true,
});
/*
const ideas = [
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    title: "Programming Courses",
    category: "Study",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere molestiae hic modi nulla ut excepturi vero dolorum ea eos magnam ipsam fuga nobis, itaque fugit minima saepe, velit reprehenderit provident!",
    url: "https://google.com"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
    title: "Physical Exercises",
    category: "Health",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere molestiae hic modi nulla ut excepturi vero dolorum ea eos magnam ipsam fuga nobis, itaque fugit minima saepe, velit reprehenderit provident!",
    url: "https://google.com"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
    title: "Meditation",
    category: "Mentality",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere molestiae hic modi nulla ut excepturi vero dolorum ea eos magnam ipsam fuga nobis, itaque fugit minima saepe, velit reprehenderit provident!,
    url: "https://google.com"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
    title: "Karaoke",
    category: "Family Fun",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere molestiae hic modi nulla ut excepturi vero dolorum ea eos magnam ipsam fuga nobis, itaque fugit minima saepe, velit reprehenderit provident!",
    url: "https://google.com"
  }
];*/

server.get("/", (req, res) => {
  db.all(`SELECT * FROM ideas`, (err, rows) => {
    if (err) {
      console.log(err);
      return res.send("Database error");
    }

    const reversedIdeas = [...rows].reverse();

    let lastIdeas = [];
    for (let idea of reversedIdeas) {
      if (lastIdeas.length < 2) {
        lastIdeas.push(idea);
      }
    }

    return res.render("index.html", { ideas: lastIdeas });
  });
});

server.get("/ideas", (req, res) => {
  db.all(`SELECT * FROM ideas`, (err, rows) => {
    if (err) {
      console.log(err);
      return res.send("Database error");
    }

    const reversedIdeas = [...rows].reverse();

    return res.render("ideas.html", { ideas: reversedIdeas });
  });
});

server.post("/", (req, res) => {
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
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.link,
  ];

  db.run(query, values, (err) => {
    if (err) {
      console.log(err);
      return res.send("Erro no banco de dados");
    }

    return res.redirect("/ideas");
  });
});

server.listen(3333);
