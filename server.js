const express = require("express");
const path = require("path");
const server = express();
const PORT = process.env.PORT || 8080;

server.use(express.urlencoded({extended:true}));
server.use(express.json());
server.use(express.static(path.join(__dirname,'/app/public')));
require("./app/routing/apiRoutes")(server);
require("./app/routing/htmlRoutes")(server);

server.listen(PORT, function(){
    //console.log('Im on port '+ PORT);
});

