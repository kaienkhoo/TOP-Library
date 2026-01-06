const myLibrary = []

function Book(title, author, pages, read) {
    this.uuid = crypto.randomUUID()
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.toggleRead = function () {
    if (this.read === 'Yes') {
        this.read = 'No'
    }
    else {
        this.read = 'Yes'
    }
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read)
    myLibrary.push(book)

}

const bookToAdd = [
    {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        pages: 310,
        read: 'Yes'
    },
    {
        title: '1984',
        author: 'George Orwell',
        pages: 328,
        read: 'No'
    },
    {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        pages: 281,
        read: 'Yes'
    }
]

bookToAdd.forEach(book => {
    addBookToLibrary(book.title, book.author, book.pages, book.read)
})

function displayBook() {
    const tableBody = document.querySelector('#library-table tbody');

    tableBody.innerHTML = '';

    myLibrary.forEach((book) => {
        const row = document.createElement('tr');

        const title = document.createElement('td');
        title.textContent = book.title;
        row.appendChild(title);

        const author = document.createElement('td');
        author.textContent = book.author;
        row.appendChild(author);

        const pages = document.createElement('td');
        pages.textContent = book.pages;
        row.appendChild(pages);

        const read = document.createElement('td');

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = book.read;
        toggleBtn.classList.add('toggle-btn');
        toggleBtn.dataset.id = book.uuid;

        toggleBtn.addEventListener('click', () => {
            book.toggleRead();
            displayBook();
        });

        read.appendChild(toggleBtn);
        row.appendChild(read);

        const action = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        action.appendChild(deleteButton);
        deleteButton.classList.add('delete-button');
        row.appendChild(action);


        tableBody.appendChild(row);
    });
}

displayBook()




const dialog = document.getElementById('form');
const addBookButton = document.getElementById('add-book-button');
const cancelButton = document.getElementById('cancel-button');
const confirmButton = document.getElementById('confirm-button');

addBookButton.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.showModal();
}
)

confirmButton.addEventListener('click', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    if (title === '' || author === '' || pages === '') {
        alert('Please fill in all fields.');
        return;
    }

    addBookToLibrary(title, author, pages, read);

    displayBook();

    document.getElementById('book-form').reset();
    dialog.close();

}
)

cancelButton.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.close();
}
)

console.log(myLibrary)