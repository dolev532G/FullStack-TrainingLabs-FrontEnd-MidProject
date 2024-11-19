import { useState, useEffect } from 'react';
import PostsComp from './PostsComp';

const PostComp = ({ UserIDRep, posts, callbackSetPosts }) => {
    const [PostsPerUser, SetPostsPerUser] = useState([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [AddPostRegion, SetAddPostRegion] = useState(false); // To toggle between AddPost form and Post list

    // Effect to filter posts for the current user (UserIDRep)
    useEffect(() => {
        FuncPostPerUser();
    }, [UserIDRep, posts]); // Trigger when UserIDRep or posts change

    const FuncPostPerUser = () => {
        // Filter posts by userId
        const postsUserA = posts.filter((post) => post.userId === UserIDRep);
        SetPostsPerUser(postsUserA);
        console.log("Filtered PostsPerUser:", postsUserA); // Debug filtered posts

    };




    // Add a new post
    const AddPost = (action, title, body) => {
        if (action) {
            // Create new post with unique ID
            const newPost = {
                userId: UserIDRep,
                title: title,
                body: body,
                id: posts.length + 1, // Ensure a unique id for the new post
            };

            // Update parent component state with the new post
            callbackSetPosts([...posts, newPost]);

            // Reset the input fields and hide the form
            setBody('');
            setTitle('');
            SetAddPostRegion(false);
        }
    };

    return (
        <>
            <div
                style={{
                    border: '1px solid gray',
                    borderRadius: '5px',
                    padding: '10px',
                }}
            >
                <h3>Posts - User {UserIDRep}</h3>

                {/* Button to toggle Add Post form */}
                <button
                    onClick={() => SetAddPostRegion(true)}
                    style={{
                        backgroundColor: '#ffcc00',
                        color: 'black',
                        padding: '5px 10px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Add Post
                </button>

                {/* Show Add Post form if AddPostRegion is true */}
                {AddPostRegion ? (
                    <div>
                        <h4>Add a New Post</h4>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px',
                                marginBottom: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }}
                        />
                        <textarea
                            placeholder="Body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            rows="4"
                            style={{
                                width: '100%',
                                padding: '8px',
                                marginBottom: '10px',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }}
                        />
                        <button
                            onClick={() => AddPost(true, title, body)}
                            style={{
                                backgroundColor: '#28a745',
                                color: 'white',
                                padding: '5px 10px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            Submit Post
                        </button>
                        <button
                            onClick={() => SetAddPostRegion(false)}
                            style={{
                                backgroundColor: '#dc3545',
                                color: 'white',
                                padding: '5px 10px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                marginLeft: '10px',
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    // If not in AddPostRegion, show the list of posts
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {PostsPerUser.map((post) => (
                            <PostsComp key={post.id} post={post} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default PostComp;
