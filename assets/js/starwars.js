// JavaScript Document
// Document load start JS process 
$(document).ready(function () {
    // I run all my functions out of this function. 
    startScreen();
});

/*::::::DOM CACHE::::::*/


/*::::::GLOBALS::::::*/

// Fighter stats
var fighterObj = {
    obiWan: {
        health: 100,
        power: 120,
        counter: 100,
    },
    lukeSkywalker: {
        health: 100,
        power: 150,
        counter: 100,
    },
    darthSidious: {
        health: 100,
        power: 180,
        counter: 100,
    },
    darthVader: {
        health: 100,
        power: 150,
        counter: 100,
    },

};

// all my image assets stored in one variable
var fighterImages = "<div class='images py-4  d-flex flex-sm-row flex-column'>" +
    "<div class='lukeSkywalker col-sm-3 fightImages '>" + "<img id='lukeSkywalker' class='img-fluid fighter reg_border px-2 py-1 mr-1' src='assets/images/lukeSkywalker.png' alt=''>" + "<span><p><b>Power:</b>" + " " + fighterObj.lukeSkywalker.power + "</p></span>" + "</div>" +
    "<div class='obiWan  col-sm-3 fightImages'>" + "<img id='obiWan' class='img-fluid fighter reg_border px-2 py-1 mr-1' src='assets/images/obiWan.png' alt=''>" + "<span><p><b>Power:</b>" + " " + fighterObj.obiWan.power + "</p></span>" + "</div>" +
    "<div class='darthSidious  col-sm-3 fightImages'>" + "<img id='darthSidious' class='img-fluid fighter reg_border px-2 py-1 mr-1' src='assets/images/darthSidious.png' alt=''>" + "<span><p><b>Power:</b>" + " " + fighterObj.darthSidious.power + "</p></span>" + "</div>" +
    "<div class='darthVader  col-sm-3 fightImages'>" + "<img id='darthVader' class='img-fluid fighter reg_border px-2 py-1 mr-1' src='assets/images/darthVader.png' alt=''>" + "<span><p><b>Power:</b>" + " " + fighterObj.darthVader.power + "</p></span>" + "</div>" +
    "</div>";

// Dynamic fighter container 
var fightCont;

// I use this later to grab the ID of the the onlclicked element and use that in various different ways. 
var id;

// Global variables for health;
var fighterHealth = 100;
var enemyHealth = 100;



// This is where I add the active player stats that has been chose by user. 
var activeObj = {};
// This is where I add the active enemy stats that has been chose by user. 
var enemyObj = {};
// Object to push defeated fighter too. 
var defeatedObj = {};

function startScreen() {
    fightCont = $("#fighters");
    fightCont.html("<h3 class='remove-title'>Choose a Fighter</h3>" + fighterImages);
    gameSetup();
}

function startFight() {
    // onclick function to move the images from one staging area to the next and to exchange data between the obj's 

    $(".fighter").click(function () {
        fightCont = $("#fighters");
        id = $(this).attr("id");
        activeObj = fighterObj[id];
        delete fighterObj[id];
        fighterPower = activeObj.power;
        $("." + id).addClass("d-none");
        $(".fightImages").removeClass("col-sm-3").addClass("col-sm");
        $(".remove-title").empty();
        $(".remove-title").append("<h3>Your Enemies</h3>");
       
        $("#fighterActive").html("<h3>Your Character</h3>" + "<img id='" + id + "' src='assets/images/" + id + ".png'" + "'" + "data-active='false'" + "class='img-fluid d-block activeFighter reg_border px-2 py-1 mr-1'>" + "<span id='playerStats' class='bg-success'><p><b>Power:</b>" + " " + activeObj.power + "</p></span>");
        $("#fightCont").replaceWith("");
        $("#EATA").append("<div id='enemies' class='col-12 d-block py-2'>" + $(fightCont).html() + "</div>");
        $("#fighters").html("");
        $("#fightCont").replaceWith("");



        $(".fighter").click(function () {

            id = $(this).attr("id");
            var enemyCont = $("#attackEnemies");
            enemyObj = fighterObj[id];
            enemyPower = enemyObj.power;
            console.log();
            // test to see if enemy power is set
            console.log(enemyObj.power);
            delete fighterObj[id];

            $("#enemyActive").html(" <h3>Your Enemy</h3> <img id='" + id + "' src='assets/images/" + id + ".png'" + "class='img-fluid d-block activeEnemy reg_border px-2 py-1 mr-1'>" + "<span id='playerStats' class='bg-success'><p><b>Power:</b>" + " " + enemyObj.power + "</p></span>");
            $("." + id).addClass("d-none");
            $("#attack-btn").on("click", attack);

            function scoreBoard() {
                console.log(fighterPower);
                console.log(enemyPower);
                $("#scoreBoard").toggle("fast");
                $("#fighterHAlert").html("<strong>Fighters Health:</strong>" + " " + fighterHealth + "%");
                $("#enemyHAlert").html("<strong>Enemies Health:</strong>" + " " + enemyHealth + "%");
            }



            function attack() {
                // Local Variables for the attack function 
                var fighterPower = activeObj.power; // activeObj.power;
                var enemyPower = enemyObj.power;
                var fighterNumb = Math.floor(Math.random() * fighterPower);
                var enemyNumb = Math.floor(Math.random() * enemyPower);


                // loads the top scoreboard
                scoreBoard();
                $("#scoreBoard").removeClass("d-none").addClass("d-block sticky-top");
                $("#attack-btn").text("Attack");

                // Animation complete.


                if ((fighterNumb >= enemyNumb) && ((fighterHealth > 0) && (enemyHealth > 0))) {
                    console.log("Fighter Won");
                    enemyHealth = parseInt(enemyHealth) - 10;
                    // enemyObj[id] = fighterObj[id];

                } else if ((fighterNumb <= enemyNumb) && ((fighterHealth > 0) && (enemyHealth > 0))) {
                    console.log("Fighter Loss");

                    fighterHealth = parseInt(fighterHealth) - 10;
                    //console.log(defeatedFighterObj);

                } else {
                    if ((fighterHealth > enemyHealth)) {
                        $.extend(defeatedObj, defeatedObj);

                        delete enemyObj.power;
                        delete enemyObj.health;
                        delete enemyObj.counter;
                        // Test your Objects with the following code 
                        var strA = JSON.stringify(activeObj, null, 4); // this turns the object into a string and makes it easy to read in the console.
                        console.log("active:" + strA);

                        var strB = JSON.stringify(fighterObj, null, 4);
                        console.log("fighter:" + strB);

                        var strC = JSON.stringify(enemyObj, null, 4);
                        console.log("enemy:" + strC);

                        var strD = JSON.stringify(defeatedObj, null, 4);
                        console.log("defeated:" + strD);


                        console.log("Fighter WIIIINNNS");
                        $("#enemyHAlert").html("");
                        $("#fighterHAlert").html("<strong>You won with:</strong>" + " " + fighterHealth + "%" + " left");
                        var delayNextRound = setTimeout(function () {
                            $("#scoreBoard").removeClass("d-block").addClass("d-none");


                            nextRound();

                        }, 5000);


                    } else
                        console.log("Fighter LOSSES");
                    $("#fighterHAlert").html("");
                    $("#enemyHAlert").html("<strong>You lost with:</strong>" + " " + fighterHealth + "%" + " left");
                    var delayEndGame = setTimeout(function () {
                        $("#scoreBoard").removeClass("d-block").addClass("d-none");
                        endGame();

                    }, 5000);
                }
            }

        });
    });

}

function nextRound() {
    console.log("in nextRound();");
}

function endGame() {
    $(".remove-title").empty();
    $(".images").empty();
    $("#fighters").empty();
    $("#fighterActive").empty();
    $("#enemyActive").empty();
    $("#enemies").empty();
    startScreen();
    console.log("endGame()");
}

function gameSetup() {
    $("#attack-btn").text("Start Game");
    startFight();
}