const resultEl = document.querySelector(".result");
const lenghEl = document.querySelector(".length");
const uppercaseEl = document.querySelector(".uppercase");
const lowercaseEl = document.querySelector(".lowercase");
const numbersEl = document.querySelector(".numbers");
const symbolsEl = document.querySelector(".symbols");
const generateEl = document.querySelector("#generate");
const clipboard = document.querySelector("#clipboard");


const randomFunc = {
    lower: getRandomLower, // Call a function that fetched a lowerCase random letters
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboard.onclick = () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText; // Setting whatever in the textfield into the password variable

    if (!password) {
        return alert("No result to copy")
    }

    textarea.value = password; // Fill the textarea with the generated password
    document.body.appendChild(textarea); // Put the new created element into the DOM
    textarea.select(); // Select the textarea content
    document.execCommand('copy'); //Copy the select content to the clipboard
    textarea.remove();
    alert("Password copied to clipboard");
}

generateEl.onclick = () => {
    const length = +lenghEl.value; // Make the value positive
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerHTML = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
}

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = ''; // let because will be change
    const typesCount = lower + upper + number + symbol;
    // Return the parameters checked before
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter((item) => Object.values(item)[0]);

    if (typesCount == 0) {
        return alert(
            "No Selected Value"
        );
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        })
    }

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

function getRandomLower() {
    // Get a random string with only lowercase alphabeth letters, using ASCII code
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97); // A = 65 a = 97
}

function getRandomUpper() {
    // Get a random string with only uppercase alphabeth letters, using ASCII code
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    // Get a random string with only numbers
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48); // 0-9
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>,.';
    // Return a ramdom lenght of symbols until the symbols lenght array
    return symbols[Math.floor(Math.random() * symbols.length)];
}