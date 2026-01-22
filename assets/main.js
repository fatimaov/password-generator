
import passwordGenerator from "./password-generator.js";

document.getElementById('btn-generate').addEventListener('click', function () {
    console.log(document.getElementById('pw-length').value);
    
    if (document.getElementById('pw-length').value.trim() === '') {
        const result = passwordGenerator();
        document.getElementById('pw-result').innerHTML = result;
    } else if ( document.getElementById('pw-length').value < 4 || document.getElementById('pw-length').value > 20) {
        window.alert('Password length must be between 4 and 20 characters');
        return;
    } 
    const result = passwordGenerator(document.getElementById('pw-length').value);
    document.getElementById('pw-result').innerHTML = result;

})

const pwField = document.getElementById('pw-field');

document.getElementById('btn-reset').onclick = () => {
    document.getElementById('pw-result').innerHTML = '';

    const popover = bootstrap.Popover.getInstance(pwField);
    if (popover) {
        popover.dispose();
    }
    pwField.removeAttribute('data-bs-container');
    pwField.removeAttribute('data-bs-toggle');
    pwField.removeAttribute('data-bs-placement');
    pwField.removeAttribute('data-bs-content');


};

document.getElementById('btn-copy').onclick = () => {
    const popover = bootstrap.Popover.getInstance(pwField);
    if (popover && document.getElementById('pw-result').innerHTML.length !== 0) {
        navigator.clipboard.writeText(document.getElementById('pw-result').innerHTML);
    } else if (document.getElementById('pw-result').innerHTML.length !== 0) {
        navigator.clipboard.writeText(document.getElementById('pw-result').innerHTML);
        pwField.dataset.bsContainer = 'body';
        pwField.dataset.bsToggle = 'popover';
        pwField.dataset.bsPlacement = 'right';
        pwField.dataset.bsContent = 'Copied!';
        new bootstrap.Popover(pwField);
        pwField.click()
    }
};
