package cmd

import (
	"context"
	"database/sql"
	_ "embed"
	"html/template"
	"log"
	"net/http"
	"transactionsui/database"

	_ "github.com/mattn/go-sqlite3"
)

var tmpl *template.Template

func Execute() {
	mux := http.NewServeMux()
	tmpl = template.Must(template.ParseFiles("page/templates/index.gohtml"))
	mux.HandleFunc("/", codeHandler)
    staticFiles := http.FileServer(http.Dir("./page/static"))
    mux.Handle("/static/", http.StripPrefix("/static/", staticFiles))
	log.Fatal(http.ListenAndServe(":8001", mux))
}

func getTransactionCodesDemo(ctx context.Context) ([]database.TranCode, error) {
	db, err := sql.Open("sqlite3", "./transactions.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	q := database.New(db)
	codes, err := q.GetTransactionCodes(ctx)
	if err != nil {
		return nil, err
	}
	return codes, nil

}

func codeHandler(w http.ResponseWriter, r *http.Request) {
	codes, err := getTransactionCodesDemo(r.Context())
	if err != nil {
		log.Fatal(err)
	}
	for _, code := range codes {
		log.Printf("%d: %s", code.ID, code.Code.String)
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

func getTransactionCodesDemoWithTx() ([]database.TranCode, error) {
	db, err := sql.Open("sqlite3", "./transactions.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Create a new context, and begin a transaction
	ctx := context.Background()
	tx, err := db.BeginTx(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}
	defer tx.Rollback()

	// Create a new query object, bound to the transaction
	q := database.New(tx)

	// Call the query
	codes, err := q.GetTransactionCodes(ctx)
	if err != nil {
		log.Fatal(err)
	}

	// Commit the transaction
	if err := tx.Commit(); err != nil {
		log.Fatal(err)
	}
	return codes, nil
}
