"use strict";
function main() {
    console.log("Hello from script!");
}
function filterTransactions() {
    console.log("Filter called");
    var transactionCards = document.querySelectorAll("[data-transaction-card]");
    var descriptionSearchElement = document.querySelector("#description-search");
    var descriptionSearch = descriptionSearchElement === null ? "" : descriptionSearchElement.value;
    for (var i = 0; i < transactionCards.length; i++) {
        var transactionCard = transactionCards[i];
        if (!(transactionCard instanceof HTMLElement)) {
            continue;
        }
        var description = transactionCard.dataset.description;
        if (description === undefined) {
            continue;
        }
        if (description.toLowerCase().includes(descriptionSearch.toLowerCase())) {
            transactionCard.classList.remove("hide-card");
        }
        else {
            transactionCard.classList.add("hide-card");
        }
    }
}
document.addEventListener("DOMContentLoaded", main);
//# sourceMappingURL=script.js.map