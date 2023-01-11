const express = require("express");
const database = require("./Database");

const app = express();

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: true}))

app.use(express.static("public"))

app.get("/", async (req, res) => {
  const notes = await database.getNotes();
  res.render("notes.ejs", {
    notes,
  });
})

app.get("/notes/:id", async (req, res) => {
  const id = req.params.id
  const note = await database.getNote(id)
  if (!note) {
    res.status(404).render("note404.ejs")
    return
  }
  res.render("singleNote.ejs", {
    note,
  });
})

app.get("/createNote", (req, res) => {
  res.render("createNote.ejs")
})

app.post("/notes", async (req, res) => {
  const data = req.body
  await database.addNote(data)
  res.redirect("/");
})

app.post("/notes/:id/delete", async (req, res) => {
  const id = +req.params.id
  await database.deleteNote(id)
  res.redirect("/")
})

const port = 8080;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});