# 🍽️ Dishes API — Express.js CRUD App

## Features

- Stores dish data in `db.json`
- Full CRUD (Create, Read, Update, Delete)
- Search by name (partial matches supported)
- Proper status codes and error messages

## 📁 Project Structure

```
├── db.json # Mock db (array of dishes)
├── routes -> dishRoutes.js # all bussiness logic
├── server.js # Main Express server
├── package.json # Project metadata and dependencies
├── .gitignore
└── README.md # Project documentation
```

## Routes

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | /dishes              | Add a new dish        |
| GET    | /dishes              | Get all dishes        |
| GET    | /dishes/:id          | Get dish by ID        |
| PUT    | /dishes/:id          | Update dish by ID     |
| DELETE | /dishes/:id          | Delete dish by ID     |
| GET    | /dishes/get?name=... | Search dishes by name |

## Setup

1. Clone the repo:

```bash
git clone https://github.com/Mallikarjuna-dev/backend-concepts.git

cd dishesAPI
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

### ➕ Add a New Dish

📃 POST /dishes:

`{
  "id": 4,
  "name": "Puri",
  "price": 40,
  "category": "Breakfast"
}`

📃 Get All Dishes:
`GET /dishes`

🔍 Get Dish by ID:
`GET /dishes/:id`

🔧 Update Dish by ID:
`PUT /dishes/:id`

`{
  "name": "Masala Dosa",
  "price": 65,
  "category": "Breakfast"
}`

❌ Delete Dish by ID:
`DELETE /dishes/:id`

🔎 Search by Name (Partial Match):
`GET /dishes/get?name=idly`

4. Test routes via:

   `http://localhost:3000/dishes`

   `http://localhost:3000/dishes/get?name=idly`

<br/>
<hr/>
<br/>

`Mallikarjuna Annigeri 💙`
