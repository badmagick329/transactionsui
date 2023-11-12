interface InputValue {
    text: string;
    num: number;
    none: boolean;
}
interface PageValue {
    text: string;
    none: boolean;
}

type ComparisonFunc = (a: InputValue, b: PageValue) => boolean;

interface InputValues {
    description: InputValue;
    minAmount: InputValue;
    maxAmount: InputValue;
    startDate: InputValue;
    endDate: InputValue;
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
    description: { text: "", num: 0, none: true },
    minAmount: { text: "", num: 0, none: true },
    maxAmount: { text: "", num: 0, none: true },
    startDate: { text: "", num: 0, none: true },
    endDate: { text: "", num: 0, none: true },
};

let inputMatches: InputMatches = {
    description: false,
    minAmount: false,
    maxAmount: false,
    startDate: false,
    endDate: false,
};

function main() {
    const minAmountInput =
        document.querySelector<HTMLInputElement>("#min-amount-search");
    if (minAmountInput !== null) {
        minAmountInput.addEventListener("keyup", minAmountChange);
    }
    const maxAmountInput =
        document.querySelector<HTMLInputElement>("#max-amount-search");
    if (maxAmountInput !== null) {
        maxAmountInput.addEventListener("keyup", maxAmountChange);
    }
    const descriptionInput = document.querySelector<HTMLInputElement>(
        "#description-search"
    );
    if (descriptionInput !== null) {
        descriptionInput.addEventListener("keyup", descriptionChange);
    }
    const startDateInput =
        document.querySelector<HTMLInputElement>("#start-date-search");
    if (startDateInput !== null) {
        startDateInput.addEventListener("keyup", startDateChange);
    }
    const endDateInput =
        document.querySelector<HTMLInputElement>("#end-date-search");
    if (endDateInput !== null) {
        endDateInput.addEventListener("keyup", endDateChange);
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
    inputMatches.minAmount = runMatch(
        inputValues.minAmount,
        wrapPageValue(transactionCard.dataset.amount),
        (inputValue, pageValue) => {
            const amount = parseFloat(pageValue.text);
            if (isNaN(amount)) {
                return true;
            }
            return amount >= inputValue.num;
        }
    );
    inputMatches.maxAmount = runMatch(
        inputValues.maxAmount,
        wrapPageValue(transactionCard.dataset.amount),
        (inputValue, pageValue) => {
            const amount = parseFloat(pageValue.text);
            if (isNaN(amount)) {
                return true;
            }
            return amount <= inputValue.num;
        }
    );
    inputMatches.startDate = runMatch(
        inputValues.startDate,
        wrapPageValue(transactionCard.dataset.date),
        (inputValue, pageValue) => {
            return pageValue.text >= inputValue.text;
        }
    );
    inputMatches.endDate = runMatch(
        inputValues.endDate,
        wrapPageValue(transactionCard.dataset.date),
        (inputValue, pageValue) => {
            return pageValue.text <= inputValue.text;
        }
    );
    let descriptionText = transactionCard.dataset.description ?? "";
    let aliasText = transactionCard.dataset.alias ?? "";
    if (aliasText !== "") {
        descriptionText += " " + aliasText;
    }
    inputMatches.description = runMatch(
        inputValues.description,
        { text: descriptionText, none: false },
        (inputValue, pageValue) => {
            return pageValue.text
                .toLowerCase()
                .includes(inputValue.text.toLowerCase());
        }
    );
}

function runMatch(
    inputValue: InputValue,
    pageValue: PageValue,
    comparison: ComparisonFunc
) {
    if (inputValue.none) {
        return true;
    }
    if (pageValue.none) {
        return true;
    }
    return comparison(inputValue, pageValue);
}

function wrapPageValue(v: string | undefined): PageValue {
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
    const descriptionSearchElement = document.querySelector<HTMLInputElement>(
        "#description-search"
    );
    if (descriptionSearchElement !== null) {
        inputValues.description = {
            text: descriptionSearchElement.value,
            num: 0,
            none: false,
        };
    } else {
        inputValues.description = { ...inputValues.description, none: true };
    }
    if (inputValues.description.none) {
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
        inputValues.minAmount = { ...inputValues.minAmount, none: true };
    } else {
        inputValues.minAmount = { text: "", num: minAmount, none: false };
    }
    if (inputValues.minAmount.none) {
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
        inputValues.maxAmount = { ...inputValues.maxAmount, none: true };
    } else {
        inputValues.maxAmount = { text: "", num: maxAmount, none: false };
    }
    if (inputValues.maxAmount.none) {
        return;
    }
    filterCards();
}

function startDateChange() {
    const startDateElement =
        document.querySelector<HTMLInputElement>("#start-date-search");
    const startDateElementValue = startDateElement?.value;
    if (startDateElementValue === undefined) {
        inputValues.startDate = { ...inputValues.startDate, none: true };
    } else {
        inputValues.startDate = {
            text: startDateElementValue,
            num: 0,
            none: false,
        };
    }
    if (inputValues.startDate.none) {
        return;
    }
    filterCards();
}

function endDateChange() {
    const endDateElement =
        document.querySelector<HTMLInputElement>("#start-date-search");
    const endDateElementValue = endDateElement?.value;
    if (endDateElementValue === undefined) {
        inputValues.endDate = { ...inputValues.endDate, none: true };
    } else {
        inputValues.endDate = {
            text: endDateElementValue,
            num: 0,
            none: false,
        };
    }
    if (inputValues.endDate.none) {
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
