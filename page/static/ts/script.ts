function main() {
    console.log("Hello from script!");
}

function filterTransactions() {
    console.log("Filter called");
    let transactionCards = document.querySelectorAll("[data-transaction-card]");
    const descriptionSearchElement = document.querySelector<HTMLInputElement>("#description-search");
    const descriptionSearch = descriptionSearchElement === null ? "" : descriptionSearchElement.value;
    for (let i=0; i<transactionCards.length; i++) {
        const transactionCard = transactionCards[i];
        if (!(transactionCard instanceof HTMLElement)) {
            continue;
        }
        const description = transactionCard.dataset.description;
        if (description === undefined) {
            continue;
        }
        if (description.toLowerCase().includes(descriptionSearch.toLowerCase())) {
            transactionCard.classList.remove("hide-card");
        } else {
            transactionCard.classList.add("hide-card");
        }
    }
}

document.addEventListener("DOMContentLoaded", main);
