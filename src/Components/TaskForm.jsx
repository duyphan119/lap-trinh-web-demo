import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";

function TaskForm(props) {

   const context = useContext(AppContext);

   const [name, setName] = useState("");
   const [status, setStatus] = useState(false);

   function handleSubmit(e) {
      e.preventDefault();
      const task = {
         id: context.showTaskForm.data ? context.showTaskForm.data.id : new Date().getTime(),
         name: name,
         status: status,
         createdAt: context.showTaskForm.data ? context.showTaskForm.data.createdAt : new Date(),
      }
      context.onSubmitTaskForm(task)
   }

   useEffect(() => {
      const data = context.showTaskForm.data;
      if (data) {
         setName(data.name)
         setStatus(data.status)
      } else {
         setName("")
         setStatus(false)
      }
   }, [context.showTaskForm.data])

   return (
      <form onSubmit={handleSubmit} className="TaskForm">
         <h1>{context.showTaskForm.title}</h1>
         <button type="button" className="TaskFormBtnClose" onClick={function () {
            context.onSetTaskForm({
               ...context.showTaskForm,
               isVisible: false,
               data: null
            })
         }}>x</button>
         <div className="TaskFormGroup">
            <label htmlFor="name">Tên công việc</label>
            <input
               name="name"
               value={name}
               id="name"
               autoComplete="off"
               onChange={function (e) {
                  setName(e.target.value)
               }}
            />
         </div>
         <div className="TaskFormGroup">
            <label htmlFor="status">Trạng thái</label>
            <select name="status" id="status" value={status} onChange={function (e) {
               setStatus(e.target.value === "true" ? true : false)
            }}>
               <option value={false}>Chưa hoàn thành</option>
               <option value={true}>Hoàn thành</option>
            </select>
         </div>
         <div className="TaskFormSubmit">
            <button className="TaskFormBtnSubmit" type="submit">
               {context.showTaskForm.isFormUpdate ? "Sửa" : "Thêm"}
            </button>
         </div>
      </form>
   );
}

export default TaskForm;