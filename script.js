window.onload = function() {
    init();
}

const notes = ["A", "B", "C", "D", "E", "F", "G"];
const forms = ["C form", "A form", "G form", "E form", "D form"]
let includeMinor = false;


function init() {
    setupInterval();
    getRandomScale();
    getRandomForm();
    let timeout = document.getElementById('timeout');
    timeout.addEventListener("change", function(){
        setupInterval();
        getRandomScale();
        getRandomForm();
    })
    document.getElementById("includeMinor").addEventListener("change", function() {
        includeMinor = !includeMinor
    });
}

var timer;

function setupInterval() {
    let count = document.getElementById("timeout").value;
    console.log("Clearing timer")
    clearInterval(timer)
    timer = setInterval(function() {
        let timeLeft = document.getElementById("timeLeft");
        timeLeft.innerText = count;
        if(count == 0){
            clearInterval(timer);
            getRandomScale();
            getRandomForm();
            setupInterval();
        }
        count--;
    }, 1000);
}

function getRandomScale() {
    let note = notes[Math.floor(Math.random() * notes.length)];
    let accidental = getRandomAccidental(note);
    let mode = getRandomMode();
    let scale = document.getElementById("scale");
    scale.innerText = note + accidental + mode;
}

function getRandomAccidental(note){
    let accidentals = ["#", "♭", ""];
    // No sharps for B or E
    if (note === "B" || note === "E") {
        accidentals = ["♭", ""];
    } // No flats for C or F
    else if (note === "C" || note === "F"){
        accidentals = ["#", ""]
    }

    return accidentals[Math.floor(Math.random() * accidentals.length)];
}

function getRandomMode(){
    let modes = [""];
    if (includeMinor){
        modes.push("m");
    }
    return modes[Math.floor(Math.random() * modes.length)];
}

function getRandomForm(){
    let form = forms[Math.floor(Math.random() * forms.length)];
    let scaleForm = document.getElementById("scaleForm");
    scaleForm.innerText = form;
}
