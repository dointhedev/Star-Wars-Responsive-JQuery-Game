// Document load start screen JS process.
$(document).ready(startScreen);

/*::::::EVENT LISTENERS:::::*/
$("body").on("click", ".start-over", restart);
$("body").on("click", ".next-round", nextRound);

/*::::::DATA SETS::::::*/
const activeObj = {};
const enemyObj = {};
let currentEnemy = '';

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
    }
};

// Function to restart game.
function restart() {
    document.location.reload();
}

// Function to generate all HTML elements.
function genElement(type, className, id) {
    const el = $(type).addClass(className);
    if (id !== null) {
        el.attr("id", id);
    }
    return el;
}

// Function that generates the fighter and enemy's stats.
function genStats(fighter) {
    const statCont = genElement("<div>", "player-states", null);
    const statUl = genElement("<ul>", "stat-list list-group", null);
    const pwrLi = genElement("<li>", "stat-list-item list-group-item", null).text(`Power: ${fighterObj[fighter].power}`);
    const cntrLi = genElement("<li>", "stat-list-item list-group-item", null).text(`Counter: ${fighterObj[fighter].counter}`);
    statUl.append(pwrLi, cntrLi);
    return statCont.append(statUl);
}

// Function that generates the fighter and enemies Bootstrap 4 Card elements.
function genCard(fighter, num) {
    const card = genElement("<div>", "card d-flex flex-row  pt-2 px-1", `card-${fighter}`);
    const row = genElement("<div>", `${fighter === "lukeSkywalker" ? "row no-gutters" : "row no-gutters w-96"}`, null);
    const colAuto = genElement("<div>", "col-auto", null);
    const ftrImg = genElement("<img>", "img-fluid mx-2 mb-2", null).attr("src", `assets/images/${fighter}.png`);
    const col = genElement("<div>", "col", null);
    const crdBlk = genElement("<div>", "card-block px-2", null);
    const crdTle = genElement("<h2>", "card-title mt-3 ml-2", null).text(fighter)
    const crdTxt = genElement("<div>", "card-block px-2", null).html(genStats(fighter));
    const prgTle = genElement("<h4>", "mt-3 ml-2", null).text("Health");
    const hlth = genElement("<div>", "progress", null);
    const prgsBR = genElement("<div>", "progress-bar bg-success", `hlthBr-${num}`).attr("aria-valuenow", fighterObj[fighter].health).attr("role", "progressbar").attr("style", ` width: ${fighterObj[fighter].health}%;`).text(`${fighterObj[fighter].health}%`);
    colAuto.append(ftrImg);
    hlth.append(prgsBR);
    col.append(crdBlk, crdTle, crdTxt, prgTle, hlth);
    return card.append(row.append(colAuto).append(col));
}

// The images get generated from the Fighter Object into the players section. 
function genFighters() {
    const imgCont = genElement("<div>", `images py-4  d-flex flex-sm-row flex-column px-3 py-2 mt-4`, null);

    for (let el in fighterObj) {
        const imgDiv = genElement("<div>", `${el} col-sm-3 fightImages text-center mt-2`, null);
        const fImg = genElement("<img>", ` fighter img-fluid reg_border px-2 py-1 mt-1`, el).attr("src", fighterObj[el].img);
        const span = genElement("<div>", `fightStats text-center text-white d-block py-2`, null).html(`<b>Power:</b> ${fighterObj[el].power}`);
        imgDiv.append(fImg, span);
        imgCont.append(imgDiv);
    }
    return imgCont;
}
// Function to generate all the Modals.
function genModal(state, title, body, style, btnText) {
    $("#modalS").modal(state)
    $("#m-title").text(title)
    $("#m-body").text(body)
    const btn = $('#btnS');
    btnText !== null ? btn.addClass(style).text(btnText) : btn.remove();
}

// Initial state of game. 
function startScreen() {
    fightCont = $("#fighters");
    const h3 = genElement("<h3>", 'remove-title text-center', null).text("Choose a Fighter");
    const fighterImages = genFighters(fighterObj, "fighter");
    fightCont.append(h3, fighterImages);
    $(".fighter").click(choosePlayer);
}

// Game logic for choosing fighters and enemies. 
function choosePlayer() {
    const atkBtn = $("#attack");
    const ftrId = $(this).attr("id");
    const actvFtr = $("#fighterActive");
    const actvEnmy = $("#enemyActive");
    const btn = genElement("<button>", 'btn btn-danger', 'attack-btn').text("ATTACK!!");

    if ((jQuery.isEmptyObject(activeObj)) || (jQuery.isEmptyObject(enemyObj))) {
        $("." + ftrId).remove();
        if (jQuery.isEmptyObject(activeObj)) {
            $("#active-area").removeClass("d-none");
            activeObj[ftrId] = fighterObj[ftrId];
            $(".remove-title").text("Choose an Enemy");
            actvFtr.html(genCard(ftrId, 0)).prepend("<strong>Your Fighter:</strong>").addClass("text-center");
            delete fighterObj[ftrId];
        } else {
            currentEnemy = $(this).attr("id");
            enemyObj[ftrId] = fighterObj[ftrId];
            $(".remove-title").text("Remaining Enemy Queue").addClass("mt-5");
            actvEnmy.html(genCard(ftrId, 1)).prepend("<strong>Your Enemy:</strong>").addClass("text-center");
            delete fighterObj[ftrId];
            atkBtn.html(btn);
            $("#attack-btn").click(attack);
        }
    }

    if (jQuery.isEmptyObject(fighterObj)) {
        $("#fightCol").empty();
        $("#deadCol").removeClass("col-6").addClass("col-12");
    }
}

// Function every-time the attack button is triggered. 
function attack() {
    // Active Fighter and Enemy Data.
    const aObj = activeObj[Object.keys(activeObj)[0]];
    const eObj = enemyObj[Object.keys(enemyObj)[0]];

    const fighterPower = aObj.power;
    let fighterHealth = aObj.health;

    const enemyPower = eObj.power;
    let enemyHealth = eObj.health;

    // Random numbers are generated for each player. 
    const fighterNumb = Math.floor(Math.random() * fighterPower);
    const enemyNumb = Math.floor(Math.random() * enemyPower);


    // Once the numbers are generated this logic is executing the attack and decreasing health. 
    // If both players health is above 0;
    if ((aObj.health > 0) && (eObj.health > 0)) {
        if (fighterNumb >= enemyNumb) {
            aObj.health = aObj.health - 10;
            $("#hlthBr-0").attr("style", `width: ${aObj.health}%`).attr("aria-valuenow", aObj.health).text(`${aObj.health}%`);
        } else {
            eObj.health = eObj.health - 10;
            $("#hlthBr-1").attr("style", `width: ${eObj.health}%`).attr("aria-valuenow", eObj.health).text(`${eObj.health}%`);
        }
    } else {
        // If the original fighter object is empty and the active enemy's health is 0 then player won the game. Winning logic is below.
        if ((jQuery.isEmptyObject(fighterObj)) && (enemyHealth === 0)) {
            genModal("show", "You Won The Game YOO HOO!", "Thank you for playing...  Your game will restart in a moment.", "start-over btn-primary", null);
            setTimeout(() => {
                return restart();
            }, 2000);

        } else {
            // If there are still fighters then go to the next round.
            (!jQuery.isEmptyObject(fighterObj)) && (fighterHealth > enemyHealth) ?
            genModal("show", "You Won!", "Ready for the next round?", "next-round btn-success", "Next Round"):
                genModal("show", "You Lost!", "Would You like to play again?", "start-over btn-danger", "Start Over");
        }


    }
}

// After the player won that round the enemy this function is triggered for the next round.
function nextRound() {
    // Hide attack button when user is choosing another opponent.
    $("#attack-btn").hide();
    const aObj = activeObj[Object.keys(activeObj)[0]];

    // Regenerating players health.
    aObj.health = 100;
    $("#hlthBr-0").attr("style", `width: ${aObj.health}%`).attr("aria-valuenow", aObj.health).text(`${aObj.health}%`);
    // Clear Enemy Card.
    $("#enemyActive").empty();
    // Reveal the dead area. 
    $("#fightCol").removeClass("col-12").addClass("col-6");
    $("#deadCol").removeClass("d-none").addClass("d-block");
    $(".remove-title").text("Select Another Victim");

    // Move the defeated players to the dead area.
    const imgCont = $(".defeated");
    const imgDiv = genElement("<div>", `${currentEnemy} col-sm-3 fightImages text-center mt-2`, null);
    const fImg = genElement("<img>", `img-fluid reg_border px-2 py-1 mt-1`, currentEnemy).attr("src", enemyObj[currentEnemy].img);
    imgDiv.append(fImg);
    imgCont.append(imgDiv);

    // Delete active enemy. 
    delete enemyObj[currentEnemy];
}