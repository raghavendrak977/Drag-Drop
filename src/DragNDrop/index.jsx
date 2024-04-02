
import React, {  useState, useEffect } from "react";


const DragDrop = ({}) => {
  const itemList = [
    { id: "1", label: "html" },
    { id: "2", label: "css" },
  ];

  const [list, updateTodo] = useState(itemList);
  const [newinputTodo, updateNewinputTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [draggedlist, setDraggedList] = useState([]);
  


  const maxId = Math.max(...list.map((todo) => Number(todo.id)));
  const nextId = maxId + 1;

  const [isBackgroundImageVisible, setIsBackgroundImageVisible] = useState( false );

  const applyBackgroundImage = () => {
    setIsBackgroundImageVisible(!isBackgroundImageVisible);
    if (!isBackgroundImageVisible) {
      document.body.style.backgroundColor = "black";
    } else {
      document.body.style.backgroundColor = "white";
    }
    
    
  };

  const TodoUpdater = () => {
    if (newinputTodo === "") {
      alert("Enter any task");
    } else {
      const nextTodo = [...list, { id: nextId.toString(), label: newinputTodo }];
      updateTodo(nextTodo);
      updateNewinputTodo("");
    }
  };

  const removeTodo = (id) => {
    const updatedAfterRemoving = list.filter((obj) => obj.id !== id);
    updateTodo(updatedAfterRemoving);
  };

  const editTodo = (id, label) => {
    setEditingId(id);
    setEditedTask(label);
  };

  const saveEditedTodo = (id) => {
    const updatedTodoList = list.map((todo) => {
      if (todo.id === id) {
        return { ...todo, label: editedTask };
      }
      return todo;
    });
    updateTodo(updatedTodoList);
    setEditingId(null);
  };

  const handleDragStart = (event, id) => {
    event.dataTransfer.setData("id", id);
    setIsDragging(true);
  };

  const handleOnDrop = (event) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("id");

    const item = list.find((x) => x.id === id);
    if (item) {
      setDraggedList([...draggedlist, item]);
      const filteredData = list.filter((x) => x.id !== id);
      updateTodo(filteredData);
    }
    setIsDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const targetclass = `p-4 m-5 rounded-lg bg-white shadow-lg border-dashed border-2 min-h-60 ${
    isDragging ? "border-black" : "border-indigo-300"
  }`;

  const assignEventListenersToNewTask = (taskId) => {
    const newItemElement = document.getElementById(taskId);
    if (newItemElement) {
      newItemElement.draggable = true;
      newItemElement.addEventListener("dragstart", (event) =>
        handleDragStart(event, taskId)
      );
    }
  };

  
  useEffect(() => {
    const newTaskId = nextId.toString();
    assignEventListenersToNewTask(newTaskId);
  }, [list]);

  return (
    <div className="app-container mt-2">
      <div className="container flex justify-between">
        <button
          onClick={applyBackgroundImage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          
          {isBackgroundImageVisible ? "Dark Mode Off" : "Dark Mode"}
        </button>
        <button
          onClick={() => {
            updateTodo([]);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Clear Data
        </button>
      </div>
      <hr />

      <div className="grid grid-cols-2 gap-1">
        <div className="p-4 m-5 rounded-lg bg-white shadow-lg">
          <h3 className="text-center text-warning mt-2">TODO</h3>
          <div className="input-group mt-5">
            <input
              value={newinputTodo}
              onChange={(e) => updateNewinputTodo(e.target.value)}
              className="form-control"
              type="text"
            />
            <button
              onClick={TodoUpdater}
              className="btn btn-outline-warning btn-lg border border-indigo-300"
            >
              Add new task
            </button>
          </div>
          <ol className="list-none p-0 m-0 border border-indigo-300 bg-indigo-200 min-h-40 list-group list-group-numbered">
            {list.map((todo) => (
              <li
                key={todo.id}
                onDragStart={(event) => handleDragStart(event, todo.id)}
                draggable={true}
                id={todo.id}
                className="list-group-item bg-white border border-indigo-300 p-4 m-2 cursor-move"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
              {/*  */}
                {editingId === todo.id ? (
                  <>
                    <input
                      className="border border-indigo-300"
                      type="text"
                      value={editedTask}
                      onChange={(e) => setEditedTask(e.target.value)}
                    />
                    <button
                      className="btn btn-outline-success btn-lg mx-2"
                      onClick={() => saveEditedTodo(todo.id)}
                    >
                      Save
                    </button>
                  </>
                ) 
                :
               (
                  <>
                    <p>{todo.label}</p>
                    <button
                      className="btn btn-outline-warning btn-lg mx-2"
                      onClick={() => editTodo(todo.id, todo.label)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-lg"
                      onClick={() => removeTodo(todo.id)}
                    >
                      🗑️
                    </button>
                  </>
                )}
              </li>
            ))}
          </ol>
        </div>
        <div
          className={targetclass}
          onDragOver={handleDragOver}
          onDrop={handleOnDrop}
        >
        <h3 className="text-center text-warning mt-2">Drop here</h3>
          <ol className="list-group list-group-numbered list-none p-0 m-0 border border-indigo-300 bg-indigo-200 min-h-40">
            {draggedlist.map((item) => (
              <li
                key={item.id}
                id={item.id}
                className="bg-white border border-indigo-300 list-group-item p-4 m-2 cursor-move"
              >
                {item.label}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DragDrop;
