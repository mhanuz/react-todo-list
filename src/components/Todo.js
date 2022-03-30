import React, { useState ,useEffect} from 'react'
import './Style.css'

const getLocalData = () =>{
  const lists = localStorage.getItem('mytodolist');
  if (lists){
    return JSON.parse(lists)
  }else{
    return []
  }
}
const Todo = () => {
  const [inputdata,setInputData] = useState(null)
  const [items,setItems] = useState(getLocalData)
  const [isEditItem, setIsEditItem] = useState("")
  const [togglebutton, setToggleButton]  = useState(false)


  const addItem =()=>{
    if(!inputdata){
      alert('please add some text')
    }else if(inputdata && togglebutton){
      setItems(
        items.map((data)=>{
            if (data.id === isEditItem){
              return {...data, name:inputdata}
            }
            else{
              return data;
            }
        })
      )
    setInputData("")
    setIsEditItem(null)
    setToggleButton(false)
    }
    
    else{
      const myNewitem = {
        id:new Date().getTime().toString(),
        name:inputdata,
      }
      setItems([...items,myNewitem])
      setInputData("")
    }
  }

  const editItem = (index) =>{
    const item_todo_edited = items.find((data)=>{
      return data.id=== index
    })
    setInputData(item_todo_edited.name)
    setIsEditItem(index)
    setToggleButton(true)
  }

  const deleteItem = (index) =>{
    const updateItem = items.filter((data)=>{
      return data.id !== index
    })
    setItems(updateItem)
    
  }
  const removeAll = ()=>{
    setItems([])
  }

  // localStorage 
  // page reload
   useEffect(()=>{
      localStorage.setItem("mytodolist", JSON.stringify(items))
   },[items])


  return (
    <>
        <div className='main-div'>
        <div className="child-div">
          <figure>
            <img src="./images/td4.png" alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
        </div>
        <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              // value is used To get input value from an input tag in Reactjs
              value={inputdata}
              onChange={(e)=> setInputData(e.target.value)}
            />
            {
              togglebutton ? <i className='fa fa-edit add-btn' onClick={addItem}></i>: <i className='fa fa-plus add-btn' onClick={addItem}></i>
            }
          </div>

          <div className='showItems'>
          {
                      items != null ? (<>
                            {
                              items.map((data)=>{
                                return <div className='eachItem' key={data.id}>
                                <h3>{data.name}</h3>
                                <div className='todo-btn'>
                                  <i className="far fa-edit add-btn" onClick={()=> editItem(data.id)}></i>
                                  <i className="far fa-trash-alt " onClick={()=> deleteItem(data.id)}></i>
                                </div>
                              </div>
                              })
                            }
                      </>):(<>
                        <span> No data</span>
                      </>)
                    
                    }
                
          </div>

          <div className='showItems'>
              <button className='button effect04' data-sm-link-text="Remove All"  onClick={removeAll}>
                <span>CHECK LIST</span>
              </button>
          </div>
        </div>
    </>
  )
}

export default Todo;