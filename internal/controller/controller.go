package controller

import (
	"context"
	"database/sql"
	"log"
	"transactionsui/database"
)

func GetTransactionCodesDemo(ctx context.Context) ([]database.TranCode, error) {
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

func GetTransactionCodesDemoWithTx() ([]database.TranCode, error) {
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
