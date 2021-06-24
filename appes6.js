class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {
    add(book) {
        let tableBody = document.querySelector('#tableBody');
        let uiString = `<tr>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                        </tr>`;

        tableBody.innerHTML += uiString;
    }

    clear() {
        let libraryForm = document.querySelector('#libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        }
        else {
            return true;
        }
    }

    show(type, displayMassege) {
        let boldText;
        if (type === 'success') {
            boldText = "Success";
        }
        else {
            boldText = "Erroer";
        }
        let message = document.querySelector('#message');
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>${boldText}:</strong> ${displayMassege}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;

        setTimeout(() => {
            message.innerHTML = '';
        }, 5000);
    }
}

let libraryForm = document.querySelector('#libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    let name = document.querySelector('#bookName').value;
    let author = document.querySelector('#author').value;
    let type;

    let fiction = document.querySelector('#fiction');
    let programming = document.querySelector('#programming')
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
    console.log(book);

    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success', 'Submit');
    }
    else {
        display.show('danger', 'Not Submit');
    }

    e.preventDefault();

}

let findData = document.getElementById('findBtn');
findData.addEventListener('click', searchVal);

function searchVal(e) {
    e.preventDefault();
    let filter = document.getElementById('searchTxt').value.toUpperCase();
    let myTable = document.getElementById('myTable');
    let tr = myTable.getElementsByTagName('tr');

    for (var i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[0];

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