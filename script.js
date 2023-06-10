const page = document.querySelector('.page');
const popup = document.querySelector('.btn-add');
const popdown = document.querySelector('.btn-close');
const submit = document.querySelector('.btn-submit');
const container = document.querySelector('.popup');
const form = document.querySelector('.book-form');

function openForm(){
    page.classList.add('inactive');
    container.style.display = "block";
}
function closeForm(){
    form.reset();
    page.classList.remove('inactive');
    container.style.display = "none";
}
function getFormData(){
    let title = form.elements['title'].value;
    let author = form.elements['author'].value;
    let pages = form.elements['pages'].value;
    let read = form.elements['read'].checked;
    return {title, author, pages, read};
}
function submitForm(event){
    event.preventDefault();
    form.reportValidity();
    if(form.checkValidity()){
        addBookToLibrary(getFormData());
        closeForm();
    }
}
popup.addEventListener('click', openForm);
popdown.addEventListener('click', closeForm);
submit.addEventListener('click', submitForm);

const title = document.querySelector('.title');
const author = document.querySelector('.author');
const pages = document.querySelector('.pages');
const read = document.querySelector('.read');
const remove = document.querySelector('.remove');
const library = document.querySelector('.book-library');
const template = document.querySelector('.book-template');

let myLibrary = [];

function addBookToLibrary(bookObject) {
    myLibrary.push(bookObject);
    displayBooks(myLibrary);
}
function displayBooks(books){
    let counter = library.children.length;
    for(counter; counter<books.length; counter++){
        title.textContent = books[counter].title
        author.textContent = books[counter].author;
        pages.textContent = books[counter].pages;
        if(books[counter].read){
            read.textContent = "Read";
            read.style.backgroundColor = "#0CCE6B";
        }else{
            read.textContent = "Not read";
            read.style.backgroundColor = "#EF2D56";
        }
        read.setAttribute('id', counter);
        remove.setAttribute('id', counter);
        library.appendChild(template.cloneNode(true));
        initializeQueries();
    }
}
function initializeQueries(){
    const read = document.querySelectorAll('.book-library .read');
    const remove = document.querySelectorAll('.book-library .remove');
    read.forEach(btn => btn.addEventListener('click', toggleRead));
    remove.forEach(btn => btn.addEventListener('click', removeBook));
}
function toggleRead(event){
    event.stopImmediatePropagation();
    let index = event.target.id;
    let book = myLibrary[index];
    if(book.read){
        book.read = false;
        event.target.textContent = "Not Read";
        event.target.style.backgroundColor = "#EF2D56";
    }else{
        book.read = true;
        event.target.textContent = "Read";
        event.target.style.backgroundColor = "#0CCE6B";
    }
}
function removeBook(event){
    event.stopImmediatePropagation();
    let index = Array.from(library.children).indexOf(event.target.parentElement);
    myLibrary.splice(index, 1);
    event.target.parentElement.remove();
}