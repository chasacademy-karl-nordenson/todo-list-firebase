import React, { useState, useEffect } from 'react'
import { addTodosDB , fetchFromDB, updateTodosDB, deleteTodoDB} from '../db/operations.js'
import Todo from './Todo.jsx'

function TodoList() {

    const [input, setInput] = useState("")
    const [todos, setTodos] = useState([])
    const [toggled, setToggle] = useState(false)

    const handleChange = (event) => {
        setInput(event.target.value)
        
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Lägg till todo, både i UI och DB
        addTodo();
        setInput("")
    }

    const toggleCompleted = (id) => {
        toggled ? setToggle(false) : setToggle(true)
        
        const editedList = todos.map((item) => {
            if(id === item.id) {
                updateTodosDB(id, {...item, completed: !item.completed})
                return {...item,  completed: !item.completed}
            }
            return item
        })
        setTodos(editedList)
    }


    const addTodo = () => {
        const newTodo = {
            desc: input,
            complete: false

        }

        addTodosDB(newTodo)
        setTodos([...todos, newTodo])


    }

    const editTodo = (id, newDesc) => {
        const editedList = todos.map((item) => {
            if(id === item.id) {
                updateTodosDB(id, {...item, desc: newDesc})
                return {...item, desc: newDesc}
            }
            return item
        })
        setTodos(editedList)

    }

    const deleteTodo = (id) => {
        const remainingTodos = todos.filter(item => {
            return id !== item.id;
        })

        deleteTodoDB(id)

        setTodos(remainingTodos)

    }



    useEffect(() => {
        console.log("use effect körs")
        fetchFromDB().then((newTodo) => {
            setTodos(newTodo)
        }); 


    }, [todos.length])

/*     console.log(todos) */
 


    return(
      <div>
        <h1>My todos</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor="">Add a todo</label>
        <input type="text" onChange={handleChange} value={input}/>
        <button type="submit">Add</button>
        
        </form>
        <ul>
            {todos.map((item) => {
                return <Todo
                key={item.id}
                id={item.id}
                desc={item.desc}
                completed={item.completed}
                toggleCompleted={toggleCompleted}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
                
                
                />
                
                
            })}

        </ul>
        <Todo/>
      </div>
    
    )


}

export default TodoList
