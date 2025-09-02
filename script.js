function startSpeechRecognition() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';

    recognition.onresult = function(event) {
        let transcript = event.results[0][0].transcript;
        document.getElementById("text-input").value = transcript;
        translateToSign();
    };

    recognition.start();
}

function translateToSign() {
    let inputText = document.getElementById("text-input").value.toLowerCase();
    let outputBox = document.getElementById("output-box");
    outputBox.innerHTML = "";

    let gifPath = `ISL_Gifs/${inputText}.gif`; // Fixed template string
    let img = document.createElement("img");
    img.src = gifPath;
    img.alt = "Sign Language GIF";

    img.onload = function() {
        outputBox.appendChild(img);
    };

    img.onerror = function() {
        outputBox.innerHTML = "";
        displayLetterByLetter(inputText);
    };
}

function displayLetterByLetter(word) {
    let outputBox = document.getElementById("output-box");
    for (let letter of word) {
        let img = document.createElement("img");
        img.src = `letters/${letter}.jpg`; // Fixed template string
        img.alt = letter;
        img.onerror = () => img.remove();
        outputBox.appendChild(img);
    }
}

function retry() {
    document.getElementById("text-input").value = "";
    document.getElementById("output-box").innerHTML = "";
}

function downloadGif() {
    let img = document.querySelector("#output-box img");
    if (img) {
        let a = document.createElement("a");
        a.href = img.src;
        a.download = "sign_language.gif";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}
