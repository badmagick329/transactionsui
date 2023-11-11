-- name: GetTransactionCodes :many
SELECT * FROM tran_codes;

-- name: GetAliases :many
SELECT * FROM aliases;

-- name: GetTransactionCode :one
SELECT * FROM tran_codes WHERE code = $1;

-- name: GetAlias :one
SELECT * FROM aliases WHERE alias = $1;
