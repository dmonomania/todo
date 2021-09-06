import { toDoListManager } from "./todolist.js";
import { projectsManager } from "./todolist.js";
import { formBuilding, toDoDomStuff, domSmashing } from './dombuild.js';
import { accessLocalStorage } from "./storage.js";




const storageRead = accessLocalStorage.readStorage('toDoList')
console.log(storageRead);

// Temp Data
import {tempData} from "./todolist.js"
projectsManager.loadSavedToProjectsList(tempData.tempProjectsArray)
// END Temp Data

const newToDoBtn = document.getElementById('new-to-do')
newToDoBtn.addEventListener('click',() => {
  formBuilding.buildToDoForm('New ToDo',projectsManager.readProjects());

})

window.onload = () => {
  const savedToDoList = accessLocalStorage.readStorage('toDoList');
  if (!savedToDoList.length == 0){
    toDoListManager.loadSavedToDoList(savedToDoList);
    toDoListManager.readToDoList().forEach((e) => {
      toDoDomStuff.printNextToDo(e);
    })

  }
}


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

export const handleIconClicks = (task, target) => {
  switch (task){
    case 'icon-edit':
      console.log('icon-edit')
      break;
      case 'icon-delete':
        console.log(target);
        domSmashing.removeElement(target);
        toDoListManager.deleteSingleToDoListItem('id',target.id);
        accessLocalStorage.clearAndWrite('toDoList',toDoListManager.readToDoList())
        
        break;
        case 'icon-check':
          console.log('icon-check');
          break;
          default:
            console.log(`handleIconClicks found no matches`)
          }
        }
        
        
        
        