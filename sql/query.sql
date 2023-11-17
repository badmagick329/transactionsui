-- name: GetTransactionCodes :many
SELECT
  *
FROM
  tran_codes;
-- name: GetTransactionCode :one
SELECT
  *
FROM
  tran_codes
WHERE
  code = ?;
-- name: GetAliases :many
SELECT
  a.alias_text,
  d.description_text
FROM
  aliases a
  JOIN alias_desc ad ON ad.alias_id = a.id
  JOIN descriptions d ON d.id = ad.description_id;
-- name: GetAllTransactions :many
SELECT
  t.id as transactions_id,
  t.date as date,
  t.amount,
  t.is_positive,
  tc.code,
  d.description_text
FROM
  transactions t
  JOIN tran_codes tc ON tc.id = t.code_id
  JOIN descriptions d ON d.id = t.description_id
ORDER BY
  t.date DESC,
  t.amount DESC,
  t.id DESC;
