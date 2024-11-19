import { useState, useEffect } from "react";
import axios from "axios";

import UserComp from "./UserComp";
import TodoComp from "./TodoComp";
import PostComp from "./PostComp";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

const App = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [todos, setTodos] = useState([]);
  const [search, SetSearch] = useState("");
  const [userCompData, SetUsersComp] = useState([]);
  const [UserTasksTodoRegion, SetUserTasksTodoRegion] = useState(false);
  const [AddTodoRegion, SetAddTodoRegion] = useState(false);

  const [ClickedUserId, SetClickedId] = useState(null);

  const [AddUserRegion, SetAddUserRegion] = useState(false); // State to toggle "Add User" form
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    zip_code: "",
  });

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      const { data: users_A } = await axios.get(USERS_URL);
      const { data: posts_A } = await axios.get(POSTS_URL);
      const { data: todos_A } = await axios.get(TODOS_URL);

      setUsers(users_A);
      setPosts(posts_A);
      setTodos(todos_A);
      ArrangeDate(users_A, todos_A);
    };
    fetchData();
  }, []);



  const ArrangeDate = (updatedUsers = users, Updatetodos = todos) => {
    let tmp = updatedUsers.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      street: user.address.street,
      city: user.address.city,
      zip_code: user.address.zipcode,
      tasks_completed:
        Updatetodos.filter(
          (todo) => todo.userId === user.id && todo.completed === false
        ).length > 0
          ? false
          : true,
    }));

    if (search.length > 0) {
      tmp = tmp.filter(
        (user) => user.name.includes(search) || user.email.includes(search)
      );
    }

    SetUsersComp(tmp);
  };

  const AddUser = () => {
    const newUser = {
      id: users.length + 1, // Just a simple id increment for this example
      name: newUserData.name,
      email: newUserData.email,
      address: {
        street: newUserData.street,
        city: newUserData.city,
        zipcode: newUserData.zip_code,
      },
    };
    setUsers((prevUsers) => [...prevUsers, newUser]); // Add new user to the state
    ArrangeDate([...users, newUser]); // Update user data for display
    SetAddUserRegion(false); // Hide Add User form after submission
  };

  const CancelAddUser = () => {
    SetAddUserRegion(false); // Hide the Add User form
    setNewUserData({
      name: "",
      email: "",
      street: "",
      city: "",
      zip_code: "",
    }); // Clear the form data
  };

  const UpdateUderFromChild = (CompId, updatedData) => {
    const updatedUsers = users.map((user) => {
      if (user.id === CompId) {
        return {
          ...user,
          ...updatedData,
          address: {
            ...user.address,
            ...updatedData.address,
          },
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    ArrangeDate(updatedUsers);
  };

  const DeleteUderFromChild = (CompId) => {
    const updatedUsers = users.filter((user) => user.id !== CompId);
    const updatedposts = posts.filter((post) => post.userId !== CompId);
    const updatedtodos = todos.filter((todo) => todo.userId !== CompId);

    setUsers(updatedUsers);
    setTodos(updatedtodos);
    setPosts(updatedposts);
    ArrangeDate(updatedUsers);
  };

  const SelectingUser = (CompId) => {
    if (CompId === ClickedUserId) {
      SetUserTasksTodoRegion(false);
      SetClickedId(null)
      return true;
    }
    else {
      if (ClickedUserId === null) {
        SetUserTasksTodoRegion(true)
        SetClickedId(CompId);
        return true;
      }
      else
        alert("Please disable previous selection");
        return false;
    }


  };

  const MarkComplete = (TodoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === TodoId) {
        return { ...todo, completed: true };
      }
      return todo;
    });
    setTodos(updatedTodos); // Ensure the state gets updated with a new array reference
  };

  const MarkAllComplete = (UserId) => {
    const updatedTodos = todos.map((todo) =>
      todo.userId == UserId ? { ...todo, completed: true } : todo
    );
    setTodos([...updatedTodos]); // Force a new reference
    ArrangeDate(users, updatedTodos); // Update userCompData
  };


  const AddTodo = (action, title) => {
    if (action) {
      const newTodo = {
        userId: ClickedUserId,
        title: title,
        completed: false,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]); // Add the new todo to the state
    }
    SetUserTasksTodoRegion(false);
    SetAddTodoRegion(false);
  };


  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          minHeight: "100vh",
        }}
      >
        {/* Left: Users Section */}
        <div
          style={{
            border: "1px solid gray",
            borderRadius: "5px",
            padding: "20px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2>Users</h2>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <input
              type="text"
              value={search}
              onChange={(e) => SetSearch(e.target.value)}
              placeholder="Search by name or email"
              style={{
                width: "100%",
                padding: "8px",
                marginRight: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={() => SetAddUserRegion(true)}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "8px 15px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Add User
            </button>

          </div>

          {AddUserRegion ? (
            <div>
              <h4>Add New User</h4>
              <input
                type="text"
                placeholder="Name"
                value={newUserData.name}
                onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <input
                type="email"
                placeholder="Email"
                value={newUserData.email}
                onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <input
                type="text"
                placeholder="Street"
                value={newUserData.street}
                onChange={(e) => setNewUserData({ ...newUserData, street: e.target.value })}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <input
                type="text"
                placeholder="City"
                value={newUserData.city}
                onChange={(e) => setNewUserData({ ...newUserData, city: e.target.value })}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <input
                type="text"
                placeholder="Zip Code"
                value={newUserData.zip_code}
                onChange={(e) => setNewUserData({ ...newUserData, zip_code: e.target.value })}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                onClick={AddUser}
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  padding: "8px 15px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Add User
              </button>
              <button
                onClick={CancelAddUser}
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  padding: "8px 15px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div style={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
              {userCompData.map((user) => (
                <div key={user.id} style={{ marginBottom: "10px" }}>
                  <UserComp
                    user={user}
                    callbackSelectingUser={SelectingUser}
                    callbackDeleteUser={DeleteUderFromChild}
                    callbackUpdateUser={UpdateUderFromChild}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Todos and Posts Section */}
        <div
          style={{
            border: "1px solid gray",
            borderRadius: "5px",
            padding: "20px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            maxHeight: "calc(100vh - 40px)",
            overflowY: "auto",
          }}
        >
          {UserTasksTodoRegion && (
            <div>
              <TodoComp
                key={"TODO" + ClickedUserId} // Ensure unique key for re-rendering
                UserIDRep={ClickedUserId}
                todos={todos}
                callbackSetTodo={setTodos}
                callbackMarkMain={MarkComplete}
                callbackMarAllkMain={MarkAllComplete}
              />
              {/* Posts Section */}
              <PostComp key={"POST" + ClickedUserId} UserIDRep={ClickedUserId} callbackSetPosts={setPosts} posts={posts} />
            </div>
          )}
          {AddTodoRegion && <AddTodo callback={AddTodo} />}
        </div>
      </div>
    </div>
  );
};

export default App;