const express = require("express");
const fs = require("fs");

//Модуль для доступа к Response.Body 
const bodyParser = require("body-parser");

const server = express();

//Встроим модуль bodyParser в конвейер обработки HTTP-запросов
//модули обработчики в конвейер встравиваются через server.use (express.use)
server.use(bodyParser.urlencoded({ extended: false }));

const HTTP_OK = 200;
const SERVER_PORT = 5000;

function produceTextResponse(fileName, response, contentType)
{
    fs.readFile(fileName, "utf8", function(err, data){

        if(err) 
        {
            console.log(err.message);
        }

        let responseHTML = "";

        responseHTML = data;        

        response.writeHead(HTTP_OK, { "Content-Type": contentType });
        response.write(responseHTML);
        response.end();

    });
}

//Настраиваем сервер на серию Get-запросов

//Для корня сайта
server.get("/", function(request, response) {

    produceTextResponse("index.html", response, "text/html");

});

//Для страницы регистрации
server.get("/Users/Register", function(request, response){

    produceTextResponse("user_register.html", response, "text/html");

});

//Настраиваем сервер для серии POST-запросов

server.post("/Users/Register", function(req, res){

    console.log(req.body);
    res.end();

});

server.get("/AboutTovar", function(request, response){

    produceTextResponse("tovar_register.html", response, "text/html");

});

//Настраиваем сервер для серии POST-запросов

server.post("/AboutTovar", function(req, res){

    console.log(req.body);
    res.end();

});


const service = server.listen(SERVER_PORT);