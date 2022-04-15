const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apikey = "97d8e1e20e90f926bf8d53ce2b0a6e53";
    const unit = "metric";
    const url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        query +
        "&appid=" +
        apikey +
        "&units=" +
        unit;
   
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"});
            res.write("<p>Bienvenue sur notre site </p>");
            res.write("<h1>la température aujourd'hui à " + query + " est de" + " " + temp +" "+ "°C !</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });
});

app.listen(3000, function () {
    console.log("Serveur connecté au port 3000");
});
