let $ = document;

const bookTitle = $.querySelector("#title");
const bookAuthor = $.querySelector("#author");
const bookYear = $.querySelector("#year");
const addBookBtn = $.querySelector(".add-btn");
const bookContainer = $.querySelector(".book-list");

let books = [];

addBookBtn.addEventListener("click", function (event) {
  event.preventDefault();

  let titleValue = bookTitle.value;
  let authorValue = bookAuthor.value;
  let yearValue = bookYear.value;

  if (bookTitle === "" || bookAuthor === "" || bookYear === "") {
    alert("لطفا همه اطلاعات را وارد کنید");
  } else {
    let newBookObject = {
      id: books.length + 1,
      title: titleValue,
      author: authorValue,
      year: yearValue,
    };

    books.push(newBookObject);

    setIntoLocalStorage(books);
  }
});

function setIntoLocalStorage(booklist) {
  localStorage.setItem("books", JSON.stringify(booklist));
  makeEmptyInputs();
  booksGenerator(booklist);
}

function makeEmptyInputs() {
  bookTitle.value = "";
  bookAuthor.value = "";
  bookYear.value = "";
}

function booksGenerator(booklist) {
  bookContainer.innerHTML = "";

  booklist.forEach(function (book) {
    newTrElem = $.createElement("tr");

    let titleTdElem = $.createElement("td");
    titleTdElem.innerHTML = book.title;

    let authorTdElem = $.createElement("td");
    authorTdElem.innerHTML = book.author;

    let yearTdElem = $.createElement("td");
    yearTdElem.innerHTML = book.year;

    newTrElem.append(titleTdElem, authorTdElem, yearTdElem);

    bookContainer.append(newTrElem);
  });
}

function getFromLocalStorage() {
  let localStorageBooks = localStorage.getItem("books");

  if (localStorageBooks) {
    books = JSON.parse(localStorageBooks);
    booksGenerator(books);
  }
}

window.addEventListener("load", getFromLocalStorage);
