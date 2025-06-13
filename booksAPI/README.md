# 📚 Simple Book Storage API

An Express.js application to manage a collection of books using `db.json` as a local JSON database.

---

## 🚀 Features

- Add new books
- Retrieve all books
- Retrieve a book by ID
- Update a book by ID
- Delete a book by ID
- Search books by author (partial match)
- Search books by title (partial match)
- Handles 404 for undefined routes

---

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/Mallikarjuna-dev/backend-concepts.git

cd booksAPI
```

2. Install dependencies:

```
npm install
```

3. Start the server:

```
node server.js
or
nodemon server.js
```

## 📬 API Endpoints

### ➕ Add a New Book

📃 POST /books:

`{
  "id": 3,
  "title": "1984",
  "author": "George Orwell",
  "year": 1949
}`

📃 Get All Books:
`GET /books`

🔍 Get Book by ID:
`GET /books/:id`

🔧 Update Book by ID:
`PUT /books/:id`

`{
  "title": "Updated Title"
}`

❌ Delete Book by ID:
`DELETE /books/:id`

🔎 Search by Title or Author (Partial Match):
`GET /books/search?title=dream&author=ace`

4. Test routes via:

   `http://localhost:3000/books`

   `http://localhost:3000/books/search?title=love&authoe=kris`

<br/>
<hr/>
<br/>

`Mallikarjuna Annigeri 💙`
