interface InputValues {
    description: string | null;
    minAmount: number | null;
    maxAmount: number | null;
    startDate: string | null;
    endDate: string | null;
}

interface InputMatches {
    description: boolean;
    minAmount: boolean;
    maxAmount: boolean;
    startDate: boolean;
    endDate: boolean;
}


let transactionCards: NodeListOf<Element>;

let inputValues: InputValues = {
    description: null,
    minAmount: null,
    maxAmount: null,
    startDate: null,
    endDate: null,
};

let inputMatches: InputMatches = {
    description: false,
    minAmount: false,
    maxAmount: false,
    startDate: false,
    endDate: false,
};

function main() {
    const minAmountInput = document.querySelector<HTMLInputElement>(
        "#min-amount-search"
    );
    if (minAmountInput !== null) {
        minAmountInput.addEventListener("change", minAmountChange);
    }
    const maxAmountInput = document.querySelector<HTMLInputElement>(
        "#max-amount-search"
    );
    if (maxAmountInput !== null) {
        maxAmountInput.addEventListener("change", maxAmountChange);
    }
    transactionCards = document.querySelectorAll("[data-transaction-card]");
}

function filterCards() {
    for (let i = 0; i < transactionCards.length; i++) {
        const transactionCard = transactionCards[i];
        if (!(transactionCard instanceof HTMLElement)) {
            continue;
        }
        if (cardMatches(transactionCard)) {
            transactionCard.classList.remove("hide-card");
        } else {
            transactionCard.classList.add("hide-card");
        }
    }
}

function cardMatches(transactionCard: HTMLElement) {
    updateMatches(transactionCard, inputValues, inputMatches);
    return (
        inputMatches.description &&
        inputMatches.minAmount &&
        inputMatches.maxAmount &&
        inputMatches.startDate &&
        inputMatches.endDate
    );
}

function updateMatches(
    transactionCard: HTMLElement,
    inputValues: InputValues,
    inputMatches: InputMatches
) {
    const amount = parseFloat(transactionCard.dataset.amount ?? "");
    if (isNaN(amount)) {
        inputMatches.minAmount = true;
        inputMatches.maxAmount = true;
    } else {
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
    const descriptionSearchElement = document.querySelector<HTMLInputElement>(
        "#description-search"
    );
    if (descriptionSearchElement !== null) {
        let descriptionText = transactionCard.dataset.description ?? "";
        let aliasText = transactionCard.dataset.alias ?? "";
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
    const descriptionSearchElement = document.querySelector<HTMLInputElement>(
        "#description-search"
    );
    if (descriptionSearchElement !== null) {
        inputValues.description = descriptionSearchElement.value;
    }
    if (inputValues.description === null) {
        return;
    }
    filterCards();
}


function minAmountChange() {
    const minAmountElement =
        document.querySelector<HTMLInputElement>("#min-amount-search");
    const minAmountElementValue = minAmountElement?.value ?? "";
    const minAmount = parseFloat(minAmountElementValue);
    if (isNaN(minAmount)) {
        inputValues.minAmount = null;
    } else {
        inputValues.minAmount = minAmount;
    }
    if (inputValues.minAmount === null) {
        return;
    }
    filterCards();
}

function maxAmountChange() {
    const maxAmountElement =
        document.querySelector<HTMLInputElement>("#max-amount-search");
    const maxAmountElementValue = maxAmountElement?.value ?? "";
    const maxAmount = parseFloat(maxAmountElementValue);
    if (isNaN(maxAmount)) {
        inputValues.maxAmount = null;
    } else {
        inputValues.maxAmount = maxAmount;
    }
    if (inputValues.maxAmount === null) {
        return;
    }
    filterCards();
}

function startDateChange() {
    const startDateElement =
        document.querySelector<HTMLInputElement>("#start-date-search");
    const startDateElementValue = startDateElement?.value ?? "";
    inputValues.startDate = startDateElementValue;
    if (inputValues.startDate === null) {
        return;
    }
    filterCards();
}

function endDateChange() {
    const endDateElement =
        document.querySelector<HTMLInputElement>("#start-date-search");
    const endDateElementValue = endDateElement?.value ?? "";
    inputValues.endDate = endDateElementValue;
    if (inputValues.endDate === null) {
        return;
    }
    filterCards();
}

function clearInputValues() {
    const descriptionSearchElement = document.querySelector<HTMLInputElement>(
        "#description-search"
    );
    if (descriptionSearchElement !== null) {
        descriptionSearchElement.value = "";
    }
}

document.addEventListener("DOMContentLoaded", main);
