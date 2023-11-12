package cmd

import (
	"log"
	"net/http"
	"transactionsui/database"
	"transactionsui/internal/dbhandler"
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
	transactions, err := q.GetAllTransactions(r.Context())
	if err != nil {
		log.Fatal(err)
	}
	type PageData struct {
		Title        string
		Transactions []database.GetAllTransactionsRow
	}
	data := PageData{
		Title:        "Hello",
		Transactions: transactions[:10],
	}
	tmpl.Execute(w, data)
}
