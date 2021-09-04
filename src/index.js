import { toDoListManager } from "./todolist.js";
import { projectsManager } from "./todolist.js";
import { formBuilding, toDoDomStuff } from './dombuild.js';
import { accessLocalStorage } from "./storage.js";



const storageRead = accessLocalStorage.readStorage('toDoList')
console.log(storageRead);

// Temp Data
import {tempData} from "./todolist.js"
projectsManager.loadSavedToProjectsList(tempData.tempProjectsArray)
// END Temp Data

formBuilding.buildToDoForm('New ToDo',projectsManager.readProjects());

window.onload = () => {
  const savedToDoList = accessLocalStorage.readStorage('toDoList');
  if (!savedToDoList.length == 0){
    toDoListManager.loadSavedToDoList(savedToDoList);

  }
}

console.log(toDoListManager.readToDoList())


export const newToDoSubmit = (formData) => {
  const appendedFormData = toDoListManager.appendToDoAttributes(formData);
  const toDoListItemObject = Object.fromEntries(appendedFormData);
  toDoListManager.addToDoListItem(toDoListItemObject);
  // save current toDoList to Local Storage
  accessLocalStorage.clearAndWrite('toDoList',toDoListManager.readToDoList())
  
  // TODO: #2 decouple printNextToDo from the newToDoSubmit function. 
  toDoDomStuff.printNextToDo(toDoListItemObject);
  // Add 

};



