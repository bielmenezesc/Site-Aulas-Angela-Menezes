const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require('./data')

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res) {
    res.redirect("/about")
})

server.get("/about", function(req, res) {
    const about = {
        avatar_url: "angela.jpg",
        name: "Ângela Menezes",
        role: "Designer de Jóias",
        description: "Formada na Universidade Federal de Campina Grande",
        links: [
            {name: "Twitter", url: "https://twitter.com/login?lang=pt"},
            {name: "Instagram", url: "https://www.instagram.com/angelamenezesc/"},
            {name: "Email", url: "https://mail.google.com/mail/u/0/#inbox"}
        ]

    }
    res.render("about", { about })
})

server.get("/portfolio", function(req, res) {
    res.render("portfolio", { itens: videos })
})

server.get("/video", function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video) {
        if (video.id == id) {
            return true
        }
    })

    if (!video) {
        return res.send("Video not found!")
    }

    res.render("video", { item: video })
})

server.listen(5000, function() {
    console.log("server is running")
})