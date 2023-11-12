package cmd

import (
	_ "embed"
	"html/template"
	"log"
	"net/http"

	_ "github.com/mattn/go-sqlite3"
)

var tmpl *template.Template

func Execute() {
	mux := http.NewServeMux()
	tmpl = template.Must(template.ParseFiles("page/templates/index.gohtml"))
	mux.HandleFunc("/", transactionsHandler)

	staticFiles := http.FileServer(http.Dir("./page/static"))
	mux.Handle("/static/", http.StripPrefix("/static/", staticFiles))
	log.Fatal(http.ListenAndServe(":8001", mux))
}

func GetTmpl() *template.Template {
	return tmpl
}
