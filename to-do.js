//MVC => Model , View , Controller --------------------------------------------------------
/*
We split up the code 
Model - contains all the code that saves and manages data
View - contains all the code that manages visuals. Renders visuals using data in the model
Controller - contains all the code that connects the two together
*/

//____________________________________________MODEL__SECTION____________________________________________________\\
//code that creates a Todo and code that deletes the toDo\\

const item = document.getElementById("item");
const date = document.getElementById("date");
const items = document.getElementById("items");
const btn = document.getElementById("btn");
const box = document.getElementById("box");
const rest = document.getElementById("rest");


//Original TodoList


//we first check the localstorage or use the original
let toDoList;
//retriving data = localstorage.getItem('key')   
const old = localStorage.getItem('todos');
//convert from string since we stored it in string form 
const oldtodo = JSON.parse(old);
//to check if data is an array

if (Array.isArray(oldtodo)) {
    toDoList = oldtodo;
} else {
    toDoList = [
        
    ]
}
//--------------------------------------------------------


//Creates the Todo from add button
function createToDo(title, dueDate) {
    toDoList.push({
      title: item.value,
      dueDate: date.value,
      id: new Date().getTime(),
    });
    saveTodo();
  }
  

//deleting toDo
function removeToDo(idToDelete) {
    toDoList = toDoList.filter(function (toDoList) {
        if (toDoList.id === Number(idToDelete)) {
          return false;
        } else {
          return true;
        }
    }); 
    saveTodo();
}



//save todos
function saveTodo() {
    localStorage.setItem('todos', JSON.stringify(toDoList));
}



//startup functions
see();
show();

//--------------------------MODEL SECTION-----------------------------------


//_____________________________________VIEW____________________SECTION____________________\\


function show() {
    items.innerHTML = "";
    toDoList.forEach(function (toDoList) {
        const element = document.createElement("p");
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "x";
        /*deleteBtn.style = "margin-left:1rem;color:red;";*/
        deleteBtn.id = toDoList.id;
        deleteBtn.className = 'delete'
        deleteBtn.onclick = deleteTodo;
        let word = toDoList.title;
        let newWord = word.charAt(0).toUpperCase() + word.slice(1);
        element.textContent = ` ${toDoList.dueDate} 🔜 I will have to ${newWord}`;
      items.appendChild(element);
      element.appendChild(deleteBtn);
    });
    if (items.innerHTML === '') {
        rest.disabled = true;
    } else {
        rest.disabled = false;
    }
  }
//---------------------------------------------------------VIEW SECTION------------------------------------------\\

//__________________________________________________CONTROLLERS SECTION__________________________________________\\

//Checks for data input
function see() {
    box.addEventListener("click", function () {
      if (box.checked === false || item.value === "" || date.value === "") {
        btn.disabled = true;
      } else {
        btn.disabled = false;
      }
    });
  }

  

//adds new todo
function add() {
    createToDo(item.value, date.value);
    item.value = "";
    box.checked = false;
    date.value = "";
  
    items.innerHTML = "";
    btn.disabled = true;
  
    show();
}

//cordinates the delete
function deleteTodo(event) {
  let deleteBtn = event.target;
  let idToDelete = deleteBtn.id;
  removeToDo(idToDelete)
  show();
}


//cordinates reset button
function reset() {
    let len = toDoList.length;
    toDoList.splice(0, len);
    items.innerHTML = '';
  rest.disabled = true;
  btn.disabled = true;
    see();
    saveTodo();
}