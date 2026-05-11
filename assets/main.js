// Imports the password generator function (default export)
import passwordGenerator from "./password-generator.js";
import { imgRandomizer, getCredits, getImgUrl } from "./image-randomizer.js";

// Cache DOM elements used across the app
const btnGenerate = document.getElementById('btn-generate');
const btnReset = document.getElementById('btn-reset');
const btnCopy = document.getElementById('btn-copy');
const pwLengthInput = document.getElementById('pw-length');
const pwOutput = document.getElementById('pw-result');
const bodyImg = document.body;
const blurImg = document.getElementById('bg-img-blur');
const formImg = document.getElementById('img');
const imgCredits = document.getElementById('photo-credits');

// Keep length input numeric only across browsers (Firefox allows non-digit chars while typing)
function sanitizeLengthValue(value) {
    return value.replace(/\D/g, '');
}

pwLengthInput.addEventListener('beforeinput', function (event) {
    if (event.data !== null && /\D/.test(event.data)) {
        event.preventDefault();
    }
});

pwLengthInput.addEventListener('keydown', function (event) {
    if (['e', 'E', '+', '-', '.'].includes(event.key)) {
        event.preventDefault();
    }
});

pwLengthInput.addEventListener('paste', function (event) {
    const pastedText = event.clipboardData.getData('text');
    if (/\D/.test(pastedText)) {
        event.preventDefault();
    }
});

pwLengthInput.addEventListener('input', function () {
    const sanitizedValue = sanitizeLengthValue(pwLengthInput.value);
    if (pwLengthInput.value !== sanitizedValue) {
        pwLengthInput.value = sanitizedValue;
    }
});

// GENERATE BUTTON
// Handles password generation based on valid length input
btnGenerate.addEventListener('click', function () {
    // Hide the copy popover if it is currently shown
    const popover = bootstrap.Popover.getInstance(btnCopy);
    if (popover !== null) {
        popover.hide();
    }

    // Read and validate the password length input
    const lengthInput = pwLengthInput.value.trim();

    if (lengthInput.length === 0) {
        window.alert('Password length is required and must be a number between 4 and 20');
        return;
    } 

    const parsedLength = Number.parseInt(lengthInput, 10);

    if (!Number.isInteger(parsedLength)) {
        window.alert('Password length must be a number between 4 and 20');
        return;
    }

    // Validate length valid inputs
    if (parsedLength < 4 || parsedLength > 20) {
        window.alert('Password length must be between 4 and 20 characters');
        return;
    }
    // Generate password with user-defined length
    return pwOutput.innerHTML = passwordGenerator(parsedLength);
})


// RESET BUTTON – password output & popover cleanup
// Clears the generated password from the UI
btnReset.addEventListener('click', function () {
    pwOutput.innerHTML = '';
    pwLengthInput.value = '8';
    return;
});
// Disposes the copy popover instance if it exists
btnReset.addEventListener('click', function() {
    const popover = bootstrap.Popover.getInstance(btnCopy);
    if (popover !== null) {
        return popover.dispose();
    }
    return;
})


// COPY BUTTON
// Copies the password to the clipboard and provides visual feedback via a Bootstrap popover
btnCopy.addEventListener('click', function() {
    const popover = bootstrap.Popover.getInstance(btnCopy);
    // Do nothing if there is no password to copy
    if (pwOutput.innerHTML.length === 0) {
        return;
    } 
    // If a password exists and no popover instance yet:
    // create it and re-trigger click so Bootstrap can show it
    if (pwOutput.innerHTML.length !== 0 && popover === null) {
        new bootstrap.Popover(btnCopy);
        btnCopy.click(); // triggers Bootstrap's internal toggle
        navigator.clipboard.writeText(pwOutput.innerHTML);
        return;
    } 
    // If popover already exists, briefly hide and re-trigger it for visual feedback
    if (pwOutput.innerHTML.length !== 0 && popover !== null) {
       popover.hide();
       btnCopy.click();
       navigator.clipboard.writeText(pwOutput.innerHTML);
       return;
    }
})

// RANDOM BACKGROUND IMAGE
// Selects a random image and applies it across the UI
function setRandomImg () {
    // Pick a random image object (url + credits)
    const randomImg = imgRandomizer();
    // Apply image as page background
    bodyImg.style.backgroundImage = `url(${getImgUrl(randomImg)})`;
    document.body.style.opacity = 1;
    // Apply same image to the blurred background layer
    blurImg.style.backgroundImage = `url(${getImgUrl(randomImg)})`;
    // Set image source inside the img tag
    formImg.src = getImgUrl(randomImg);
    // Update photo credits dynamically
    imgCredits.innerHTML = getCredits(randomImg);
}
// Initialize random background on page load
setRandomImg();

