const express = require("express");
const path = require("path");
const server = express();
const PORT = process.env.PORT || 8080;

server.use(express.static(path.join(__dirname, 'publicOne')));

server.use(express.urlencoded({extended:true}));
server.use(express.json());

require("./app/routing/apiRoutes")(server);
require("./app/routing/htmlRoutes")(server);

server.listen(PORT, function(){
    //console.log('Im on port '+ PORT);
});

