import { useState, useEffect } from "react";

export default function TodoApp() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [goal, setGoal] = useState(() => {
    const savedGoal = localStorage.getItem("goal");
    return savedGoal || "";
  });

  const [isGoalSubmitted, setIsGoalSubmitted] = useState(false);

  const handleGoalSubmit = () => {
    if (goal.trim() !== "") {
      setIsGoalSubmitted(true);
    }
  };

  // Save tasks & goal whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("goal", goal);
  }, [goal]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setTasks([]);
  };

  const today = new Date();
  const day = today.toLocaleDateString("en-US", { weekday: "long" });
  const date = today.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      style={{
        backgroundColor: "#6C6A64",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "36px",
          marginBottom: "30px",
          fontFamily:
            "'Playfair Display', 'Baskerville', 'Libre Baskerville', serif",
          fontWeight: "600",
          fontStyle: "italic",
          color: "beige",
          letterSpacing: "2px",
        }}
      >
        My Planner
      </h1>

      <div
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#E3D8B7",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        {/* Date + Day Box inside the beige card */}
        <div
          style={{
            border: "2px solid #6C6A64",
            borderRadius: "10px",
            padding: "10px 15px",
            color: "black",
            backgroundColor: "beige",
            textAlign: "center",
            fontFamily: "'Playfair Display', serif",
            backgroundColor: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(4px)",
            marginBottom: "20px",
          }}
        >
          <div style={{ fontSize: "16px", fontWeight: "bold" }}>{day}</div>
          <div style={{ fontSize: "14px" }}>{date}</div>
        </div>

        {/* Goal of the Day Section */}
        <div
          style={{
            backgroundColor: "#fce7f3",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid hotpink",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              marginBottom: "10px",
              fontSize: "25px",
              paddingLeft: "10px",
              fontFamily:
                "'Playfair Display', 'Baskerville', 'Libre Baskerville', serif",
              fontStyle: "italic",
            }}
          >
            goal of the day
          </h2>
          {isGoalSubmitted ? (
            <div
              style={{
                backgroundColor: "beige",
                padding: "15px",
                borderRadius: "8px",
                border: "1px solid hotpink",
                textAlign: "center",
                color: "black",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {goal}
            </div>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                value={goal}
                onChange={(e) => {
                  setGoal(e.target.value);
                  setIsGoalSubmitted(false);
                }}
                placeholder="Enter your goal..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim() !== "") {
                    handleGoalSubmit();
                  }
                }}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  outline: "none",
                }}
              />
              <button
                onClick={handleGoalSubmit}
                style={{
                  backgroundColor: "beige",
                  color: "black",
                  padding: "10px 16px",
                  border: "1px solid hotpink",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Enter
              </button>
            </div>
          )}
        </div>

        {/* To-do list section */}
        <h2
          style={{
            fontSize: "30px",
            paddingLeft: "10px",
            fontFamily:
              "'Playfair Display', 'Baskerville', 'Libre Baskerville', serif",
            fontStyle: "italic",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "black",
          }}
        >
          to-do’s
        </h2>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task..."
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
            }}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button
            onClick={addTask}
            style={{
              backgroundColor: "beige",
              color: "black",
              padding: "10px 16px",
              border: "1px solid hotpink",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </div>

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {tasks.map((t, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "8px",
                backgroundColor: t.completed ? "#d1fae5" : "#f3f4f6",
                textDecoration: t.completed ? "line-through" : "none",
              }}
            >
              <span
                onClick={() => toggleComplete(index)}
                style={{ cursor: "pointer", flex: 1 }}
              >
                {t.text}
              </span>

              {!t.completed && (
                <button
                  onClick={() => deleteTask(index)}
                  style={{
                    background: "none",
                    border: "1px solid hotpink",
                    color: "hotpink",
                    fontWeight: "bold",
                    fontSize: "16px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    padding: "2px 6px",
                  }}
                >
                  ✕
                </button>
              )}
            </li>
          ))}
        </ul>

        {tasks.length > 0 && (
          <button
            onClick={clearAll}
            style={{
              marginTop: "15px",
              backgroundColor: "hotpink",
              color: "white",
              padding: "10px 16px",
              border: "1px solid hotpink",
              borderRadius: "8px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}
