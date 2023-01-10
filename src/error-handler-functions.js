export function decideIfRadioInputErrorNeedsDisplaying(regionRadioInputElements, container) {
    const ifUserSelectedTheRegion = regionRadioInputElements.some(element => element.checked);
    if (!ifUserSelectedTheRegion) {
        displayRadioInputError(container, regionRadioInputElements);
    }
}

export function displayRadioInputError(container, regionRadioInputElements) {
    console.log("inside displayRadioInputError function");
    const lightRedColor = "#fab7ac";
    container.style.backgroundColor = lightRedColor;

    regionRadioInputElements.forEach(element => {
        element.addEventListener("change", removeError);
    })
}

export function displayKeyboardInputError(container, inputElement) {
    console.log("inside displayKeyboardInputError function");
    const lightRedColor = "#fab7ac";
    container.style.backgroundColor = lightRedColor;

    inputElement.addEventListener("change", removeError);
}

export function removeError(e) {
    console.log("inside the removeError function");
    const container = e.target.parentNode.parentNode;
    const lightBlueColor = "#eef4fd";
    container.style.backgroundColor = lightBlueColor;
}