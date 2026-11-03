
let selectedSuspect = "";

function startGame() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "block";
}

function selectSuspect(name) {

    selectedSuspect = name;

    let dialogue = "";

    if (name === "Jason") {
        dialogue = "Jason: I was nowhere near the crime scene.";
    }

    else if (name === "Art") {
        dialogue = "Art: ... *Art starts laughing.*";
    }

    else if (name === "Ghostface") {
        dialogue = "Ghostface: You will never find the killer.";
    }

    document.getElementById("dialogue").innerHTML = dialogue;
}

function checkAnswer() {

    if (selectedSuspect === "") {
        alert("Choose a suspect first!");
        return;
    }

    document.getElementById("game").style.display = "none";
    document.getElementById("result").style.display = "block";

    if (selectedSuspect === "Ghostface") {
        document.getElementById("resultText").innerHTML = "YOU WIN! Ghostface was the killer!";
    }

    else {
        document.getElementById("resultText").innerHTML = "GAME OVER! You accused the wrong person!";
    }
}
