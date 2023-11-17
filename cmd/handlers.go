package cmd

import (
	"log"
	"net/http"
	"transactionsui/database"
	"transactionsui/internal/dbhandler"
	"transactionsui/internal/models"
)

func transactionsHandler(w http.ResponseWriter, r *http.Request) {
	db := dbhandler.New()
	q := database.New(db.DB)
	aliases, err := q.GetAliases(r.Context())
	if err != nil {
		log.Fatal(err)
	}
	transactions, err := q.GetAllTransactions(r.Context())
	if err != nil {
		log.Fatal(err)
	}
	txData := models.DatabaseTransactionsToTxData(
		transactions,
		aliases,
	)
	type PageData struct {
		Title        string
		Transactions []models.TxData
	}
	data := PageData{
		Title:        "Transactions",
		Transactions: txData,
	}
	tmpl.Execute(w, data)
}
