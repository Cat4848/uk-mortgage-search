import {decideIfRadioInputErrorNeedsDisplaying, displayRadioInputError, displayKeyboardInputError, removeError} from "/error-handler-functions.js";

let userInputGlobalInformation = {};

window.onload = main;

function main(e) {
    e.preventDefault();
    const resultsButton = document.getElementById("results-button");
    resultsButton.addEventListener("click", collectRegionInput);
}

function collectRegionInput() {
    const regionContainer = document.getElementById("select-region-container");
    const regionRadioInputElements = Array.from(document.getElementsByName("region-radio-input"));
    let userSelectedRegion = "";

    regionRadioInputElements.forEach(element => {
        if (element.checked) {
            userSelectedRegion = element.value;
        }
    })
    userInputGlobalInformation.location = userSelectedRegion;
    decideIfRadioInputErrorNeedsDisplaying(regionRadioInputElements, regionContainer);
    collectPropertyValueInput(userInputGlobalInformation); 
}

function collectPropertyValueInput() {
    const propertyValueContainer = document.getElementById("property-value-container");
    const propertyValueInputElement = document.getElementById("property-value-input");
    const propertyValueInput = propertyValueInputElement.value;

    if (propertyValueInput) {
        userInputGlobalInformation.propertyValue = propertyValueInput;
    } else {
        displayKeyboardInputError(propertyValueContainer, propertyValueInputElement);
    }
    collectMortgageAmount();
}

function collectMortgageAmount() {
    const mortgageAmountContainer = document.getElementById("mortgage-details");
    const mortgageAmountInputElement = document.getElementById("mortgage-amount-value");
    const mortgageAmountValue = mortgageAmountInputElement.value;

    if (mortgageAmountValue) {
        userInputGlobalInformation.mortgageAmount = mortgageAmountValue;
    } else {
        displayKeyboardInputError(mortgageAmountContainer, mortgageAmountInputElement);
    }
    collectTermLength();
}

function collectTermLength() {
    const mortgageTermContainer = document.getElementById("mortgage-term");
    const mortgageTermInputElement = document.getElementById("mortgage-term-value");
    const mortgageTermValue = mortgageTermInputElement.value;

    if (mortgageTermValue) {
        userInputGlobalInformation.repaymentPeriod = mortgageTermValue;
    } else {
        displayKeyboardInputError(mortgageTermContainer, mortgageTermInputElement);
    }
    collectMortgageRepaymentMethod();
}

function collectMortgageRepaymentMethod() {
    const mortgageRepaymentMethodContainer = document.getElementById("repayment-method");
    const mortgageRepaymentMethodRadioInputElements = Array.from(document.getElementsByName("repayment-method"));
    let userMortgageRepaymentMethod = "";

    mortgageRepaymentMethodRadioInputElements.forEach(element => {
        if (element.checked) {
            userMortgageRepaymentMethod = element.value;
        }
    })
    userInputGlobalInformation.filterByPaymentType = userMortgageRepaymentMethod;
    decideIfRadioInputErrorNeedsDisplaying(mortgageRepaymentMethodRadioInputElements, mortgageRepaymentMethodContainer);
    collectMortgageType();
}

function collectMortgageType() {
    const mortgageTypeContainer = document.getElementById("mortgage-type");
    const mortgageTypeRadioInputElements = Array.from(document.getElementsByName("mortgage-type"));
    let userMortgageTypeSelection = "";

    mortgageTypeRadioInputElements.forEach(element => {
        if (element.checked) {
            userMortgageTypeSelection = element.value;
        }
    })
    userInputGlobalInformation.filterByRateType = userMortgageTypeSelection;
    decideIfRadioInputErrorNeedsDisplaying(mortgageTypeRadioInputElements, mortgageTypeContainer);
    collectTermDeal();
}

function collectTermDeal() {
    const termDealContainer = document.getElementById("term-deal");
    const termDealRadioInputElements = Array.from(document.getElementsByName("term-deal"));
    let userTermDealSelection = "";

    termDealRadioInputElements.forEach(element => {
        if (element.checked) {
            userTermDealSelection = element.value;
        }
    })
    userInputGlobalInformation.filterByInitialPeriod = userTermDealSelection;
    decideIfRadioInputErrorNeedsDisplaying(termDealRadioInputElements, termDealContainer);

    postUserInput();
}

async function postUserInput() {
    const request = await fetch("/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInputGlobalInformation)
    })
}