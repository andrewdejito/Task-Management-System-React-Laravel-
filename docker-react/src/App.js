import React from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

function App() {
  const [refresh, setRefresh] = React.useState(false);

  return (
    <div className="container">
      <TaskForm onTaskAdded={() => setRefresh(!refresh)} />
      <TaskList key={refresh} />
    </div>
  );
}

export default App;




