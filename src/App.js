import './App.css';
import { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdDescription, MdDone } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
function App() {
  const[isCompleted, setIsCompleted] =useState(false);
  const [allTodos, setTodos]= useState([]);
  const [newTitle, setNewTitle] = useState("");
  const[newDescription, setNewDescription] = useState("");
  const[completedTodos, setCompletedTodos]= useState([]);
  const [currentEdit,setCurrentEdit] =useState([]);
  const[currentEditedItem, setCurrentEditedItem] = useState("");

  // Function to handle adding a new todo item
  const handleAddTodo = ()=>{
    let newTodoItem={
      title:newTitle,
      description:newDescription,
    }    

    //update the todo array with the new item
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);

    //save updated todo list to local storage
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr)) 

    // Clear the input fields after adding a new todo
    setNewTitle("");
    setNewDescription("");
  };

  const handleDeleteTodo =(index)=>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index ,1); // remove only one element at specific index
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo)   
  }

  const handleComplete =(index)=>{
    let now = new Date();
    let dd =now.getDate();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let h= now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filteredItem= {
      ...allTodos[index],
      completedOn: completedOn
    }

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);   

    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  }

  const handleDeleteCompletedTodo = (index)=>{
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index ,1); // remove only one element at specific index
    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo) 
  }

  const handleEdit =(ind,item)=>{
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  }

  const handleUpdateTitle =(value)=>{
    setCurrentEditedItem((prev)=>{
      return{...prev,title:value}
    })
  }

  const handleUpdateDescription= (value)=>{
    setCurrentEditedItem((prev)=>{
      return{...prev,description:value}
    })
  }

  const handleUpdateTodo = ()=>{
    let newTodo = [...allTodos];
    newTodo[currentEdit] = currentEditedItem;
    setTodos(newTodo);
    setCurrentEdit("");
  }
  //useEffect to load saved todo items from the local storage when the component mounts
  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if(savedTodo){
      setTodos(savedTodo);
    }

    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
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
          <button className={`secondaryBtn ${isCompleted === false && 'active'}`} onClick={()=> setIsCompleted(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleted === true && 'active'}`} onClick={()=> setIsCompleted(true)}>Completed</button>
        </div>
        <div className='todo-list-wrapper'>        
          {isCompleted === false && allTodos.map((item,index)=>{
            if(currentEdit===index){
            return(
              <div className='edit-wrapper' key={index}>
              <input placeholder='Updated Title'
               value={currentEditedItem.title} 
              onChange={(e)=>handleUpdateTitle(e.target.value)}/>

              <textarea placeholder='Updated Title' value={currentEditedItem.description} 
              onChange={(e)=>handleUpdateDescription(e.target.value)}
              rows={4}/>      

              <button type='button' className='primaryBtn' onClick={handleUpdateTodo}>Update</button>  
              </div>
            )
            }
            else{
              return(
                <div className='todo-list-item' key={index}>
                  <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              </div>
              <div className='icon-div'>          
              <RiDeleteBin6Line onClick={()=>handleDeleteTodo(index)} title='delete'/>
              <MdDone onClick={()=> handleComplete(index)} title='complete'/>
              <MdOutlineEdit onClick={()=> handleEdit(index,item)} title='edit'/>
              </div>
            </div> 
              )
            }          
          })}
           {isCompleted === true && completedTodos.map((item,index)=>{
            return(
              <div className='todo-list-item' key={index}>
                <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>
              <small>
                Completed on: {item.completedOn}
              </small>
            </p>
            </div>
            <div className='icon-div'>          
            <RiDeleteBin6Line onClick={()=>handleDeleteCompletedTodo(index)} title='delete'/>
            {/* <MdDone onClick={()=> handleComplete(index)}/> */}
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
