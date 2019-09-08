const friendsData = require("../data/friends");


module.exports = function (server) {
    server.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });
    server.post("/survey", function (req, res) {
        const form = req.body;
        let savePreDifference = 60;
        let clientsFriend = 0;
        for (let x = 0; x < friendsData.length; x++) {
            let totalDifference = 0;
            let friendsTotalScore = 0;
            let clientTotalScore = 0;
            for (let y = 0; y < friendsData[x].score.length; y++) {
                friendsTotalScore = friendsTotalScore + friendsData[x].score[y];
                clientTotalScore = clientTotalScore + parseInt(form.score[y]);
                totalDifference += Math.abs(parseInt(form.score[y]) - parseInt(friendsData[x].score[y]));
            }
            if (totalDifference <= savePreDifference) {
                savePreDifference = totalDifference;
                clientsFriend = x;
            }
         
        }

        friendsData.push(form);
        res.json(friendsData[clientsFriend]);

    });
};
