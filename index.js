const myLibrary = []

function Book(title, author, pages, read) {
    this.uuid = crypto.randomUUID()
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read)
    myLibrary.push(book)

    addBookToRow(book)
}

// Example usage:
const book1 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, true)
const book2 = new Book('1984', 'George Orwell', 328, false)
const book3 = new Book('To Kill a Mockingbird', 'Harper Lee', 281, true)

addBookToLibrary(book1)
addBookToLibrary(book2)
addBookToLibrary(book3)

function displayLibrary() {
    myLibrary.forEach((book, index) => {
        console.log(`${index + 1}. ${book.title} by ${book.author}, ${book.pages} pages, Read: ${book.read}`);
    });
}

displayLibrary();


const dialog = document.getElementById('form');
const addBookButton = document.getElementById('add-book-button');
const cancelButton = document.getElementById('cancel-button');
addBookButton.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.showModal();
}
)

cancelButton.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.close();
}
)