import { v4 as uuidv4 } from "uuid";
const pubsub = require ('pubsub.js');

export const tempData = (() => {

  const testToDoArray = [{
    id: 111,
    title: "Walk the dog",
    description: "I really need to walk the dog to keep him healthy.",
    project: "Pets",
    duedate: "due date",
    completed: false,
    priority: "high"
  },
{
    id: 222,
    title: "Build todoapp",
    description: "Make a coop all",
    project: "Web Development",
    duedate: "due date",
    completed: false,
    priority: "high"
  },
  {
    id: 333,
    title: "Wash the car",
    description: "clean those wheeellls baby",
    project: "Pets",
    duedate: "due date",
    completed: false,
    priority: "high"
  }
]
    
  const tempProjectsArray = ["Pets", "Web Development", "Hobbies", "Household"];

  return {
      tempProjectsArray,
      testToDoArray

  }
})()

export const toDoListManager = (() => {
  const toDoList = [];

  // Factory function to create the individual ToDo item.
  const toDoFactory = (
    id,
    title,
    description,
    project,
    dueDate,
    completed,
    priority
  ) => {
    return { id, title, description, project, dueDate, completed, priority };
  };

  // Load a previously saved ToDo list from offline storage or database.
  const loadSavedToDoList = (loadedToDoListArray) => {
    toDoList.push(...loadedToDoListArray);
  };
  // add a single object (toDoListItem) into the toDoList Array
  const addToDoListItem = (toDoListItemObject) => {
    toDoList.push(toDoListItemObject);
    pubsub.publish('todo/added',[toDoListItemObject])
  };

  // Temporary Update Function. Removes entire previous ToDo Item and replaces
  // with entirely new item. A better way will be to update individual key/value pairs.
  const replaceToDoListItem = (searchKey, searchKeyValue, toDoListItemObject) => {
    deleteSingleToDoListItem(searchKey, searchKeyValue);
    toDoList.push(toDoListItemObject);
    pubsub.publish('todo/change/edit',[toDoList])
  };

  // Temporary Function to Update the Projects when a change has been made.
  // Should be removed when individual key/pair updates function is written.
  const tempUpdateProject = (project, updatedProject) => {
    toDoList.forEach((object) => {
      const toDoItem = object;
      for (const key in toDoItem) {
        if (toDoItem[key] === project) {
          toDoItem[key] = updatedProject;
        }
      }
    });
  };
  // Finds the ToDo List Item from the key/value pair and deletes it.
  // Designed for indexing via the ID number which should be unique.
  // May need to add a check to see if two or more of the key/value pairs match.
  const deleteSingleToDoListItem = (key, value) => {
    const index = toDoList.findIndex((element) => element[key] === value);
    toDoList.splice(index, 1);
  };

  // allows read access to the toDoList
  const readToDoList = () => {
    return toDoList;
  };
  
  const appendToDoAttributes = (formData) => {
    formData.append("id", uuidv4());
    formData.append("completed", false);
    return formData;
  };
  
  const createToDoListItem = (formData) => {
    const appendedToDoFormData = appendToDoAttributes(formData);
    const formDataObject = Object.fromEntries(appendedToDoFormData);
    addToDoListItem(formDataObject);
  }
  
  const updateToDoListItem = (data) => {
    const newFormData = data[0];
    const oldFormData = data[1];

    newFormData.append('id',oldFormData.id);

    const newToDoListObject = Object.fromEntries(newFormData);

    if (newToDoListObject.completed === 'Yes') {
      newToDoListObject.completed = true;
    }
    else {
      newToDoListObject.completed = false;
    }
    
    return newToDoListObject

  }

  const returnSingleToDoListItem = (key,value) => {
    const index = toDoList.findIndex((element) => element[key] === value);
    return toDoList[index];

  }
// need to build this
  const trackToDoListChanges = (newItem, oldItem) => {

  }

  const toDoListSubscriptions = [
  pubsub.subscribe('todo/submit/new', (formData) => {
    createToDoListItem(formData);
  }),

  pubsub.subscribe('todo/submit/edit', (data) => {

    const updatedToDoListItem = updateToDoListItem(data)
    trackToDoListChanges(updatedToDoListItem,data[1])
    replaceToDoListItem('id',updatedToDoListItem.id,updatedToDoListItem)
  })
  
]

  return {
    returnSingleToDoListItem,
    appendToDoAttributes,
    loadSavedToDoList,
    addToDoListItem,
    readToDoList,
    replaceToDoListItem,
    deleteSingleToDoListItem,
    tempUpdateProject,
  };
})();

export const projectsManager = (() => {
  const projectsList = [];

  const loadSavedToProjectsList = (loadedProjectsListArray) => {
    projectsList.push(...loadedProjectsListArray);
  };

  const addNewProject = (project) => {
    projectsList.push(project);
  };

  const deleteProject = (project) => {
    projectsList.splice(projectsList.indexOf(project));
  };

  const updateProject = (project, updatedProject) => {
    projectsList[projectsList.indexOf(project)] = updatedProject;
  };

  const readProjects = () => {
    return projectsList;
  };

  return {
    loadSavedToProjectsList,
    addNewProject,
    deleteProject,
    updateProject,
    readProjects,
  };
})();

