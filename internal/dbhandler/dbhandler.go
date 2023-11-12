package dbhandler

import (
	"database/sql"
	"log"
)

type DB struct {
	DB *sql.DB
}

var dbhandler *DB

func New() *DB {
	if dbhandler != nil {
		return dbhandler
	}
	db, err := sql.Open("sqlite3", "./transactions.db")
	if err != nil {
		log.Fatal(err)
	}
	dbhandler = &DB{
		DB: db,
	}
	return dbhandler
}

func (c *DB) Close() {
	c.DB.Close()
}

// func GetTransactionCodesWithTx() ([]database.TranCode, error) {
// 	db, err := sql.Open("sqlite3", "./transactions.db")
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	defer db.Close()
//
// 	// Create a new context, and begin a transaction
// 	ctx := context.Background()
// 	tx, err := db.BeginTx(ctx, nil)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	defer tx.Rollback()
//
// 	// Create a new query object, bound to the transaction
// 	q := database.New(tx)
//
// 	// Call the query
// 	codes, err := q.GetTransactionCodes(ctx)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
//
// 	// Commit the transaction
// 	if err := tx.Commit(); err != nil {
// 		log.Fatal(err)
// 	}
// 	return codes, nil
// }
