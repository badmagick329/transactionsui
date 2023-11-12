-- name: GetTransactionCodes :many
SELECT
  *
FROM
  tran_codes;
-- name: GetAliases :many
SELECT
  *
FROM
  aliases;
-- name: GetTransactionCode :one
SELECT
  *
FROM
  tran_codes
WHERE
  code = ?;
-- name: GetAlias :one
SELECT
  *
FROM
  aliases
WHERE
  alias_text = ?;
-- name: GetAllTransactions :many
SELECT
  t.id as transactions_id,
  t.date as date,
  t.amount,
  tc.code,
  d.description_text,
  a.alias_text
FROM
  transactions t
  JOIN tran_codes tc ON tc.id = t.code_id
  JOIN descriptions d ON d.id = t.description_id
  LEFT JOIN alias_desc ad ON ad.description_id = d.id
  LEFT JOIN aliases a ON a.id = ad.alias_id
ORDER BY
  t.date DESC;
