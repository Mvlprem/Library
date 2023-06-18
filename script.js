const page = document.querySelector(".page");
const popup = document.querySelector(".btn-add");
const library = document.querySelector(".book-library");

const container = document.querySelector(".popup");
const form = document.querySelector(".book-form");
const submit = document.querySelector(".btn-submit");
const popdown = document.querySelector(".btn-close");

const title = document.querySelector(".title");
const author = document.querySelector(".author");
const pages = document.querySelector(".pages");
const read = document.querySelector(".read");
const remove = document.querySelector(".remove");
const template = document.querySelector(".book-template");

class Library {
  
    static myLibrary = [];

  addBookToLibrary = (bookObject) => {
    Library.myLibrary.push(bookObject);
    this.displayBooks(Library.myLibrary);
  };

  displayBooks = (books) => {
    let counter = library.children.length;
    for (counter; counter < books.length; counter++) {
      title.textContent = books[counter].title;
      author.textContent = books[counter].author;
      pages.textContent = books[counter].pages;
      if (books[counter].read) {
        read.textContent = "Read";
        read.style.backgroundColor = "#0CCE6B";
      } else {
        read.textContent = "Not read";
        read.style.backgroundColor = "#EF2D56";
      }
      read.setAttribute("id", counter);
      remove.setAttribute("id", counter);
      library.appendChild(template.cloneNode(true));
    }
    this.initializeQueries();
  };

  initializeQueries = () => {
    const read = document.querySelectorAll(".book-library .read");
    const remove = document.querySelectorAll(".book-library .remove");
    read.forEach((btn) => btn.addEventListener("click", this.toggleRead));
    remove.forEach((btn) => btn.addEventListener("click", this.removeBook));
  };

  toggleRead = (event) => {
    event.stopImmediatePropagation();
    let index = Array.from(library.children).indexOf(
      event.target.parentElement
    );
    let book = Library.myLibrary[index];
    if (book.read) {
      book.read = false;
      event.target.textContent = "Not Read";
      event.target.style.backgroundColor = "#EF2D56";
    } else {
      book.read = true;
      event.target.textContent = "Read";
      event.target.style.backgroundColor = "#0CCE6B";
    }
  };

  removeBook = (event) => {
    event.stopImmediatePropagation();
    let index = Array.from(library.children).indexOf(
      event.target.parentElement
    );
    Library.myLibrary.splice(index, 1);
    event.target.parentElement.remove();
  };
}

class Form extends Library {

  openForm = () => {
    page.classList.add("inactive");
    container.style.display = "block";
  };

  closeForm = () => {
    form.reset();
    page.classList.remove("inactive");
    container.style.display = "none";
  };

  getFormData = () => {
    let title = form.elements["title"].value;
    let author = form.elements["author"].value;
    let pages = form.elements["pages"].value;
    let read = form.elements["read"].checked;
    return { title, author, pages, read };
  };

  submitForm = (event) => {
    event.preventDefault();
    form.reportValidity();
    if (form.checkValidity()) {
      this.addBookToLibrary(this.getFormData());
      this.closeForm();
    }
  };
}

const popupForm = new Form();
popup.addEventListener("click", popupForm.openForm);
popdown.addEventListener("click", popupForm.closeForm);
submit.addEventListener("click", popupForm.submitForm);