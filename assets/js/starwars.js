// JavaScript Document
// Document load start JS process 
$(document).ready(startScreen);

/*::::::DATA SETS::::::*/

// This is where I add the active player stats that has been chose by user. 
var activeObj = {};
// This is where I add the active enemy stats that has been chose by user. 
var enemyObj = {};
// Object to push defeated fighter too. 
var defeatedObj = {};

// Fighter stats.
const fighterObj = {
    obiWan: {
        health: 100,
        power: 120,
        counter: 100,
        img: 'assets/images/obiWan.png'
    },
    lukeSkywalker: {
        health: 100,
        power: 150,
        counter: 100,
        img: 'assets/images/lukeSkywalker.png'
    },
    darthSidious: {
        health: 100,
        power: 180,
        counter: 100,
        img: 'assets/images/darthSidious.png'
    },
    darthVader: {
        health: 100,
        power: 150,
        counter: 100,
        img: 'assets/images/darthVader.png'
    },

};

function genElement(type, className, id) {
    const el = $(type).addClass(className);
    if (id !== null) {
        el.attr("id", id);
    }
    return el;
}

function genStats(fighter) {
    const statCont = genElement("<div>", "player-states", null);
    const statUl = genElement("<ul>", "stat-list list-group", null);
    const pwrLi = genElement("<li>", "stat-list-item list-group-item", null).text(`Power: ${fighterObj[fighter].power}`)
    const cntrLi = genElement("<li>", "stat-list-item list-group-item", null).text(`Counter: ${fighterObj[fighter].counter}`)
    statUl.append(pwrLi, cntrLi)
    return statCont.append(statUl)
}

function genCard(fighter, obj, num) {
    const card = genElement("<div>", "card d-flex flex-row", `card-${fighter}`)
    const row = genElement("<div>", "row no-gutters", null)
    const colAuto = genElement("<div>", "col-auto", null)
    const ftrImg = genElement("<img>", "img-fluid mx-2 mb-2", null).attr("src", `assets/images/${fighter}.png`)
    const col = genElement("<div>", "col", null)
    const crdBlk = genElement("<div>", "card-block px-2", null)
    const crdTle = genElement("<h2>", "card-title mt-3 ml-2", null).text(fighter)
    const crdTxt = genElement("<div>", "card-block px-2", null).html(genStats(fighter));
    const prgTle = genElement("<h4>", "mt-3 ml-2", null).text("Health")
    const hlth = genElement("<div>", "progress", null)
    const prgsBR = genElement("<div>", "progress-bar bg-success", `hlthBr-${num}`).attr("aria-valuenow", fighterObj[fighter].health).attr("role", "progressbar").attr("style", ` width: ${fighterObj[fighter].health}%;`).text(`${fighterObj[fighter].health}%`)
    colAuto.append(ftrImg)
    hlth.append(prgsBR)
    col.append(crdBlk, crdTle, crdTxt, prgTle, hlth)
    return card.append(row.append(colAuto).append(col))
}


function genFighters() {
    const imgCont = genElement("<div>", 'images py-4  d-flex flex-sm-row flex-column pt-4 mt-4', null);

    for (let el in fighterObj) {
        const imgDiv = genElement("<di>", `${el} col-sm-3 fightImages text-center mt-2`, null);
        const fImg = genElement("<img>", 'img-fluid fighter reg_border px-2 py-1 mt-1', el).attr("src", fighterObj[el].img);
        const span = genElement("<div>", `fightStats text-center text-white d-block py-2`, null).html(`<b>Power:</b> ${fighterObj[el].power}`)
        imgDiv.append(fImg, span)
        imgCont.append(imgDiv)
    }
    return imgCont;
}




function startScreen() {
    fightCont = $("#fighters");
    const h3 = genElement("<h3>", 'remove-title text-center', null).text("Choose a Fighter");
    const fighterImages = genFighters();
    //  const btn = genElement("<button>", 'btn btn-outline-light', 'attack-btn').text("Start The Game");
    fightCont.append(h3, fighterImages);
    $(".fighter").click(chsPlr);

}


function chsPlr() {
    const atkBtn = $("#attack");
    const ftrId = $(this).attr("id");
    const actvFtr = $("#fighterActive");
    const actvEnmy = $("#enemyActive");
    const btn = genElement("<button>", 'btn btn-danger', 'attack-btn').text("ATTACK!!");

    $("." + ftrId).addClass("d-none");

    if (jQuery.isEmptyObject(activeObj)) {
        activeObj[ftrId] = fighterObj[ftrId];
        $(".remove-title").text("Choose an Enemy");
        actvFtr.html(genCard(ftrId, fighterObj[ftrId], 0)).prepend("<strong>Your Fighter:</strong>");
    } else {
        enemyObj[ftrId] = fighterObj[ftrId];
        $(".remove-title").text("Remaining Enemy Queue").addClass("mt-5");
        actvEnmy.html(genCard(ftrId, fighterObj[ftrId], 1)).prepend("<strong>Your Enemy:</strong>");
        atkBtn.html(btn);
        $("#attack-btn").click(attack);
    }
}

function attack() {
    // Local Variables for the attack function 
    const aObj = activeObj[Object.keys(activeObj)[0]];
    const eObj = enemyObj[Object.keys(enemyObj)[0]];
    const fighterPower = aObj.power; // activeObj.power;
    let fighterHealth = aObj.health; // activeObj.health;

    const enemyPower = eObj.power;
    let enemyHealth = eObj.health;


    const fighterNumb = Math.floor(Math.random() * fighterPower);
    const enemyNumb = Math.floor(Math.random() * enemyPower);

    // Animation complete.
    if ((fighterHealth > 0) && (enemyHealth > 0)) {
        if (fighterNumb >= enemyNumb) {
            console.log("Fighter Won");
            aObj.health = aObj.health - 10;
            $('#hlthBr-0').attr("style", `width: ${aObj.health}%`).attr("aria-valuenow", aObj.health).text(`${aObj.health}%`)
        } else {
            console.log("Fighter Loss");
            eObj.health = enemyHealth - 10;
            $('#hlthBr-1').attr("style", `width: ${eObj.health}%`).attr("aria-valuenow", eObj.health).text(`${eObj.health}%`)
            //console.log(defeatedFighterObj);
        }
    } else{
        fighterHealth > enemyHealth ?
         win(): lose();
    }
}
function win(){
    alert("You Won")
}
function lose(){
    alert("You Lost")
}
//         if ((fighterHealth > enemyHealth)) {
//             $.extend(defeatedObj, defeatedObj);

//             delete enemyObj.power;
//             delete enemyObj.health;
//             delete enemyObj.counter;
//             // Test your Objects with the following code 
//             var strA = JSON.stringify(activeObj, null, 4); // this turns the object into a string and makes it easy to read in the console.
//             console.log("active:" + strA);

//             var strB = JSON.stringify(fighterObj, null, 4);
//             console.log("fighter:" + strB);

//             var strC = JSON.stringify(enemyObj, null, 4);
//             console.log("enemy:" + strC);

//             var strD = JSON.stringify(defeatedObj, null, 4);
//             console.log("defeated:" + strD);


//             console.log("Fighter WIIIINNNS");
//             $("#enemyHAlert").html("");
//             $("#fighterHAlert").html("<strong>You won with:</strong>" + " " + fighterHealth + "%" + " left");
//             var delayNextRound = setTimeout(function () {
//                 $("#scoreBoard").removeClass("d-block").addClass("d-none");


//                 nextRound();

//             }, 5000);


//         } else {
//             console.log("Fighter LOSSES");
//             $("#fighterHAlert").html("");
//             $("#enemyHAlert").html("<strong>You lost with:</strong>" + " " + fighterHealth + "%" + " left");
//             var delayEndGame = setTimeout(function () {
//                 $("#scoreBoard").removeClass("d-block").addClass("d-none");
//                 endGame();

//             }, 5000);
//         }
//     }
// }

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

