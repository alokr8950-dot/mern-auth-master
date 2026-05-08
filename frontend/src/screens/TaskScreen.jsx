import { useEffect, useState } from "react";

const API_URL = "https://mern-auth-master.onrender.com";

const TaskScreen = () => {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_URL}/api/tasks`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setTasks(data);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ADD TASK
  const addTask = async () => {
    if (!title) return;

    try {
      const res = await fetch(`${API_URL}/api/tasks`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      const data = await res.json();

      if (res.ok) {
        setTitle("");
        fetchTasks();
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Task Dashboard</h1>

      <div className="d-flex gap-2 mt-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className="btn btn-primary" onClick={addTask}>
          Add Task
        </button>
      </div>

      <div className="mt-5">
        {tasks.length === 0 ? (
          <h3>No Tasks Found</h3>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="card p-3 mb-2">
              {task.title}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskScreen;