"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var transactionCards;
var sumBox;
var sumAmountElement;
var sumAmount = 0;
var inputValues = {
    description: { text: "", num: 0, none: true },
    minAmount: { text: "", num: 0, none: true },
    maxAmount: { text: "", num: 0, none: true },
    startDate: { text: "", num: 0, none: true },
    endDate: { text: "", num: 0, none: true },
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
    minAmountInput.addEventListener("keyup", minAmountChange);
    var maxAmountInput = document.querySelector("#max-amount-search");
    maxAmountInput.addEventListener("keyup", maxAmountChange);
    var descriptionInput = document.querySelector("#description-search");
    descriptionInput.addEventListener("keyup", descriptionChange);
    var startDateInput = document.querySelector("#start-date-search");
    startDateInput.addEventListener("change", startDateChange);
    var endDateInput = document.querySelector("#end-date-search");
    endDateInput.addEventListener("change", endDateChange);
    transactionCards = document.querySelectorAll("[data-transaction-card]");
    sumAmountElement =
        document.querySelector("span#sum-amount");
    sumBox = document.querySelector("div#sum-box");
    runUpdates();
}
function runUpdates() {
    filterCards();
    sumAmountElement.innerText = sumAmount.toString();
    if (sumAmount > 0) {
        sumBox.classList.add("text-warning");
        sumBox.classList.remove("text-red-800");
    }
    else {
        sumBox.classList.add("text-red-800");
        sumBox.classList.remove("text-warning");
    }
}
function filterCards() {
    sumAmount = 0;
    for (var i = 0; i < transactionCards.length; i++) {
        var transactionCard = transactionCards[i];
        if (!(transactionCard instanceof HTMLElement)) {
            continue;
        }
        if (cardMatches(transactionCard)) {
            transactionCard.classList.remove("hide-card");
            sumAmount += parseInt(transactionCard.dataset.amount);
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
    var _a, _b;
    inputMatches.minAmount = updateMatch(inputValues.minAmount, wrapPageValue(transactionCard.dataset.amount), function (inputValue, pageValue) {
        var amount = parseFloat(pageValue.text);
        if (isNaN(amount)) {
            return true;
        }
        return amount >= inputValue.num;
    });
    inputMatches.maxAmount = updateMatch(inputValues.maxAmount, wrapPageValue(transactionCard.dataset.amount), function (inputValue, pageValue) {
        var amount = parseFloat(pageValue.text);
        if (isNaN(amount)) {
            return true;
        }
        return amount <= inputValue.num;
    });
    inputMatches.startDate = updateMatch(inputValues.startDate, wrapPageValue(transactionCard.dataset.date), function (inputValue, pageValue) {
        return pageValue.text >= inputValue.text;
    });
    inputMatches.endDate = updateMatch(inputValues.endDate, wrapPageValue(transactionCard.dataset.date), function (inputValue, pageValue) {
        return pageValue.text <= inputValue.text;
    });
    var descriptionText = (_a = transactionCard.dataset.description) !== null && _a !== void 0 ? _a : "";
    var aliasText = (_b = transactionCard.dataset.alias) !== null && _b !== void 0 ? _b : "";
    if (aliasText !== "") {
        descriptionText += " " + aliasText;
    }
    inputMatches.description = updateMatch(inputValues.description, { text: descriptionText, none: false }, function (inputValue, pageValue) {
        return pageValue.text
            .toLowerCase()
            .includes(inputValue.text.toLowerCase());
    });
}
function updateMatch(inputValue, pageValue, comparison) {
    if (inputValue.none) {
        return true;
    }
    if (pageValue.none) {
        return true;
    }
    return comparison(inputValue, pageValue);
}
function wrapPageValue(v) {
    if (v === undefined) {
        return {
            text: "",
            none: true,
        };
    }
    return {
        text: v,
        none: false,
    };
}
function descriptionChange() {
    var descriptionSearchElement = document.querySelector("#description-search");
    if (descriptionSearchElement !== null) {
        inputValues.description = {
            text: descriptionSearchElement.value,
            num: 0,
            none: false,
        };
    }
    else {
        inputValues.description = __assign(__assign({}, inputValues.description), { none: true });
    }
    if (inputValues.description.none) {
        return;
    }
    runUpdates();
}
function minAmountChange() {
    var _a;
    var minAmountElement = document.querySelector("#min-amount-search");
    var minAmountElementValue = (_a = minAmountElement === null || minAmountElement === void 0 ? void 0 : minAmountElement.value) !== null && _a !== void 0 ? _a : "";
    var minAmount = parseFloat(minAmountElementValue);
    if (isNaN(minAmount)) {
        inputValues.minAmount = __assign(__assign({}, inputValues.minAmount), { none: true });
    }
    else {
        inputValues.minAmount = { text: "", num: minAmount, none: false };
    }
    if (inputValues.minAmount.none) {
        return;
    }
    runUpdates();
}
function maxAmountChange() {
    var _a;
    var maxAmountElement = document.querySelector("#max-amount-search");
    var maxAmountElementValue = (_a = maxAmountElement === null || maxAmountElement === void 0 ? void 0 : maxAmountElement.value) !== null && _a !== void 0 ? _a : "";
    var maxAmount = parseFloat(maxAmountElementValue);
    if (isNaN(maxAmount)) {
        inputValues.maxAmount = __assign(__assign({}, inputValues.maxAmount), { none: true });
    }
    else {
        inputValues.maxAmount = { text: "", num: maxAmount, none: false };
    }
    if (inputValues.maxAmount.none) {
        return;
    }
    runUpdates();
}
function startDateChange() {
    var startDateElement = document.querySelector("#start-date-search");
    var startDateElementValue = startDateElement === null || startDateElement === void 0 ? void 0 : startDateElement.value;
    if (startDateElementValue === undefined || startDateElementValue === "") {
        inputValues.startDate = __assign(__assign({}, inputValues.startDate), { none: true });
    }
    else {
        inputValues.startDate = {
            text: startDateElementValue,
            num: 0,
            none: false,
        };
    }
    if (inputValues.startDate.none) {
        return;
    }
    runUpdates();
}
function endDateChange() {
    var endDateElement = document.querySelector("#end-date-search");
    var endDateElementValue = endDateElement === null || endDateElement === void 0 ? void 0 : endDateElement.value;
    if (endDateElementValue === undefined || endDateElementValue === "") {
        inputValues.endDate = __assign(__assign({}, inputValues.endDate), { none: true });
    }
    else {
        inputValues.endDate = {
            text: endDateElementValue,
            num: 0,
            none: false,
        };
    }
    if (inputValues.endDate.none) {
        return;
    }
    runUpdates();
}
function clearInputValues() {
    var descriptionSearchElement = document.querySelector("#description-search");
    if (descriptionSearchElement !== null) {
        descriptionSearchElement.value = "";
    }
}
document.addEventListener("DOMContentLoaded", main);
//# sourceMappingURL=script.js.map