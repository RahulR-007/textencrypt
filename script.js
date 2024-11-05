// Function to handle file encryption and generate passkey file
function encryptFile() {
    const fileInput = document.getElementById('fileInputEncrypt');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please upload a file to encrypt!');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const fileContent = e.target.result;

        // Generate a random passkey
        const passkey = generateRandomPasskey();

        // Encrypt the file content using the passkey
        const encryptedText = encryptContent(fileContent, passkey);

        // Download the encrypted file
        downloadEncryptedFile(encryptedText);

        // Download the passkey file
        downloadPasskeyFile(passkey);
    };
    reader.readAsText(file);
}

// Function to handle file decryption with uploaded passkey
function decryptFile() {
    const fileInput = document.getElementById('fileInputDecrypt');
    const passkeyInput = document.getElementById('passkeyFileInput');
    const file = fileInput.files[0];
    const passkeyFile = passkeyInput.files[0];

    if (!file || !passkeyFile) {
        alert('Please upload both the encrypted file and the passkey file!');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const encryptedContent = e.target.result;

        // Read the passkey from the uploaded passkey file
        const passkeyReader = new FileReader();
        passkeyReader.onload = function(e) {
            const passkey = e.target.result.trim();  // Get the passkey and trim any extra spaces or newlines

            // Decrypt the file content using the passkey
            const decryptedText = decryptContent(encryptedContent, passkey);

            // Download the decrypted file
            downloadDecryptedFile(decryptedText);
        };
        passkeyReader.readAsText(passkeyFile);
    };
    reader.readAsText(file);
}

// Function to generate a random passkey
function generateRandomPasskey() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let passkey = '';
    const length = 16;  // Set the length of the passkey

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        passkey += characters[randomIndex];
    }
    return passkey;
}

// Function to encrypt content using Caesar Cipher + Passkey
function encryptContent(content, passkey) {
    let result = '';
    const shiftValue = calculateShift(passkey);  // Convert passkey to a shift value

    for (let i = 0; i < content.length; i++) {
        const char = content[i];
        let encryptedChar = char;

        // Encrypt alphabetic characters
        if (char.match(/[a-z]/i)) {
            const charCode = char.charCodeAt(0);
            let newCode;

            // Handle uppercase letters
            if (char >= 'A' && char <= 'Z') {
                newCode = ((charCode - 65 + shiftValue) % 26) + 65;
            }
            // Handle lowercase letters
            else if (char >= 'a' && char <= 'z') {
                newCode = ((charCode - 97 + shiftValue) % 26) + 97;
            }

            encryptedChar = String.fromCharCode(newCode);
        }

        result += encryptedChar;
    }
    return result;
}

// Function to decrypt content using Caesar Cipher + Passkey
function decryptContent(content, passkey) {
    let result = '';
    const shiftValue = calculateShift(passkey);  // Convert passkey to a shift value

    for (let i = 0; i < content.length; i++) {
        const char = content[i];
        let decryptedChar = char;

        // Decrypt alphabetic characters
        if (char.match(/[a-z]/i)) {
            const charCode = char.charCodeAt(0);
            let newCode;

            // Handle uppercase letters
            if (char >= 'A' && char <= 'Z') {
                newCode = ((charCode - 65 - shiftValue + 26) % 26) + 65;
            }
            // Handle lowercase letters
            else if (char >= 'a' && char <= 'z') {
                newCode = ((charCode - 97 - shiftValue + 26) % 26) + 97;
            }

            decryptedChar = String.fromCharCode(newCode);
        }

        result += decryptedChar;
    }
    return result;
}

// Function to calculate the shift value based on the passkey
function calculateShift(passkey) {
    let shiftValue = 0;
    for (let i = 0; i < passkey.length; i++) {
        shiftValue += passkey.charCodeAt(i);  // Sum the ASCII values of each character
    }
    return shiftValue % 26;  // Use modulo to ensure shift value stays between 0 and 25
}

// Function to generate the encrypted file and display download link
function downloadEncryptedFile(content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const downloadLink = document.getElementById('downloadLinkEncrypt');

    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'encrypted.txt';  // Set the download filename

    // Show the download section
    document.getElementById('downloadSectionEncrypt').style.display = 'block';
}

// Function to generate the passkey file and display download link
function downloadPasskeyFile(passkey) {
    const blob = new Blob([passkey], { type: 'text/plain' });
    const downloadLink = document.getElementById('downloadLinkPasskey');

    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'passkey.txt';  // Set the download filename

    // Show the download section for the passkey
    document.getElementById('downloadSectionPasskey').style.display = 'block';
}

// Function to generate the decrypted file and display download link
function downloadDecryptedFile(content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const downloadLink = document.getElementById('downloadLinkDecrypt');

    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'decrypted.txt';  // Set the download filename

    // Show the download section
    document.getElementById('downloadSectionDecrypt').style.display = 'block';
}
