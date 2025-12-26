// const promp = require('prompt-sync')();


function passwordGenerator(passwordLength = 8) {
    const lowerCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const upperCase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const symbols = ['!', '@', '#', '$', '%', '^', '*', '-', '_', '+'];

    const passwordArr = [];

    // Initialize the password array with the desired length.
    // All positions start as undefined and will be filled later.
    for (let i = 0; i < passwordLength; i += 1) {
        passwordArr.push(undefined);
    };

    // Helper function: checks if a given randIndex has already been used
    // in the poolIndex array.
    function isIndexUsed(index) {
        for (let i = 0; i < 4; i += 1) {
            if (index === poolIndex[i]) {
                return true;
            }
        }
        return false;
    };

    // Choose four unique random positions in the password array,
    // one for each character type (lower, upper, number, symbol).
    // This guarantees that every type appears at least once.
    const poolIndex = [];
    for (let i = 0; i < 4; i += 1) {
        let randIndex = Math.floor(Math.random() * passwordLength);
        if (!isIndexUsed(randIndex)) {
            poolIndex[i] = randIndex;
        } else {
            while (isIndexUsed(randIndex)) {
                randIndex = Math.floor(Math.random() * passwordLength);
            }
            poolIndex[i] = randIndex;
        }
    };


    // Place at least one character of each type at the chosen positions.
    passwordArr[poolIndex[0]] = lowerCase[Math.floor(Math.random() * 26)];
    passwordArr[poolIndex[1]] = upperCase[Math.floor(Math.random() * 26)];
    passwordArr[poolIndex[2]] = digits[Math.floor(Math.random() * 10)];
    passwordArr[poolIndex[3]] = symbols[Math.floor(Math.random() * 10)];

    // Fill the remaining undefined positions with random character types.
    for (let i = 0; i < passwordLength; i += 1) {
        if (passwordArr[i] === undefined) {
            const charTypeLeft = Math.floor(Math.random() * 4);
            if (charTypeLeft === 0) {
                passwordArr[i] = lowerCase[Math.floor(Math.random() * 26)];
            } else if (charTypeLeft === 1) {
                passwordArr[i] = upperCase[Math.floor(Math.random() * 26)];
            } else if (charTypeLeft === 2) {
                passwordArr[i] = digits[Math.floor(Math.random() * 10)];
            } else if (charTypeLeft === 3) {
                passwordArr[i] = symbols[Math.floor(Math.random() * 10)];
            }
        }
    }

    // Join the array into a single string and return the final password.
    return passwordArr.join('');

};

// let input = promp('Please, enter number of characters (min 4): ');

// while (input < 4) {
//     input = promp('Invalid number. Please, enter number of characters (min 4): ');
// } 

// console.log(passwordGenerator(Number(input)));


document.getElementById('btn-generate').addEventListener('click', function () {
    if (document.getElementById('pw-length').value < 4 || document.getElementById('pw-length').value > 20) {
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
