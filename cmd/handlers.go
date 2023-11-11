package cmd

import (
	"log"
	"net/http"
	"transactionsui/database"
	"transactionsui/internal/controller"
)

func codeHandler(w http.ResponseWriter, r *http.Request) {
	codes, err := controller.GetTransactionCodesDemo(r.Context())
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
