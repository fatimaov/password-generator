// Imports the password generator function (default export)
import passwordGenerator from "./password-generator.js";

// Cache DOM elements used across the app
const btnGenerate = document.getElementById('btn-generate');
const btnReset = document.getElementById('btn-reset');
const btnCopy = document.getElementById('btn-copy');
const pwOutput = document.getElementById('pw-result');


// GENERATE BUTTON
// Handles password generation based on valid length input
btnGenerate.addEventListener('click', function () {
    // Hide the copy popover if it is currently shown
    const popover = bootstrap.Popover.getInstance(btnCopy);
    if (popover !== null) {
        popover.hide();
    }

    // Read and format the password length input
    const pwLengthInput = document.getElementById('pw-length').value.trim();
    // If no length is provided, generate a password with default length
    if (pwLengthInput.length === 0) {
        return pwOutput.innerHTML = passwordGenerator();
    } 
    // Validate length valid inputs
    if (pwLengthInput < 4 || pwLengthInput > 20) {
        window.alert('Password length must be between 4 and 20 characters');
        return;
    }
    // Generate password with user-defined length
    return pwOutput.innerHTML = passwordGenerator(pwLengthInput);
})


// RESET BUTTON – password output & popover cleanup
// Clears the generated password from the UI
btnReset.addEventListener('click', function () {
    return pwOutput.innerHTML = '';
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
