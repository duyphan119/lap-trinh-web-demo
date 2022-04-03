import Task from "./Task";

function TaskList(props) {
  const taskList = props.taskList;

  return (
    <div className="TaskList">
      {taskList.length !== 0 &&
        <div className="TaskListMain">
          <div className="TaskListTitleList">
            <div className="TaskListTitle fl-1">STT</div>
            <div className="TaskListTitle fl-5">Tên Công Việc</div>
            <div className="TaskListTitle fl-3">Thời gian</div>
            <div className="TaskListTitle fl-2">Trạng thái</div>
            <div className="TaskListTitle fl-2">Hành động</div>
          </div>
          {taskList.length !== 0 && taskList.map((task, index) => {
            return <Task key={index} index={index} task={task} />
          })}
        </div>
      }
      {taskList.length === 0 && <>Không có công việc nào</>}
    </div>
  );
}

export default TaskList;