"use strict";
const notes = document.querySelector(".all-notes-section");

const addNoteTitle = document.querySelector(".add-note-input");
const addNoteText = document.querySelector(".add-text-textarea");
const addNoteBtn = document.querySelector(".add-note-button");
const deleteAllNote = document.querySelector(".delete-all-note-button");

let localStorageSize = localStorage.length / 2;
let numClick = 1;
let i = 0;
let article;
let inputTitle;
let textArea;
let buttons;
let deleteNote;
let saveNote = [];
let keyTitle = 0;
let keyText = 100000;

function addNoteF(){
    article = document.createElement("ARTICLE");
    inputTitle = document.createElement("INPUT");
    textArea = document.createElement("TEXTAREA");
    buttons = document.createElement("DIV");
    deleteNote = document.createElement("IMG");
    saveNote = document.createElement("IMG");

    article.appendChild(inputTitle);
    article.appendChild(textArea);
    article.appendChild(buttons);
    buttons.appendChild(deleteNote);
    buttons.appendChild(saveNote);
    notes.appendChild(article);

    article.classList.add("your-note");
    article.classList.add(`your-note-${i}`);
    inputTitle.classList.add(`your-note-title-${i}`);
    textArea.classList.add(`your-note-text-${i}`);
    buttons.classList.add("button-action");
    deleteNote.classList.add(`${keyTitle}`);
    deleteNote.classList.add(`${keyText}`);
    deleteNote.classList.add(`your-note-button-${i}`);
    saveNote.classList.add(`${keyTitle}`);
    saveNote.classList.add(`${keyText}`);
    saveNote.classList.add(`your-note-button-${i}`);

}
function assignValue(){
    const yourNoteTitle = document.querySelector(`.your-note-title-${i}`);
    const yourNoteText = document.querySelector(`.your-note-text-${i}`);
    
    deleteNote.src = "https://img.icons8.com/color/48/000000/delete-forever.png";
    saveNote.src = "https://img.icons8.com/color/48/000000/save--v1.png";

    yourNoteTitle.value = addNoteTitle.value;
    yourNoteText.value = addNoteText.value;

    localStorage.setItem(keyTitle, yourNoteTitle.value);
    localStorage.setItem(keyText, yourNoteText.value);

    addNoteTitle.value = "";
    addNoteText.value = "";
}
function recoverValue(){
    const yourNoteTitle = document.querySelector(`.your-note-title-${i}`);
    const yourNoteText = document.querySelector(`.your-note-text-${i}`);

    deleteNote.src = "https://img.icons8.com/color/48/000000/delete-forever.png";
    saveNote.src = "https://img.icons8.com/color/48/000000/save--v1.png";

    yourNoteTitle.value = localStorage.getItem(keyTitle);
    yourNoteText.value = localStorage.getItem(keyText);
}
function deleteNoteF(){
    deleteNote.addEventListener("click", (e)=> {
        let response = confirm("DESEJA EXCLUIR ESTA ANOTAÇÃO?");
        if(response){
            // notes.removeChild(e.path[2]);
            // localStorage.removeItem(e.path[0].classList[0]);
            // localStorage.removeItem(e.path[0].classList[1]);
            let parentElement = e.target.parentNode.parentNode;
            notes.removeChild(parentElement);
            localStorage.removeItem(parentElement.classList[0]);
            localStorage.removeItem(parentElement.classList[1]);
        }
    });
}
function saveNoteF() {
    saveNote.addEventListener("click", (e) => {
      let previusTitleValue = localStorage.getItem(e.target.classList[0]);
      let previusTextValue = localStorage.getItem(e.target.classList[1]);
  
      let currentTitleValue = e.target.parentNode.children[0].value;
      let currentTextValue = e.target.parentNode.children[1].value;
  
      if (previusTitleValue !== currentTitleValue || previusTextValue !== currentTextValue) {
        if (currentTitleValue.length !== 0 && currentTextValue.length !== 0) {
          let response = confirm("DESEJA GUARDAR ESTA ANOTAÇÃO?");
          if (response) {
            localStorage.setItem(e.target.classList[0], currentTitleValue);
            localStorage.setItem(e.target.classList[1], currentTextValue);
          }
        } else {
          alert("Preencha todos os campos!!");
        }
      }
    });
  }
// function saveNoteF(){
//     saveNote.addEventListener("click", (e)=>{
//         // let previusTitleValue = localStorage.getItem(e.path[0].classList[0]);
//         // let previusTextValue = localStorage.getItem(e.path[0].classList[1]);

//         // let currentTitleValue = e.path[2].children[0].value;
//         // let currentTextValue = e.path[2].children[1].value;
//         let previusTitleValue = localStorage.getItem(e.target.classList[0]);
//         let previusTextValue = localStorage.getItem(e.target.classList[1]);

//         let currentTitleValue = e.target.parentNode.children[0].value;
//         let currentTextValue = e.target.parentNode.children[1].value;

//         if(previusTitleValue !== currentTitleValue || previusTextValue !== currentTextValue){
//             if(currentTitleValue.length !== 0 && currentTextValue.length !== 0){
//                 let response = confirm("DESEJA GUARDAR ESTA ANOTAÇÃO?");
//                 if(response){
//                     // localStorage.setItem(e.path[0].classList[0].currentTitleValue);
//                     // localStorage.setItem(e.path[0].classList[1].currentTextValue);
//                     localStorage.setItem(e.target.classList[0], currentTitleValue);
//                     localStorage.setItem(e.target.classList[1], currentTextValue);
//                 }
//             } else {
//                 alert("Preencha todos os campos!!");
//             }
//         }            
//     });
// }
addNoteBtn.addEventListener("click", ()=>{
    if(addNoteTitle.value.length != 0 && addNoteText.value.length != 0){
        addNoteF();
        assignValue();
        deleteNoteF();
        saveNoteF();
        i++
        numClick++
        keyTitle++
        keyText++
        localStorageSize = localStorage.length / 2;
    }
});
window.addEventListener("load", ()=>{
    if(localStorage.length > 0){
        while(localStorageSize > i){
            if(localStorage.getItem(keyTitle) == null && localStorage.getItem(keyText) == null){
                keyTitle++
                keyText++
            }else{
                addNoteF();
                recoverValue();
                deleteNoteF();
                saveNoteF();
                i++
                keyText++
                keyTitle++
                numClick++
            }
        }
    }
});
// deleteAllNote.addEventListener("click", (e)=>{
//     let response = confirm("Deseja Excluir TODAS as notas?");
//     if(response){
//         localStorage.clear();
//         for(let j = 0; j < localStorageSize; j++){
//             const articleClass = document.querySelectorAll(".your-note");
//             notes.removeChild(articleClass[0]);
//         }
//     }
// });
deleteAllNote.addEventListener("click", (e) => {
    let response = confirm("Deseja Excluir TODAS as notas?");
    if (response) {
        localStorage.clear();
        const allNotes = document.querySelectorAll(".your-note");
        allNotes.forEach((note) => {
            notes.removeChild(note);
        });
    }
});



