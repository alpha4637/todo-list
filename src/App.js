import './App.css';
import { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdDescription, MdDone } from "react-icons/md";
function App() {
  const[isCompleted, setIsCompleted] =useState(false);
  const [allTodos, setTodos]= useState([]);
  const [newTitle, setNewTitle] = useState("");
  const[newDescription, setNewDescription] = useState("");

  const handleAddTodo = ()=>{
    let newTodoItem={
      title:newTitle,
      description:newDescription,
    }    
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
  };

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    if(savedTodo){
      setTodos(savedTodo);
    }
  },[])
  return (    
    <div className="App">
      <h1>My todo's</h1>
       <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type='text' placeholder='Whats the tast title?' value={newTitle} onChange={(e)=>setNewTitle(e.target.value) }/>
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' placeholder='Whats the tast description?' value={newDescription} onChange={(e)=>setNewDescription(e.target.value) } />
          </div>
          <div className='todo-input-item'>           
            <button type='button' className='primaryBtn' onClick={handleAddTodo}>Add</button>
          </div>
        </div>
        <div className='todo-btn-wrapper'>
          <button className={`secondaryBtn ${isCompleted=== false && 'active'}`} onClick={()=> setIsCompleted(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleted=== true && 'active'}`} onClick={()=> setIsCompleted(true)}>Completed</button>
        </div>
        <div className='todo-list-wrapper'>
          {/* <div className='todo-list-item'>
            <h3>Task 1</h3>
            <p>Description</p>
            <div className='icon-div'>          
            <RiDeleteBin6Line />
            <MdDone />
            </div>
          </div> */}
          {allTodos.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>

            <div className='icon-div'>          
            <RiDeleteBin6Line />
            <MdDone />
            </div>
          </div> 
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
