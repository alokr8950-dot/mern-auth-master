import { useEffect, useState } from "react";

const API_URL = "https://mern-auth-master.onrender.com";

const TaskScreen = () => {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);


  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_URL}/api/tasks`, {
        credentials: "include",
      });

      const data = await res.json();

      setTasks(Array.isArray(data) ? data : []);

    } catch (error) {
      console.log(error);
    }
  };


  // ADD TASK
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await fetch(`${API_URL}/api/tasks`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          title,
        }),
      });

      setTitle("");

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };


  // DELETE TASK
  const deleteHandler = async (id) => {
    try {
      await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "DELETE",

        credentials: "include",
      });

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };


  // COMPLETE TASK
  const completeHandler = async (task) => {
    try {
      await fetch(`${API_URL}/api/tasks/${task._id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          completed: !task.completed,
        }),
      });

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchTasks();
  }, []);


  return (
    <div className="container mt-5">

      <h1 className="mb-4">
        Task Dashboard
      </h1>

      {/* ADD TASK */}
      <form onSubmit={submitHandler}>

        <input
          type="text"
          placeholder="Enter Task"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="form-control my-3"
        />

        <button className="btn btn-primary">
          Add Task
        </button>

      </form>


      {/* TASK LIST */}
      <div className="mt-5">

        {tasks.length === 0 ? (
          <h4>No Tasks Found</h4>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="d-flex justify-content-between align-items-center border p-3 mb-3 rounded"
            >

              <div>
                <h5
                  style={{
                    textDecoration:
                      task.completed
                        ? "line-through"
                        : "none",
                  }}
                >
                  {task.title}
                </h5>

                <p>
                  Status:
                  {" "}
                  {task.completed
                    ? "✅ Completed"
                    : "⏳ Pending"}
                </p>
              </div>


              <div className="d-flex gap-2">

                <button
                  onClick={() =>
                    completeHandler(task)
                  }
                  className="btn btn-success"
                >
                  Complete
                </button>

                <button
                  onClick={() =>
                    deleteHandler(task._id)
                  }
                  className="btn btn-danger"
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