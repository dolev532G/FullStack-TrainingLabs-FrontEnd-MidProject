import { useState, useEffect } from 'react';



const TodosComp = ({ todo, callbackMark }) => {

    const [Title, SetTitle] = useState(todo.title);
    const [Completed, SetCompleted] = useState(false);

    useEffect(() => {
        SetCompleted(todo.completed);
    }, [todo]);

    const TodoComplete = () => {
        callbackMark(todo.id);
        SetCompleted(true);
    }

    return (
        <>

            <div style={{
                border: '2px solid orange',  // Change 'blue' to any color you prefer
                padding: '10px', // Space between the content and the border
                margin: '5px', // Space outside the border
                borderRadius: '5px' // Optional: rounds the corners of the frame
            }}>

                <h5>Title :  {todo.title} </h5>
                <h5>
                    {Completed  ? (
                        <div
                            style={{
                                backgroundColor: "green", // Same gray background as the button
                                color: "black", // Lighter text color
                                padding: "5px 10px",
                                border: "1px solid #cccccc",
                                borderRadius: "5px",
                                textAlign: "center", // Center-align the text
                                display: "inline-block", // Make the div similar to the button size
                            }}
                        >
                            Completed
                        </div>
                    ) : (
                        <button
                            onClick={TodoComplete}
                            style={{
                                backgroundColor: "#ffcc00", // Yellow background
                                color: "black", // Black text
                                padding: "5px 10px",
                                border: "1px solid #cccccc",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Mark Completed
                        </button>
                    )}
                </h5>
            </div>
        </>
    );
};

export default TodosComp;
