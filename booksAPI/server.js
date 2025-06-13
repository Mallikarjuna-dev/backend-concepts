const express = require('express');
const fs = require('fs');
const port = 3000;

const app = express();

app.use(express.json());

const readData = () => {
    return JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
};

const writeData = (data) => {
    return fs.writeFileSync('./db.json', JSON.stringify(data));
};

app.get('/books', (req, res) => {
    const books = readData();
    res.status(200).json(books);
});

app.post('/books', (req, res) => {
    const books = readData();
    const newBook = req.body;

    if (!newBook.title || !newBook.author || !newBook.year) {
        return res.status(400).json({ msg: "Missing required fields" });
    }
    newBook.id = books.length ? books[books.length - 1].id + 1 : 1;
    books.push(newBook);
    writeData(books);
    res.status(201).json({ msg: "Book added successfully", book: newBook });
});

app.put('/books/:id', (req, res) => {
    const id = req.params.id;
    const books = readData();
    const index = books.findIndex(b => b.id == id);
    if (index === -1) {
        return res.status(404).json({ msg: "Book not found" });
    }
    const updatedBook = req.body;
    if (!updatedBook.title || !updatedBook.author || !updatedBook.year) {
        return res.status(400).json({ msg: "Missing required fields" });
    }
    books[index] = { ...books[index], ...updatedBook };
    writeData(books);
    res.status(200).json({ msg: "Book updated successfully", book: updatedBook });
});

app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    const books = readData();
    const index = books.findIndex(b => b.id == id);
    if (index === -1) {
        return res.status(404).json({ msg: "Book not found" });
    }
    const deleted = books.splice(index, 1);
    writeData(books);
    res.status(200).json({ msg: "Book deleted successfully", book: deleted });
});

app.get('/books/search', (req, res) => {
    const { title, author } = req.query;
    const books = readData();

    let matchedBooks = books;

    if (!author && !title) {
        return res.status(400).json({ msg: "Author query parameter is required" });
    }
    if (title) {
        matchedBooks = matchedBooks.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
    }
    if (author) {
        matchedBooks = matchedBooks.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
    }

    if (matchedBooks.length === 0) {
        return res.status(404).json({ msg: "No books found" });
    }
    res.status(200).json(matchedBooks);
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    const books = readData();
    const book = books.find(b => b.id == id);
    if (!book) {
        return res.status(404).json({ msg: "Book not found" });
    }
    res.status(200).json(book);
});

// Handle Undefined Routes
app.use((req, res) => {
    res.status(404).json({ msg: "Route not found" });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
