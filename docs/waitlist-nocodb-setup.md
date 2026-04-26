# Waitlist Table Setup (NocoDB)

The `/join-start/2026` page collects emails into a NocoDB table once applications close. This document describes the manual steps needed to set up the table.

## 1. Create the table

In NocoDB (`https://ndb.startmunich.de`), open the same base used by the other tables (startups, members, partners) and create a new table called **`Waitlist`**.

## 2. Add the columns

| Column name   | Type             | Notes                                                       |
| ------------- | ---------------- | ----------------------------------------------------------- |
| `Email`       | Email (or Text)  | The email submitted by the visitor. Required.               |
| `SignedUpAt`  | DateTime         | ISO timestamp written by the API at submission time.        |

The default `Id` / `CreatedAt` / `UpdatedAt` system fields can stay as-is. The API writes `Email` and `SignedUpAt`; column names are case-sensitive and must match exactly.

Optional: mark `Email` as unique in NocoDB if you want to prevent duplicates at the DB level. (The API does not currently dedupe.)

## 3. Copy the table ID

Open the new table in NocoDB and look at the URL:

```
https://ndb.startmunich.de/nc/{workspace}/{project}/table/{TABLE_ID}
```

Copy `{TABLE_ID}`.

## 4. Set the env var

Add the following to `.env.local` (and to Vercel → Settings → Environment Variables for production / preview):

```env
NOCODB_WAITLIST_TABLE_ID=your_waitlist_table_id_here
```

`NOCODB_API_TOKEN` and `NOCODB_BASE_URL` are reused from the existing setup, so no extra credentials are needed.

After adding the variable on Vercel, redeploy.

## 5. Verify

- POST `/api/waitlist` with `{ "email": "test@example.com" }` should return `{ "ok": true }`.
- A new row should appear in the `Waitlist` table with the email and an ISO timestamp in `SignedUpAt`.
- Submitting the form on `/join-start/2026` (after the close date) should write a row.
