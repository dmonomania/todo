import { toDoListManager } from "./todolist.js";
import { projectsManager } from "./todolist.js";
import { formBuilding } from './dombuild.js';
import { v4 as uuidv4 } from "uuid";



// Temp Data
import {tempData} from "./todolist.js"
projectsManager.loadSavedToProjectsList(tempData.tempProjectsArray)
console.log (projectsManager.readProjects());
// END Temp Data

formBuilding.buildToDoForm('New ToDo',projectsManager.readProjects());

const submitButton = document.querySelector("#new-todo");

submitButton.addEventListener("submit", (e) => {
  e.preventDefault();
  let fd = new FormData(e.target);
  // TODO: #1 decouple newToDoSubmit function from button event function.
  newToDoSubmit(fd);
});

const newToDoSubmit = (formData) => {
  const appendedFormData = appendToDoAttributes(formData);
  const toDoListItemObject = Object.fromEntries(appendedFormData);
  toDoListManager.addToDoListItem(toDoListItemObject);
  // TODO: #2 decouple printNextToDo from the newToDoSubmit function. 
  printNextToDo(toDoListItemObject);
};

const appendToDoAttributes = (formData) => {
  formData.append("id", uuidv4());
  formData.append("completed", false);
  return formData;
};

const printNextToDo = (object) => {
    console.log('printing next to do');
    console.log(object)
}
