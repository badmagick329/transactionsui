// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.18.0
// source: query.sql

package database

import (
	"context"
)

const getTransactionCodes = `-- name: GetTransactionCodes :many
SELECT id, code FROM tran_codes
`

func (q *Queries) GetTransactionCodes(ctx context.Context) ([]TranCode, error) {
	rows, err := q.db.QueryContext(ctx, getTransactionCodes)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []TranCode
	for rows.Next() {
		var i TranCode
		if err := rows.Scan(&i.ID, &i.Code); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}
