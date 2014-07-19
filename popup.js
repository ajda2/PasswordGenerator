"use strict";

var PasswordGenerator = PasswordGenerator || {};

/**
 * Base app configuration
 * @type {{passwordInputId: string, lengthInputId: string, submitButtonId: string}}
 */
PasswordGenerator.config = {
    passwordInputId: 'password',
    lengthInputId:   'length',
    submitButtonId:  'submit'
};

/**
 * Sources from password will be generated
 * @type {{chars: string, numbers: string, czechChars: string, specialChars: string}}
 */
PasswordGenerator.passwordSources = {
    chars:        'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz',
    numbers:      '0123456789',
    czechChars:   'ěščřžýáíéů',
    specialChars: '+@#$%^&*()-_=[{]};:|,<.>/?~'
};

/**
 *  Generates random password from selected sources
 * @param length
 * @param useNumbers
 * @param useCzechChars
 * @param useSpecialChars
 * @returns {string}
 */
PasswordGenerator.generatePassword = function (length, useNumbers, useCzechChars, useSpecialChars) {
    var passwordInputString = PasswordGenerator.passwordSources.chars;
    var outputPassword = '';

    if (useNumbers) {
        passwordInputString += PasswordGenerator.passwordSources.numbers;
    }
    if (useCzechChars) {
        passwordInputString += PasswordGenerator.passwordSources.czechChars;
    }
    if (useSpecialChars) {
        passwordInputString += PasswordGenerator.passwordSources.specialChars;
    }

    for (var i = 0; i < length; i++) {
        outputPassword += passwordInputString[Math.round(Math.random() * (passwordInputString.length - 1))]
    }

    return outputPassword;
};

/**
 * Submit button click listener
 */
PasswordGenerator.submitButtonClickListener = function () {
    var passwordInput = document.getElementById(PasswordGenerator.config.passwordInputId);
    var lengthInput = document.getElementById(PasswordGenerator.config.lengthInputId);

    passwordInput.value = PasswordGenerator.generatePassword(lengthInput.value, true, true, true, true);
};

/**
 * Password input click listener
 */
PasswordGenerator.passwordInputFocus = function () {
    this.setSelectionRange(0, this.value.length);
};

/**
 * DOM loaded
 */
document.addEventListener('DOMContentLoaded', function () {
    var passwordInput = document.getElementById(PasswordGenerator.config.passwordInputId);
    var lengthInput = document.getElementById(PasswordGenerator.config.lengthInputId);
    var submitButton = document.getElementById(PasswordGenerator.config.submitButtonId);

    passwordInput.value = PasswordGenerator.generatePassword(lengthInput.value, true, true, true, true);
    submitButton.addEventListener('click', PasswordGenerator.submitButtonClickListener);
    passwordInput.addEventListener('click', PasswordGenerator.passwordInputFocus);
});
