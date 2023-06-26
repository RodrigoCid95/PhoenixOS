const http = require("http")
const path = require('path')
const express = require("express")
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/apps', (req, res) => {
  res.json([
    {
      "packageName": "com.app.test",
      "title": "LocalCloud - App One",
      "description": "App fake de pruebas.",
      "author": ["Rodrigo Cid"],
      "icon": "data:image/svg+xml,%3Csvg viewBox='0 0 48 32' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='48' height='32' style='stroke-width: 4px%3B stroke: rgb(255  255  255)%3B fill: rgba(255  255  255  0)%3B' rx='4' ry='4' transform='matrix(-1  0  0  -1  0  0)' x='-48' y='-32'%3E%3C/rect%3E%3Cline style='stroke-width: 4px%3B fill: rgb(216  216  216)%3B stroke: rgb(255  255  255)%3B' x1='0' y1='8' x2='48' y2='8'%3E%3C/line%3E%3C/svg%3E",
      "services": {},
      "dependences": ["geolocation"]
    }
  ])
})

app.get('/', (req, res) => {
  res.send("Hello from express server.")
})

const port = process.env.PORT || 3000

http
  .createServer(app)
  .listen(port, () => {
    console.log(`https://localhost:${port}`)
  })
