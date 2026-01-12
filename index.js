const myLibrary = []

class Book {
    constructor(title, author, pages, read) {
        this.uuid = crypto.randomUUID()
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }

    toggleRead() {
        this.read = this.read === 'Yes' ? 'No' : 'Yes'
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

        if (book.read === 'Yes') {
            toggleBtn.classList.add('status-read');
        } else {
            toggleBtn.classList.add('status-unread');
        }

        toggleBtn.addEventListener('click', () => {
            book.toggleRead();
            displayBook();
        });

        read.appendChild(toggleBtn);
        row.appendChild(read);

        const action = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-button');

        deleteButton.dataset.id = book.uuid;


        deleteButton.addEventListener('click', () => {
            const indexToRemove = myLibrary.findIndex(item => item.uuid === book.uuid);

            if (indexToRemove > -1) {
                myLibrary.splice(indexToRemove, 1);
            }

            displayBook();
        });

        action.appendChild(deleteButton);
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
    const readCheckbox = document.getElementById('read').checked;
    const read = readCheckbox ? 'Yes' : 'No';

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
