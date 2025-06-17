# YouTube-Style Comment System (TechM Assessment)

This is a backend project for handling a YouTube-style comment system using **Node.js**, **TypeScript**, and **ScyllaDB**. It is part of the technical assessment for the **Senior Node Developer** position at TechMission Solutions.

---

## Features Implemented

- Add and retrieve comments for a video
- Like/Dislike a comment
- Reply to comments (nested structure)
- Fetch top-ranked comments (using like/dislike and recency-based algorithm)
- Designed for scalability and fast reads using ScyllaDB

---

## Tech Stack

- **Node.js + TypeScript**
- **Express** (RESTful API)
- **ScyllaDB (Cassandra-compatible NoSQL DB)**
- **Cassandra Driver for Node.js** (`cassandra-driver`)
- Lightweight folder structure for maintainability

---

## Project Structure
```bash
├── src/
│ ├── controllers/ # Request handling
│ ├── services/ # Business logic
│ ├── db/ # DB connection and query logic
│ ├── routes/ # Express routes
│ └── index.ts # App entry point
├── db-schema.cql # ScyllaDB schema file
├── test-data/ # Sample Postman/REST client requests
├── README.md
├── package.json
└── tsconfig.json
```

---

## Sample API Endpoints
```
| Method | Endpoint                  | Description                      |
|--------|---------------------------|----------------------------------|
| GET    | /videos/id/comments       | Get all comments for a video     |
| GET    | /videos/id/top-comments   | Get top-ranked comments          |
| POST   | /videos/id/comments       | Post a new comment               |
| POST   | /comments/id/reply        | Post a reply to a comment        |
| POST   | /comments/id/like         | Like a comment                   |
| POST   | /comments/id/dislike      | Dislike a comment                |
| GET    | /comments/id/replies      | Get replies to a comment         |
```
---

## Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/ak47-bugBuster/customer-review-algorithm.git
   cd customer-review-algorithm
   ```
2. Install dependencies:
   `npm install`

3. Set up ScyllaDB:
 - Sign up at cloud.scylladb.com
 - Create a cluster and note down the credentials (host, keyspace, etc.)
 - Update the src/db/client.ts file with your connection details

4. Apply the schema:
 - Run db-schema.cql in ScyllaDB using the CQL shell or web console

5. Run the app:
   `npm run dev`

6. Incase type error for typescript install below:
   `npm install --save-dev @types/uuid`

## Testing API
Use tools like Postman or VSCode REST Client with the sample requests in test-data/test-requests.http.

