const path = require("path");

module.exports = function(server){
    server.get("/",function(req,res){
        res.sendFile(path.join(__dirname,"../../app/public/survey.html"));
    });
    server.get("/survey",function(req,res){
     res.sendFile(path.join(__dirname, "../../app/public/survey.html"));
    });
    server.get("/repo",function(req,res){
    res.redirect("https://github.com/garciahor1/friendFinder")
    });
    
}