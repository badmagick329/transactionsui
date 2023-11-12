package cmd

import (
	"log"
	"net/http"
	"transactionsui/database"
	"transactionsui/internal/dbhandler"
	"transactionsui/internal/utils"
)

func codeHandler(w http.ResponseWriter, r *http.Request) {
	db := dbhandler.New()
	q := database.New(db.DB)
	codes, err := q.GetTransactionCodes(r.Context())
	if err != nil {
		log.Fatal(err)
	}
	type PageData struct {
		Title string
		Codes []database.TranCode
	}
	data := PageData{
		Title: "Hello",
		Codes: codes,
	}
	tmpl.Execute(w, data)
}

func transactionsHandler(w http.ResponseWriter, r *http.Request) {
	db := dbhandler.New()
	q := database.New(db.DB)
	aliases, err := q.GetAliases(r.Context())
	if err != nil {
		log.Fatal(err)
	}
	transactions, err := q.GetAllTransactions(r.Context())
	txData := utils.FixAmounts(transactions)
	utils.AttachAliases(txData, aliases)
	if err != nil {
		log.Fatal(err)
	}
	type PageData struct {
		Title        string
		Transactions []utils.TransactionData
	}
	data := PageData{
		Title:        "Hello",
		Transactions: txData,
	}
	tmpl.Execute(w, data)
}
