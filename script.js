console.log("hello world");
showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function () {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    let notesObj;

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    console.log(notesObj);
    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem("notes");
    let notesObj;

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = "";

    notesObj.forEach(function (element, index) {
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text">${element}</p>
       <button onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>
        `;
    });

    let notesElem = document.getElementById('notes');
    if (notesObj.length > 0) {
        notesElem.innerHTML = html;
    }
    else{
        notesElem.innerText= 'Nothing to show here.';}
}

function deleteNote(id) {
    let notes = localStorage.getItem('notes');
    let arr;

    if (notes) {
        arr = JSON.parse(notes); // Corrected the JSON.parse argument

        if (id >= 0 && id < arr.length) { // Removed the parentheses after arr.length
            arr.splice(id, 1);
            localStorage.setItem('notes', JSON.stringify(arr));
            showNotes();
        }
    }
}



const searchInput = document.getElementById("searchTxt");

searchInput.addEventListener("input", function() {
    let input = searchInput.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');

    Array.from(noteCards).forEach(function (element) {
        let cardText = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (cardText.includes(input)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    });
});
