$(document).ready(function () {

    const questions = ["I love barking", "I'm older than 3 years of age (Human years)",
        "I like swimming", "I'm a very active pet", "I rather sleep than go out.",
        "I'm over 40lbs", "I enjoy car rides", "I rather watch TV", "I've been known to destroy things", "I have tons of energy"]

    for (let x = 0; x < questions.length; x++) {

        $("#questions").append(
            `<div class="col question-div">\
    <div class="card" style="width: 18rem;">\
        <div class="card-body">\
            <h5 class="card-title">Question ${x + 1}</h5>\
            <p class="card-text">${questions[x]}\
            </p>\
            <div>\
            <div class="form-check form-check-${x}">
                    <input class="form-check-input " type="radio" name="question-${x}-input"
                         id="${'question' + (x + 1)}" value="1">
                     <label class="form-check-label" for="exampleRadios2">
                         1 Strongly disagree
                      </label>
              </div>
                <div class="form-check form-check-${x}">\
                    <input class="form-check-input " type="radio" name="question-${x}-input\"\
                        id="${'question' + (x + 1)}" value="2">\
                    <label class="form-check-label" for="exampleRadios2">\
                        2\
                    </label>\
                </div>\
                <div class="form-check form-check-${x}">\
                    <input class="form-check-input " type="radio" name="question-${x}-input"\
                        id="${'question' + (x + 1)}" value="3">\
                    <label class="form-check-label" for="exampleRadios2">\
                        3\
                    </label>\
                </div>\
                <div class="form-check form-check-${x}">\
                    <input class="form-check-input " type="radio" name="question-${x}-input"\
                        id="${'question' + (x + 1)}" value="4">\
                    <label class="form-check-label" for="exampleRadios2">\
                        4\
                    </label>\
                </div>\
                <div class="form-check form-check-${x}">\
                    <input class="form-check-input " type="radio" name="question-${x}-input"\
                        id="${'question' + (x + 1)}" value="5">\
                    <label class="form-check-label" for="exampleRadios2">\
                        5 Strongly agree\
                    </label></div></div></div></div></div>`)
    };

    $("#submitForm").on("click", function (event) {
        event.preventDefault();
        const arrayToObject = [];
        let nameSubmitted = $("#name-input").val();
        let imageSubmitted = $("#image-input").val();
        let breedSubmitted = $("#breed").val();

        let objectToServer = {
            name: nameSubmitted,
            breed: breedSubmitted,
            image: imageSubmitted,
            score: arrayToObject
        };

        for (let x = 0; x < questions.length; x++) {

            if (typeof ($(`.form-check-${x} input[name=question-${x}-input]:checked`).val()) === "string") {
                arrayToObject.push(parseInt($(`.form-check-${x} input[name=question-${x}-input]:checked`).val()));
              

                objectToServer.score = arrayToObject;
            
                if (questions.length === (x + 1) && $("#name-input").val() != "" && $("#image-input").val() != "" && $("#breed").val() != "") {
                    $.post("/survey", objectToServer).then(function (data) {

                        $("#dropAfterPosting").empty();
                        $("body").append(`
                        <div class="container text-center">
                              <div class="row text-center">
                                    <div class="col text-center">
                                         <div class="card text-center" style="width: 35rem;">
                                         <img src=${data.image} alt="yourFriend" >
                                              <div class="card-body">
                                              <h5 class="Your pet's Friend"></h5>
                                             </div>
                                                <ul class="list-group list-group-flush">
                                                <li class="list-group-item">${"Name of your friend: " + data.name}</li>
                                                <li class="list-group-item">${"Name of your breed: " + data.breed}</li>
                                            </ul>

                                            <div class="container">
                                            <div class="row">
                                                <div class="col">
                                                    <div class="card">
                                                        <div class="card-header">
                                                        </div>
                                                        <div class="row">
                                                            <div class="col">
                                                                <div class="card-body">
                                                                    <p class="card-text">Start new search below</p>
                                                                    <a href="/survey" class="btn btn-primary">New Survey</a>
                                                                </div>
                                                            </div>
                                                            <div class="col">
                                                                <div class="card-body">
                                                                    <p class="card-text">API Friends list</p>
                                                                    <a href="/api/friends" class="btn btn-primary">API Friends</a>
                                                                </div>
                                                            </div>
                                                            <div class="col">
                                                                <div class="card-body">
                                                                    <p class="card-text">Github Repo</p>
                                                                    <a href="/repo" class="btn btn-primary">Repo</a>
                                                                </div>
                                                            </div>
                                    
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                         </div>
                                   </div>
                              </div>
                        </div>
         
                 
            
                        `)
                    });
                }
            } else {
                alert(" You missed question " + (x + 1))
                arrayToObject = [];
                break;
            }
            if (nameSubmitted == "") {
                alert("Name input required");
                break;
            }
            if (imageSubmitted == "") {
                alert("Image link required");
                break;
            }
            if (breedSubmitted == "") {
                alert("breed required");
                break;
            }
        }
    });
});