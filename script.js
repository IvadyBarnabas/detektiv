
/* ==========================================
   DETECTIVE - MURDER CASE
   TELJES JÁTÉKRENDSZER
========================================== */


/* KÉPERNYŐVÁLTÁS */

function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(screenId).classList.add("active");
}


/* ==========================================
   STORY BEVEZETŐ
========================================== */

const introSlides = [
    {
        image: "hatter.png",
        text: "Egy átlagosnak induló éjszaka váratlan fordulatot vett. Egy holttestet találtak a város egyik elhagyatott épületében."
    },
    {
        image: "hatter2.png",
        text: "A rendőrség három gyanúsítottat azonosított. Mindegyiküknek lehetett indítéka."
    },
    {
        image: "nyomozo.png",
        text: "Te vagy az ügy nyomozója. A feladatod, hogy megtaláld a valódi gyilkost."
    }
];

let currentSlide = 0;

function startGame() {
    resetGame();
    showScreen("intro");
    displayIntro();
}

function displayIntro() {
    document.getElementById("introImage").src =
        introSlides[currentSlide].image;

    document.getElementById("introText").textContent =
        introSlides[currentSlide].text;
}

function nextIntro() {
    currentSlide++;

    if (currentSlide >= introSlides.length) {
        showScreen("suspects");
        updateProgress();
    } else {
        displayIntro();
    }
}

function skipIntro() {
    showScreen("suspects");
    updateProgress();
}


/* ==========================================
   GYANÚSÍTOTTAK ÉS PÁRBESZÉDEK
========================================== */

const suspects = {

    jason: {
        name: "Jason Voorhees",
        image: "jason2.png",
        killer: false,

        information: "Jason a gyilkosság estéjén a város szélén tartózkodott. Egy szemtanú az épület közelében látta, de a helyszínen talált cipőnyomok nem egyeznek az övéivel.",

        introduction: [
            ["DETECTIVE", "Tudja, miért hoztuk be ide?"],
            ["JASON", "..."],
            ["DETECTIVE", "Egy gyilkosság ügyében nyomozunk. Ön az egyik gyanúsított."]
        ],

        questions: [
            {
                id: "location",
                text: "Hol tartózkodott a gyilkosság estéjén?",
                dialogue: [
                    ["DETECTIVE", "Hol volt aznap este?"],
                    ["JASON", "..."],
                    ["DETECTIVE", "A város szélén tartózkodott?"],
                    ["JASON", "*Lassan bólint.*"],
                    ["DETECTIVE", "Értem. Ezt még ellenőrizni fogjuk."]
                ]
            },
            {
                id: "victim",
                text: "Ismerte az áldozatot?",
                dialogue: [
                    ["DETECTIVE", "Ismerte az áldozatot?"],
                    ["JASON", "*Megrázza a fejét.*"],
                    ["DETECTIVE", "Soha nem találkozott vele?"],
                    ["JASON", "..."],
                    ["DETECTIVE", "Rendben."]
                ]
            },
            {
                id: "evidence",
                text: "Miért látták az épület közelében?",
                dialogue: [
                    ["DETECTIVE", "Egy szemtanú látta az épület közelében."],
                    ["JASON", "*A detektívre néz.*"],
                    ["DETECTIVE", "Miért volt ott?"],
                    ["JASON", "*Megvonja a vállát.*"],
                    ["DETECTIVE", "Nem túl meggyőző válasz."]
                ]
            }
        ]
    },

    art: {
        name: "Art the Clown",
        image: "art2.png",
        killer: false,

        information: "Art az áldozat lakóhelyének közelében tartózkodott. Nem találtak nála közvetlen bizonyítékot. Egy szemtanú szerint azonban a gyilkosság idején máshol volt.",

        introduction: [
            ["DETECTIVE", "Jó estét. Szeretnék feltenni néhány kérdést."],
            ["ART", "*Szélesen elmosolyodik.*"],
            ["DETECTIVE", "Egy gyilkossági ügy miatt vagyunk itt."]
        ],

        questions: [
            {
                id: "location",
                text: "Hol tartózkodott a gyilkosság estéjén?",
                dialogue: [
                    ["DETECTIVE", "Hol volt aznap este?"],
                    ["ART", "*Egy papírra rajzolni kezd.*"],
                    ["DETECTIVE", "Ezt most válasznak veszem."],
                    ["ART", "*Egy házat rajzol, majd egy keresztet tesz mellé.*"],
                    ["DETECTIVE", "Érdekes."]
                ]
            },
            {
                id: "victim",
                text: "Ismerte az áldozatot?",
                dialogue: [
                    ["DETECTIVE", "Találkozott már az áldozattal?"],
                    ["ART", "*Megrázza a fejét.*"],
                    ["DETECTIVE", "Biztos benne?"],
                    ["ART", "*Bólint, majd tovább mosolyog.*"],
                    ["DETECTIVE", "Rendben."]
                ]
            },
            {
                id: "evidence",
                text: "Miért tartózkodott az áldozat közelében?",
                dialogue: [
                    ["DETECTIVE", "Miért volt az áldozat lakóhelyének közelében?"],
                    ["ART", "*Elővesz egy újabb papírt.*"],
                    ["DETECTIVE", "Ez megint egy rajz?"],
                    ["ART", "*Egy bohócot rajzol.*"],
                    ["DETECTIVE", "Nem igazán segít nekünk."]
                ]
            }
        ]
    },

    ghostface: {
        name: "Ghostface",
        image: "ghostface2.png",
        killer: true,

        information: "Ghostface azt állította, hogy otthon tartózkodott a gyilkosság estéjén. Később azonban ellentmondásba keveredett önmagával. Először tagadta, hogy ismerte az áldozatot, majd utalt egy korábbi telefonbeszélgetésükre. A telefonhívások adatai alapján az egyik készülék a gyilkosság helyszínének közelében volt.",

        introduction: [
            ["DETECTIVE", "Tudja, miért van itt?"],
            ["GHOSTFACE", "Őszintén? Fogalmam sincs."],
            ["DETECTIVE", "Egy gyilkossági ügyben nyomozunk."],
            ["GHOSTFACE", "És ehhez nekem mi közöm?"]
        ],

        questions: [
            {
                id: "location",
                text: "Hol tartózkodott a gyilkosság estéjén?",
                dialogue: [
                    ["DETECTIVE", "Hol volt a gyilkosság estéjén?"],
                    ["GHOSTFACE", "Otthon. Egész este otthon voltam."],
                    ["DETECTIVE", "Valaki meg tudja ezt erősíteni?"],
                    ["GHOSTFACE", "Nem hiszem, hogy ez bárkire is tartozna."],
                    ["DETECTIVE", "Ez nem túl meggyőző."]
                ]
            },
            {
                id: "victim",
                text: "Ismerte az áldozatot?",
                dialogue: [
                    ["DETECTIVE", "Ismerte az áldozatot?"],
                    ["GHOSTFACE", "Nem. Soha nem találkoztam vele."],
                    ["DETECTIVE", "Biztos ebben?"],
                    ["GHOSTFACE", "Teljesen."],
                    ["DETECTIVE", "Akkor hogyan magyarázza a korábbi telefonbeszélgetésüket?"],
                    ["GHOSTFACE", "..."],
                    ["GHOSTFACE", "Lehet, hogy tévedtem."]
                ]
            },
            {
                id: "evidence",
                text: "Miért hívta fel az áldozatot?",
                dialogue: [
                    ["DETECTIVE", "Miért telefonált az áldozatnak?"],
                    ["GHOSTFACE", "Nem telefonáltam neki."],
                    ["DETECTIVE", "A híváslistában szerepel a telefonszáma."],
                    ["GHOSTFACE", "Bárki használhatta a telefonomat."],
                    ["DETECTIVE", "És ki használta volna?"],
                    ["GHOSTFACE", "Nem tudom. Talán valaki más."],
                    ["DETECTIVE", "Ezt nehéz elhinni."]
                ]
            }
        ]
    }
};


/* ==========================================
   NYOMOZÁSI ÁLLAPOTOK
========================================== */

let interrogated = [];
let crimeSceneVisited = false;
let selectedSuspect = null;

let currentSuspectId = null;
let currentDialogue = [];
let dialogueIndex = 0;
let dialogueMode = "introduction";
let askedQuestions = [];


/* ==========================================
   NYOMOZÁSI ÁLLAPOTJELZŐ
========================================== */

function updateProgress() {

    document.getElementById("progressText").textContent =
        "Kihallgatások: " + interrogated.length +
        "/3 | Helyszín: " +
        (crimeSceneVisited ? "megvizsgálva" : "nem vizsgálva");

    document.getElementById("accuseButton").disabled =
        !(interrogated.length === 3 && crimeSceneVisited);
}


/* ==========================================
   KIHALLGATÁS INDÍTÁSA
========================================== */

function selectSuspect(suspectId) {

    currentSuspectId = suspectId;

    if (interrogated.includes(suspectId)) {
        alert("Ezt a gyanúsítottat már kihallgattad!");
        return;
    }

    const suspect = suspects[suspectId];

    askedQuestions = [];
    dialogueMode = "introduction";

    currentDialogue = suspect.introduction;
    dialogueIndex = 0;

    document.getElementById("interrogationImage").src =
        suspect.image;

    document.getElementById("interrogationName").textContent =
        suspect.name;

    document.getElementById("dialogueChoices").innerHTML = "";
    document.getElementById("dialogueChoices").style.display = "none";

    document.getElementById("dialogueButton").style.display = "block";

    showScreen("interrogation");

    displayDialogue();
}


/* ==========================================
   PÁRBESZÉD MEGJELENÍTÉSE
========================================== */

function displayDialogue() {

    const dialogue = currentDialogue[dialogueIndex];

    const speaker = dialogue[0];
    const text = dialogue[1];

    document.getElementById("speakerName").textContent =
        speaker;

    document.getElementById("dialogueText").textContent =
        text;

    const detective =
        document.getElementById("detectiveCharacter");

    const suspect =
        document.getElementById("suspectCharacter");

    detective.classList.remove("talking");
    suspect.classList.remove("talking");

    if (speaker === "DETECTIVE") {
        detective.classList.add("talking");
    } else {
        suspect.classList.add("talking");
    }

    const button =
        document.getElementById("dialogueButton");

    if (dialogueIndex === currentDialogue.length - 1) {
        button.textContent = "CONTINUE";
    } else {
        button.textContent = "NEXT";
    }
}


/* ==========================================
   KÖVETKEZŐ PÁRBESZÉD
========================================== */

function nextDialogue() {

    dialogueIndex++;

    if (dialogueIndex >= currentDialogue.length) {

        if (dialogueMode === "introduction") {
            showQuestionChoices();
        }

        else if (dialogueMode === "question") {
            showQuestionChoices();
        }

    } else {
        displayDialogue();
    }
}


/* ==========================================
   VÁLASZTHATÓ KÉRDÉSEK
========================================== */

function showQuestionChoices() {

    const suspect = suspects[currentSuspectId];

    const choicesContainer =
        document.getElementById("dialogueChoices");

    const nextButton =
        document.getElementById("dialogueButton");

    choicesContainer.innerHTML = "";

    nextButton.style.display = "none";
    choicesContainer.style.display = "flex";

    document.getElementById("speakerName").textContent =
        "DETECTIVE";

    document.getElementById("dialogueText").textContent =
        "Mit szeretnél kérdezni?";

    document.getElementById("detectiveCharacter")
        .classList.add("talking");

    document.getElementById("suspectCharacter")
        .classList.remove("talking");

    suspect.questions.forEach(question => {

        if (askedQuestions.includes(question.id)) {
            return;
        }

        const button = document.createElement("button");

        button.textContent = question.text;

        button.onclick = function() {
            chooseQuestion(question);
        };

        choicesContainer.appendChild(button);
    });

    if (askedQuestions.length === suspect.questions.length) {

        choicesContainer.innerHTML = "";

        document.getElementById("dialogueText").textContent =
            "Nincs több kérdésem. A kihallgatás véget ért.";

        const finishButton = document.createElement("button");

        finishButton.textContent = "FINISH INTERROGATION";

        finishButton.onclick = finishInterrogation;

        choicesContainer.appendChild(finishButton);
    }
}


/* ==========================================
   KÉRDÉS KIVÁLASZTÁSA
========================================== */

function chooseQuestion(question) {

    askedQuestions.push(question.id);

    dialogueMode = "question";
    currentDialogue = question.dialogue;
    dialogueIndex = 0;

    document.getElementById("dialogueChoices").style.display =
        "none";

    document.getElementById("dialogueButton").style.display =
        "block";

    displayDialogue();
}


/* ==========================================
   KIHALLGATÁS BEFEJEZÉSE
========================================== */

function finishInterrogation() {

    if (!interrogated.includes(currentSuspectId)) {
        interrogated.push(currentSuspectId);
    }

    updateSuspectInfo();
    updateProgress();

    showScreen("suspects");
}


/* ==========================================
   MEGSZERZETT INFORMÁCIÓK
========================================== */

function updateSuspectInfo() {

    const names = ["jason", "art", "ghostface"];

    document.querySelectorAll(".suspect-info").forEach(
        (element, index) => {

            const id = names[index];

            if (interrogated.includes(id)) {

                const suspect = suspects[id];

                element.innerHTML = `
                    <h2>${suspect.name}</h2>
                    <p>${suspect.information}</p>
                    <br>
                    <p style="color:#45d88b">KIHALLGATVA</p>
                `;
            }
        }
    );
}


/* ==========================================
   TETTHELY
========================================== */

function openCrimeScene() {

    crimeSceneVisited = true;

    updateProgress();

    showScreen("crimeScene");
}


/* VISSZA A RENDŐRSÉGRE */

function returnToStation() {

    showScreen("suspects");

    updateProgress();
}


/* ==========================================
   NYOMOZÁSI JELENTÉS
========================================== */

function openAccusation() {

    if (interrogated.length !== 3 || !crimeSceneVisited) {
        alert("Először hallgasd ki az összes gyanúsítottat és vizsgáld meg a tetthelyet!");
        return;
    }

    const reportContainer =
        document.getElementById("suspectReports");

    reportContainer.innerHTML = "";

    Object.keys(suspects).forEach(id => {

        const suspect = suspects[id];

        const card = document.createElement("div");

        card.className = "report-card";

        card.innerHTML = `
            <h2>${suspect.name}</h2>
            <p>${suspect.information}</p>
            <button onclick="selectAccusation('${id}')">
                ACCUSE
            </button>
        `;

        reportContainer.appendChild(card);
    });

    showScreen("accusation");
}


/* ==========================================
   VÁDEMELÉS
========================================== */

function selectAccusation(suspectId) {

    selectedSuspect = suspectId;

    document.getElementById("confirmationText").textContent =
        "A választott gyanúsított: " +
        suspects[suspectId].name;

    showScreen("confirmation");
}


/* MEGERŐSÍTÉS */

function confirmChoice() {

    if (!selectedSuspect) {
        return;
    }

    const suspect = suspects[selectedSuspect];

    showScreen("result");

    if (suspect.killer) {
        showWin();
    } else {
        showGameOver();
    }
}


/* MÉGSE */

function cancelChoice() {

    selectedSuspect = null;

    showScreen("accusation");
}


/* ==========================================
   WIN
========================================== */

function showWin() {

    document.getElementById("resultTitle").textContent =
        "YOU WIN!";

    document.getElementById("resultTitle").style.color =
        "#38d878";

    document.getElementById("resultText").textContent =
        "Sikerült megtalálnod a valódi gyilkost! Ghostface-et letartóztatták. Az ügyet lezárták.";

    document.getElementById("result").style.backgroundImage =
        "url('win.png')";
}


/* ==========================================
   GAME OVER
========================================== */

function showGameOver() {

    document.getElementById("resultTitle").textContent =
        "GAME OVER";

    document.getElementById("resultTitle").style.color =
        "#e22b35";

    document.getElementById("resultText").textContent =
        "Rossz döntést hoztál! A valódi gyilkos, Ghostface megmenekült, és továbbra is szabadon van.";

    document.getElementById("result").style.backgroundImage =
        "url('gameover.png')";
}


/* ==========================================
   JÁTÉK ÚJRAINDÍTÁSA
========================================== */

function resetGame() {

    currentSlide = 0;

    interrogated = [];
    crimeSceneVisited = false;
    selectedSuspect = null;

    currentSuspectId = null;
    currentDialogue = [];
    dialogueIndex = 0;
    dialogueMode = "introduction";
    askedQuestions = [];

    document.getElementById("dialogueChoices").innerHTML = "";

    document.getElementById("dialogueChoices").style.display =
        "none";

    document.getElementById("dialogueButton").style.display =
        "block";

    document.getElementById("detectiveCharacter")
        .classList.remove("talking");

    document.getElementById("suspectCharacter")
        .classList.remove("talking");

    const names = ["jason", "art", "ghostface"];

    document.querySelectorAll(".suspect-info").forEach(
        (element, index) => {

            element.innerHTML = `
                <h2>${suspects[names[index]].name}</h2>
                <p>Kattints a kihallgatáshoz!</p>
            `;
        }
    );

    document.getElementById("result").style.backgroundImage = "";

    updateProgress();
}

function restartGame() {
    startGame();
}


/* ==========================================
   FŐMENÜ
========================================== */

function goToMenu() {

    resetGame();

    showScreen("menu");
}


/* ==========================================
   KILÉPÉS
========================================== */

function exitGame() {

    const answer = confirm("Biztosan ki szeretnél lépni?");

    if (answer) {
        window.close();

        alert("A böngésző nem minden esetben engedélyezi az ablak automatikus bezárását.");
    }
}
