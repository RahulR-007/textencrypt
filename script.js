let originalText = '';  // Store the original input
let encryptedText = '';  // Store the encrypted text
let savedShiftValue = 0;  // Store the random shift value

// Function to generate a random shift value between 1 and 25
function generateRandomShift() {
    return Math.floor(Math.random() * 25) + 1;  // Random number between 1 and 25
}

// Caesar Cipher encryption function with a random shift
function encryptText() {
    const text = document.getElementById('inputText').value;  // Get the user input
    originalText = text;  // Store the original text for reference

    if (originalText.trim() === '') {
        alert('Please enter some text to encrypt.');
        return;
    }

    // Generate a random shift value and save it
    savedShiftValue = generateRandomShift();

    let result = '';
    const steps = [];

    for (let i = 0; i < originalText.length; i++) {
        const char = originalText[i];
        let encryptedChar = char;

        if (char.match(/[a-z]/i)) {
            const charCode = char.charCodeAt(0);
            let newCode;

            // Handle uppercase letters
            if (char >= 'A' && char <= 'Z') {
                newCode = ((charCode - 65 + savedShiftValue) % 26) + 65;
            }
            // Handle lowercase letters
            else if (char >= 'a' && char <= 'z') {
                newCode = ((charCode - 97 + savedShiftValue) % 26) + 97;
            }

            encryptedChar = String.fromCharCode(newCode);
            steps.push(`${char} -> ${encryptedChar}`);
        } else {
            steps.push(`${char} (no change)`);
        }

        result += encryptedChar;
    }

    encryptedText = result;  // Store the encrypted text
    document.getElementById('resultText').textContent = encryptedText;
    displaySteps(steps);
}

// Caesar Cipher decryption function using the saved shift value
function decryptText() {
    let result = '';
    const steps = [];

    if (encryptedText === '') {
        alert("No encrypted text available to decrypt!");
        return;
    }

    for (let i = 0; i < encryptedText.length; i++) {
        const char = encryptedText[i];
        let decryptedChar = char;

        if (char.match(/[a-z]/i)) {
            const charCode = char.charCodeAt(0);
            let newCode;

            // Handle uppercase letters
            if (char >= 'A' && char <= 'Z') {
                newCode = ((charCode - 65 - savedShiftValue + 26) % 26) + 65;
            }
            // Handle lowercase letters
            else if (char >= 'a' && char <= 'z') {
                newCode = ((charCode - 97 - savedShiftValue + 26) % 26) + 97;
            }

            decryptedChar = String.fromCharCode(newCode);
            steps.push(`${char} -> ${decryptedChar}`);
        } else {
            steps.push(`${char} (no change)`);
        }

        result += decryptedChar;
    }

    document.getElementById('resultText').textContent = result;
    displaySteps(steps);
}

// Function to display the step-by-step encryption/decryption process
function displaySteps(steps) {
    const stepsList = document.getElementById('stepsList');
    stepsList.innerHTML = '';

    steps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        stepsList.appendChild(li);
    });
}
