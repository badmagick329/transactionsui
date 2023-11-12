"use strict";
var transactionCards;
var inputValues = {
    description: null,
    minAmount: null,
    maxAmount: null,
    startDate: null,
    endDate: null,
};
var inputMatches = {
    description: false,
    minAmount: false,
    maxAmount: false,
    startDate: false,
    endDate: false,
};
function main() {
    var minAmountInput = document.querySelector("#min-amount-search");
    if (minAmountInput !== null) {
        minAmountInput.addEventListener("change", minAmountChange);
    }
    var maxAmountInput = document.querySelector("#max-amount-search");
    if (maxAmountInput !== null) {
        maxAmountInput.addEventListener("change", maxAmountChange);
    }
    transactionCards = document.querySelectorAll("[data-transaction-card]");
}
function filterCards() {
    for (var i = 0; i < transactionCards.length; i++) {
        var transactionCard = transactionCards[i];
        if (!(transactionCard instanceof HTMLElement)) {
            continue;
        }
        if (cardMatches(transactionCard)) {
            transactionCard.classList.remove("hide-card");
        }
        else {
            transactionCard.classList.add("hide-card");
        }
    }
}
function cardMatches(transactionCard) {
    updateMatches(transactionCard, inputValues, inputMatches);
    return (inputMatches.description &&
        inputMatches.minAmount &&
        inputMatches.maxAmount &&
        inputMatches.startDate &&
        inputMatches.endDate);
}
function updateMatches(transactionCard, inputValues, inputMatches) {
    var _a, _b, _c;
    var amount = parseFloat((_a = transactionCard.dataset.amount) !== null && _a !== void 0 ? _a : "");
    if (isNaN(amount)) {
        inputMatches.minAmount = true;
        inputMatches.maxAmount = true;
    }
    else {
        inputMatches.minAmount =
            inputValues.minAmount === null || amount >= inputValues.minAmount;
        inputMatches.maxAmount =
            inputValues.maxAmount === null || amount <= inputValues.maxAmount;
    }
    inputMatches.startDate =
        inputValues.startDate === null ||
            transactionCard.dataset.date === undefined ||
            transactionCard.dataset.date >= inputValues.startDate;
    inputMatches.endDate =
        inputValues.endDate === null ||
            transactionCard.dataset.date === undefined ||
            transactionCard.dataset.date <= inputValues.endDate;
    var descriptionSearchElement = document.querySelector("#description-search");
    if (descriptionSearchElement !== null) {
        var descriptionText = (_b = transactionCard.dataset.description) !== null && _b !== void 0 ? _b : "";
        var aliasText = (_c = transactionCard.dataset.alias) !== null && _c !== void 0 ? _c : "";
        if (aliasText !== "") {
            descriptionText += " " + aliasText;
        }
        inputMatches.description =
            inputValues.description === null ||
                descriptionText
                    .toLowerCase()
                    .includes(inputValues.description.toLowerCase());
    }
}
function descriptionChange() {
    var descriptionSearchElement = document.querySelector("#description-search");
    if (descriptionSearchElement !== null) {
        inputValues.description = descriptionSearchElement.value;
    }
    if (inputValues.description === null) {
        return;
    }
    filterCards();
}
function minAmountChange() {
    var _a;
    var minAmountElement = document.querySelector("#min-amount-search");
    var minAmountElementValue = (_a = minAmountElement === null || minAmountElement === void 0 ? void 0 : minAmountElement.value) !== null && _a !== void 0 ? _a : "";
    var minAmount = parseFloat(minAmountElementValue);
    if (isNaN(minAmount)) {
        inputValues.minAmount = null;
    }
    else {
        inputValues.minAmount = minAmount;
    }
    if (inputValues.minAmount === null) {
        return;
    }
    filterCards();
}
function maxAmountChange() {
    var _a;
    var maxAmountElement = document.querySelector("#max-amount-search");
    var maxAmountElementValue = (_a = maxAmountElement === null || maxAmountElement === void 0 ? void 0 : maxAmountElement.value) !== null && _a !== void 0 ? _a : "";
    var maxAmount = parseFloat(maxAmountElementValue);
    if (isNaN(maxAmount)) {
        inputValues.maxAmount = null;
    }
    else {
        inputValues.maxAmount = maxAmount;
    }
    if (inputValues.maxAmount === null) {
        return;
    }
    filterCards();
}
function startDateChange() {
    var _a;
    var startDateElement = document.querySelector("#start-date-search");
    var startDateElementValue = (_a = startDateElement === null || startDateElement === void 0 ? void 0 : startDateElement.value) !== null && _a !== void 0 ? _a : "";
    inputValues.startDate = startDateElementValue;
    if (inputValues.startDate === null) {
        return;
    }
    filterCards();
}
function endDateChange() {
    var _a;
    var endDateElement = document.querySelector("#start-date-search");
    var endDateElementValue = (_a = endDateElement === null || endDateElement === void 0 ? void 0 : endDateElement.value) !== null && _a !== void 0 ? _a : "";
    inputValues.endDate = endDateElementValue;
    if (inputValues.endDate === null) {
        return;
    }
    filterCards();
}
function clearInputValues() {
    var descriptionSearchElement = document.querySelector("#description-search");
    if (descriptionSearchElement !== null) {
        descriptionSearchElement.value = "";
    }
}
document.addEventListener("DOMContentLoaded", main);
//# sourceMappingURL=script.js.map