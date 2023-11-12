package utils

import (
	"slices"
	"strings"
	"transactionsui/database"
)

type TransactionData struct {
	Date        string
	Amount      float64
	Code        string
	Description string
	Alias       string
}

func FixAmounts(transactions []database.GetAllTransactionsRow) []TransactionData {
	positiveCodes := []string{"CR", "BP"}
	txData := make([]TransactionData, len(transactions))
	for i := range transactions {
		if slices.Contains(positiveCodes, transactions[i].Code.String) {
			txData[i].Amount = transactions[i].Amount.Float64
		} else {
			txData[i].Amount = -transactions[i].Amount.Float64
		}
		txData[i].Date = transactions[i].Date.String
		txData[i].Code = transactions[i].Code.String
		txData[i].Description = transactions[i].DescriptionText.String
	}
	return txData
}

func AttachAliases(
	transactions []TransactionData,
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
