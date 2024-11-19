import { useState, useEffect } from 'react';



const PostsComp = ({ post }) => {

    const [Title, SetTitle] = useState(post.title);
    const [Body, SetBody] = useState(post.body);


    useEffect(() => {
    }, []);

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

                <h5>Title :  {Title} </h5>
                <h5>Body :  {Body} </h5>
            </div>
        </>
    );
};

export default PostsComp;
