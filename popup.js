"use strict";

var PasswordGenerator = PasswordGenerator || {};

/**
 * Base app configuration
 * @type {{passwordInputId: string, lengthInputId: string, submitButtonId: string}}
 */
PasswordGenerator.config = {
    passwordInputId:           'password',
    lengthInputId:             'length',
    submitButtonId:            'submit',
    settingsButtonId:          'settingsButton',
    settingsHolderId:          'settingsHolder',
    settingsButtonActiveClass: 'active',
    settingButtons:            {
        involveNumbersInputId:      'settingsInvolveNumbers',
        involveCzechCharsInputId:   'settingsInvolveCzechChars',
        involveSpecialCharsInputId: 'settingsInvolveSpecialChars'
    }
};

/**
 * Settings for output password
 * @type {{involveNumbers: boolean, involveCzechChars: boolean, involveSpecialChars: boolean, passwordLength: number}}
 */
PasswordGenerator.passwordSettings = {
    involveNumbers:      true,
    involveCzechChars:   true,
    involveSpecialChars: true,
    passwordLength:      18
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
    var involveNumbersInput = document.getElementById(PasswordGenerator.config.settingButtons.involveNumbersInputId);
    var involveCzechInput = document.getElementById(PasswordGenerator.config.settingButtons.involveCzechCharsInputId);
    var involveSpecialInput = document.getElementById(PasswordGenerator.config.settingButtons.involveSpecialCharsInputId);

    PasswordGenerator.passwordSettings.passwordLength = lengthInput.value;
    PasswordGenerator.passwordSettings.involveNumbers = involveNumbersInput.checked;
    PasswordGenerator.passwordSettings.involveCzechChars = involveCzechInput.checked;
    PasswordGenerator.passwordSettings.involveSpecialChars = involveSpecialInput.checked;

    passwordInput.value = PasswordGenerator.generatePassword(
        PasswordGenerator.passwordSettings.passwordLength,
        PasswordGenerator.passwordSettings.involveNumbers,
        PasswordGenerator.passwordSettings.involveCzechChars,
        PasswordGenerator.passwordSettings.involveSpecialChars
    );
};

/**
 * Password input click listener
 */
PasswordGenerator.passwordInputFocus = function () {
    this.setSelectionRange(0, this.value.length);
};

/**
 * Settings button click listener
 */
PasswordGenerator.settingsButtonListener = function () {
    var settingsHolder = document.getElementById(PasswordGenerator.config.settingsHolderId);

    if (PasswordGenerator.hasClass(this, PasswordGenerator.config.settingsButtonActiveClass)) {
        PasswordGenerator.removeClass(settingsHolder, PasswordGenerator.config.settingsButtonActiveClass);
        PasswordGenerator.removeClass(this, PasswordGenerator.config.settingsButtonActiveClass);
    }
    else {
        PasswordGenerator.addClass(settingsHolder, PasswordGenerator.config.settingsButtonActiveClass);
        PasswordGenerator.addClass(this, PasswordGenerator.config.settingsButtonActiveClass);
    }
};

/**
 * Pure JavaScript Element has class check
 * @param el
 * @param className
 * @return {Boolean}
 */
PasswordGenerator.hasClass = function (el, className) {
    var className = " " + className + " ";
    var elemClassName = el.getAttribute("class");
    if ((" " + elemClassName + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1) {
        return true;
    }

    return false;
}

/**
 * Add class to element
 * @param el
 * @param className
 */
PasswordGenerator.addClass = function (el, className) {
    el.className = el.className.replace(className, ""); // first remove the class name if that already exists
    el.className = el.className + className;
};

/**
 * Remove class to element
 * @param el
 * @param className
 */
PasswordGenerator.removeClass = function (el, className) {
    el.className = el.className.replace(className, ""); // first remove the class name if that already exists
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

    document.getElementById(PasswordGenerator.config.settingsButtonId).addEventListener('click', PasswordGenerator.settingsButtonListener);
});
