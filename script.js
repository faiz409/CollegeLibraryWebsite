// Constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// Display constructor
function Display() {

}

// Add method to show Data
function showData(book) {
    let getData = localStorage.getItem("book");
    if (getData == null) {
        dataObj = [];
    }
    else {
        dataObj = JSON.parse(getData);
    }
    let html = "";
    dataObj.forEach(function (book) {
        html += `<tr>
                    <td class="col">${book.name}</td>
                    <td class="col">${book.author}</td>
                    <td class="col">${book.type}</td>
                </tr>`;
    });
    let finalData = document.querySelector('#tableBody');
    if (tableBody.length != 0) {
        finalData.innerHTML = html;
    }
}

showData();


// Add method to display prototype
Display.prototype.add = function (book) {
    let tableBody = document.querySelector('#tableBody');
    let uiString = `<tr>
                        <td class="col">${book.name}</td>
                        <td class="col">${book.author}</td>
                        <td class="col">${book.type}</td>
                    </tr>`;

    tableBody.innerHTML += uiString;
}

// Implement clear function
Display.prototype.clear = function () {
    let libraryForm = document.querySelector('#libraryForm');
    libraryForm.reset();
}

// Implement valtidate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2 || book.name.toUpperCase() === book.author.toUpperCase()) {
        return false;
    }
    else {
        return true;
    }
}

// Display alert box.
Display.prototype.show = function (type, displayMassege) {
    let message = document.querySelector('#message');
    let boldText;
    if (type === 'success') {
        boldText = 'Success';
    }
    else {
        boldText = 'Error';
    }
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show"        role="alert">
                            <strong>${boldText}:</strong> ${displayMassege}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
    setTimeout(() => {
        message.innerHTML = '';
    }, 5000);
}

// Add submit event listner to libraryForm
let libraryForm = document.querySelector('#libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    e.preventDefault();
    let name = document.querySelector('#bookName').value;
    let author = document.querySelector('#author').value;
    let type;

    let fiction = document.querySelector('#fiction');
    let programming = document.querySelector('#programming');
    let cooking = document.querySelector('#cooking');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }
    let book = new Book(name, author, type);

    let display = new Display();

    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success', "Your book is successfully added.");
    }
    else {
        display.show('danger', "Sorry your book are not added! Name and Author field required at least 3 Character");
        
    }

    // Add Data In localStorage
    if (book.name != '' && book.author != '' && book.name.length > 2 && book.author.length > 2 && book.name.toUpperCase() !== book.author.toUpperCase()) {
        let getData = localStorage.getItem("book");
        if (getData == null) {
            dataObj = [];
        }
        else {
            dataObj = JSON.parse(getData);
        }
        dataObj.push(book);
        localStorage.setItem("book", JSON.stringify(dataObj));
        name = "";
        author = "";
    }
    else {
        return false;
    }

}

// Search data from search bar. 
let findData = document.getElementById('findBtn');
findData.addEventListener('click', searchVal);

function searchVal(e) {
    e.preventDefault();
    let filter = document.getElementById('searchTxt').value.toUpperCase();
    let myTable = document.getElementById('myTable');
    let tr = myTable.getElementsByTagName('tr');

    for (var i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[1];
        if (td) {
            let textValue = td.textContent || td.innerHTML;
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = "none";
            }
        }
    }
}
