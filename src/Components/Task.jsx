import { useContext } from "react";
import { AppContext } from "../App";

function Task(props) {
  const task = props.task;
  const index = props.index;

  const context = useContext(AppContext);

  function handleRemoveTask() {
    context.onRemoveTask(index)
  }

  function handleEditTask() {
    context.onSetTaskForm({
      title: "Sửa công việc",
      isFormUpdate: true,
      isVisible: true,
      data: task
    })
  }

  function showDate(date) {
    const newDate = new Date(date);

    return `${newDate.getDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
  }

  return (
    <div className="TaskContainer">
      <div className="Task fl-1 TaskIndex">{index + 1}</div>
      <div className="Task fl-5 TaskName">{task.name}</div>
      <div className="Task fl-3 TaskCreated">
        {showDate(task.createdAt)}
      </div>
      <div className="Task fl-2 TaskStatus">
        <span className={`${task.status ? "TaskStatusCompleted" : ""}`} onClick={function () {
          context.onSubmitTaskForm({ ...task, status: !task.status })
        }}>
          {task.status ? "Hoàn thành" : "Chưa hoàn thành"}
        </span>
      </div>
      <div className="Task fl-2 TaskActions">
        <button type="button" className="TaskBtnEdit" onClick={handleEditTask}>Sửa</button>
        <button type="button" className="TaskBtnRemove" onClick={handleRemoveTask}>Xoá</button>
      </div>
    </div>
  );
}

export default Task;