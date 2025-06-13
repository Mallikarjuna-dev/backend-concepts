# Express Basic Server

## Description

This project sets up a basic Express.js server with simple routing.

## Routes

- `GET /home` → Returns "Welcome to Home Page" (HTML)
- `GET /aboutus` → Returns `{ "message": "Welcome to About Us" }` (JSON)
- `GET /contactus` → Returns dummy contact details (JSON)
- `Any other route` → Returns "404 Not Found"

| Method | Route      | Response Type | Description                     |
| ------ | ---------- | ------------- | ------------------------------- |
| GET    | /home      | HTML          | Displays "Welcome to Home Page" |
| GET    | /aboutus   | JSON          | Returns { message: "..." }      |
| GET    | /contactus | JSON          | Returns dummy contact info      |
| GET    | Any other  | Text          | Returns "404 Not Found"         |

## Setup Instructions

1. Clone the repository:

```
git clone https://github.com/Mallikarjuna-dev/backend-concepts.git

cd basicExpress-server
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

## Test routes using Postman or visit:

`http://localhost:3000/home`

`http://localhost:3000/aboutus`

`http://localhost:3000/contactus`

✅ Final Folder Structure:

```
basicExpress-server/
├── node_modules/
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

<br/>
<hr/>
<br/>

`Mallikarjuna Annigeri 💙`
