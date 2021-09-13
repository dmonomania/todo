import { parse } from "uuid";
const pubsub = require ('pubsub.js');
import { toDoListManager } from "./todolist";

export const accessLocalStorage = (()=>{
    // uses the function parameter as the localStorage key 
    // parses the data and returns
    const readStorage = (key) => {
        const requestedKey = localStorage.getItem(key);
        let parsedData = []
        if (requestedKey && requestedKey.length) {
         parsedData = JSON.parse(requestedKey);
        }

        return parsedData
        

    }
    // uses the function paramater as the localStorage key
    // clears localStorage for this domain and writes the data passed.
    const clearAndWrite = (key,value) => {
        localStorage.clear();

        localStorage[key] = JSON.stringify(value);

    }
// subscriptions for the pub/sub model. Listening for changes to the ToDoList.

    const subscriptions = [
        // subscription for a new todo item added. Full clear and backup.
        pubsub.subscribe ('todo/added', () => {
            clearAndWrite('toDoList',toDoListManager.readToDoList())
        }),
        pubsub.subscribe ('todo/change/*', () => {
            clearAndWrite('toDoList',toDoListManager.readToDoList())
        })
    ]
    return {
        readStorage,
        clearAndWrite
    }
})()