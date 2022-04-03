import { createContext, useEffect, useState } from "react";
import "./App.css";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
export const AppContext = createContext();
function App() {
  const [taskList, setTaskList] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState({
    title: "",
    isVisible: false,
    isFormUpdate: false,
    data: null
  });

  useEffect(()=>{
    document.title = "Danh sách công việc"
  }, [])

  function handSubmitTaskForm(task) {
    const arr = [...taskList];
    const index = arr.findIndex(item => item.id === task.id);
    if (index !== -1) {
      arr[index] = { ...task };
    } else {
      arr.push(task)
    }
    setTaskList(arr)
  }

  function handleShowFormAddTask() {
    setShowTaskForm({
      ...showTaskForm,
      title: "Thêm công việc",
      isVisible: (!showTaskForm.isVisible || showTaskForm.isFormUpdate) ? true : false,
      isFormUpdate: false,
      data: null
    })
  }

  function handleRemoveTask(index) {
    const arr = [...taskList];
    arr.splice(index, 1);
    setTaskList(arr)
  }

  const valueContext = {
    onRemoveTask: handleRemoveTask,
    showTaskForm: showTaskForm,
    onSetTaskForm: setShowTaskForm,
    onSubmitTaskForm: handSubmitTaskForm,
  }

  return (
    <AppContext.Provider value={valueContext}>
      <div className="App">
        <h1>Danh sách công việc</h1>
        <div className="TaskListContainer">
          {
            showTaskForm.isVisible ?
              <TaskForm />
              : <></>
          }
          <div className="TaskListResult">
            <button type="button" className="TaskListResultBtnAdd" onClick={function () {
              handleShowFormAddTask()
            }}>Thêm công việc</button>
            <TaskList taskList={taskList} />
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
