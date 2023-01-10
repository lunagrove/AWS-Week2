const express = require('express')
const app = express()

app.get("/", (req, res) => {
  console.log("GET /")
  res.send("<h1>AWS Week 2</h1>")
})

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`listening on port ${port}`))