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
        body: JSON.stringify({
          title,
          completed: false,
        }),
      });

      if (res.ok) {
        setTitle("");
        fetchTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // TOGGLE COMPLETE
  const toggleComplete = async (task) => {
    try {
      const res = await fetch(`${API_URL}/api/tasks/${task._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !task.completed,
        }),
      });

      if (res.ok) {
        fetchTasks();
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
            <div
              key={task._id}
              className="card p-3 mb-3 d-flex flex-row justify-content-between align-items-center"
            >
              <div>
                <h5
                  style={{
                    textDecoration: task.completed
                      ? "line-through"
                      : "none",
                  }}
                >
                  {task.title}
                </h5>

                <small>
                  Status: {task.completed ? "Completed ✅" : "Pending ⏳"}
                </small>
              </div>

              <div className="d-flex gap-2">
                <button
                  className={`btn ${
                    task.completed
                      ? "btn-warning"
                      : "btn-success"
                  }`}
                  onClick={() => toggleComplete(task)}
                >
                  {task.completed
                    ? "Undo"
                    : "Complete"}
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskScreen;