// Book class:Represents a book
class Book{
    constructor(tittle, author,isbn){
        this.tittle = tittle
        this.author = author
        this.isbn = isbn
    }
}


//UI Class: Handle UI Tasks
class UI{
    static displayBooks(){

        const books = Store.getBook();

        books.forEach((book)=> UI.addBookToList(book))
    }
    static addBookToList(book){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.tittle}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href= "#" class = "btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row)
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove(); 
        }
    }

    static showalert(messages , className){
        const div = document.createElement('div')
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(messages))
        const container = document.querySelector('.container')
        const form = document.querySelector('#book-form')
        container.insertBefore(div,form)

        // vanish after three seconds
        setTimeout(() => document.querySelector('.alert').remove(),3000)
    }
    
    static clearFields(){
        document.querySelector('#tittle').value = ''
        document.querySelector('#author').value = ''
        document.querySelector('#isbn').value = ''
    }

}


// Store CLass: Handles Storage
class Store{
    static getBook(){
        let books;
        if(localStorage.getItem('books') === null){
            books = []
        }
        else{
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books
    }

    static addBook(book){
        const books = Store.getBook();
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }
    static removeBook(isbn){
        const books = Store.getBook();

        books.forEach((book , index) => {
            if(book.isbn === isbn){
                books.splice(index, 1)
            }
        })

        localStorage.setItem('books' ,JSON.stringify(books))
    }
}


// Event: Display Books
document.addEventListener('DOMContentLoaded' , UI.displayBooks)


// Event: add a book
document.querySelector('#book-form').addEventListener('submit' , (e)=>{
  
  e.preventDefault();

    const tittle = document.querySelector('#tittle').value
    const author = document.querySelector('#author').value
    const isbn = document.querySelector('#isbn').value

    if(tittle === '' || author === '' || isbn === ''){
        UI.showalert('Please fill in all fields', 'danger')
    }
    else{
  // instatiate book
    const book = new Book(tittle, author,isbn)

    // add book to list

    UI.addBookToList(book)

    // add book to store
    Store.addBook(book)

    // Show success message
    UI.showalert('Book added', 'success')

    // clear Fields
    UI.clearFields()

    }
  
    
})

// Event: Remove a book

document.querySelector('#book-list').addEventListener('click' ,(e) => {
    
    // Remove Book From UI
    UI.deleteBook(e.target)

    // Remove Book From Stoe
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    UI.showalert('Book Removed', 'success')
})