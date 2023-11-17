package models

import (
	"strings"
	"transactionsui/database"
)

type TxData struct {
	Date        string  `json:"date"`
	Amount      float64 `json:"amount"`
	Code        string  `json:"code"`
	Description string  `json:"description"`
	Alias       string  `json:"alias"`
}

func DatabaseTransactionToTxData(
	transaction database.GetAllTransactionsRow,
) TxData {
	var txData TxData
	if transaction.IsPositive.Bool {
		txData.Amount = transaction.Amount.Float64
	} else {
		txData.Amount = -transaction.Amount.Float64
	}
	txData.Date = transaction.Date.String
	txData.Code = transaction.Code.String
	txData.Description = transaction.DescriptionText.String
	return txData
}

func DatabaseTransactionsToTxData(
	transactions []database.GetAllTransactionsRow,
	aliases []database.GetAliasesRow,
) []TxData {
	txData := make([]TxData, len(transactions))
	for i := range transactions {
		txData[i] = DatabaseTransactionToTxData(transactions[i])
	}
	attachAliases(txData, aliases)
	return txData
}

func attachAliases(
	transactions []TxData,
	aliases []database.GetAliasesRow,
) {
	for i := range transactions {
		for _, alias := range aliases {
			if strings.Contains(
				strings.ToLower(transactions[i].Description),
				strings.ToLower(alias.DescriptionText.String),
			) {
				transactions[i].Alias = alias.AliasText.String
			}
		}
	}
}
