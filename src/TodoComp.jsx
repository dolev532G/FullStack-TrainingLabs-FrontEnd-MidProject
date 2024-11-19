import { useState, useEffect } from "react";
import TodosComp from "./TodosComp";

const TodoComp = ({ UserIDRep, todos, callbackMarkMain, callbackSetTodo, callbackMarAllkMain }) => {
    const [UserID, SetUserID] = useState(UserIDRep);
    const [showAddForm, setShowAddForm] = useState(false); // Track if the Add Todo form is shown
    const [newTodoTitle, setNewTodoTitle] = useState(""); // Track the new todo title input

    const filteredTodos = todos.filter((todo) => todo.userId === UserIDRep);
    const countuncompleted = todos.filter((todo) => todo.userId === UserIDRep && !todo.completed).length > 0;


    const MarkComplete = (TodoId) => {
        callbackMarkMain(TodoId);
    };

    const MarkAllComplete = () => {
        callbackMarAllkMain(UserID);
    };


    const handleAddTodo = (e) => {
        e.preventDefault();
        if (newTodoTitle.trim() === "") return; // Prevent adding an empty title

        const newTodo = {
            id: todos.length + 1,
            userId: UserIDRep,
            title: newTodoTitle,
            completed: false,
        };

        // Update todos state (send the new todo to the parent)
        callbackSetTodo([...todos, newTodo]);
        console.log(todos)
        setNewTodoTitle(""); // Clear the title input
        setShowAddForm(false); // Hide the form and show the list again

    };

    return (
        <>
            <div
                style={{
                    border: "1px solid gray",
                    borderRadius: "5px",
                    padding: "10px",
                    marginBottom: "20px",
                }}
            >
                <h3>Todos - User {UserID}</h3>

                {/* Show Add Todo button if the form is not being displayed */}
                {!showAddForm && (
                    <>
                        <button
                            onClick={() => setShowAddForm(true)} // Show the Add Todo form
                            style={{
                                backgroundColor: "#ffcc00",
                                color: "black",
                                padding: "5px 10px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Add Todo
                        </button>

                        {countuncompleted && (
                            <button
                                onClick={() => MarkAllComplete()} // Handle "Complete All" click
                                type="submit"
                                style={{
                                    backgroundColor: "#BBFF00",
                                    color: "black",
                                    padding: "5px 10px",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Complete All
                            </button>
                        )}

                        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                            {filteredTodos.map((todo) => (
                                <TodosComp callbackMark={MarkComplete} key={"todos" + todo.id} todo={todo} />
                            ))}
                        </div>
                    </>
                )}

                {/* Show the Add Todo form if showAddForm is true */}
                {showAddForm && (
                    <form onSubmit={handleAddTodo}>
                        <h4>Add a New Todo</h4>
                        <input
                            type="text"
                            value={newTodoTitle}
                            onChange={(e) => setNewTodoTitle(e.target.value)}
                            placeholder="Enter todo title"
                            style={{
                                padding: "5px",
                                width: "80%",
                                marginBottom: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                            }}
                        />
                        <div>
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: "green",
                                    color: "white",
                                    padding: "5px 10px",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Add Todo
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowAddForm(false)} // Cancel and go back to the todo list
                                style={{
                                    backgroundColor: "gray",
                                    color: "white",
                                    padding: "5px 10px",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    marginLeft: "10px",
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
};

export default TodoComp;
