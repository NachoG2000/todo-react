import React, {useState, useRef, useEffect} from 'react'
import Todo from './Todo'
import { nanoid } from 'nanoid';

import iconMoon from './images/icon-moon.svg'
import iconSun from './images/icon-sun.svg'
import iconPlus from './images/icon-plus.svg'

function Menu(props) {
    const [inputText, setInputText] = useState("")
    const [todoArray, setTodoArray] = useState(
        () => JSON.parse(localStorage.getItem("todoArray")) || []
    )
    const [displayedArray, setDisplayedArray] = useState("All")
    const inputRef = useRef(null)
    let todoElements

    function handleChange(event){
        setInputText(event.target.value)
    }
    function handleSubmit(){
        if(inputText.trim() !== ""){
            setTodoArray(prevState => [{text: inputText, isToggled: false, id: nanoid()}, ...prevState])
            setInputText("")
            inputRef.current.focus()
        }
    }    
    function handleKeyDown(event){
        if (event.keyCode === 13) {
            handleSubmit()
        }
    }

    function manageToggle(id){
        setTodoArray(prevArray => prevArray.map(item => item.id === id ? {...item, isToggled: !item.isToggled} : item))
    }
    function clearCompleted(){
        setTodoArray(prevArray => prevArray.filter(todo => todo.isToggled === false))
    }
    function deleteItem(id){
        setTodoArray(prevArray => prevArray.filter(todo => todo.id !== id))
    }
    
    if(displayedArray === "All"){
        todoElements = todoArray.map(todo => <Todo key={todo.id} id={todo.id} isDarkMode={props.isDarkMode} text={todo.text} isToggled={todo.isToggled} manageToggle={manageToggle} deleteItem={deleteItem}/>)
    }
    else if(displayedArray === "Active"){
        todoElements = todoArray.filter(todo => todo.isToggled === false).map(todo => <Todo key={todo.id} id={todo.id} isDarkMode={props.isDarkMode} text={todo.text} isToggled={todo.isToggled} manageToggle={manageToggle} deleteItem={deleteItem}/>)
    }
    else if(displayedArray === "Completed"){
        todoElements = todoArray.filter(todo => todo.isToggled === true).map(todo => <Todo key={todo.id} id={todo.id} isDarkMode={props.isDarkMode} text={todo.text} isToggled={todo.isToggled} manageToggle={manageToggle} deleteItem={deleteItem}/>)
    }
    
    useEffect(() => {
        localStorage.setItem("todoArray", JSON.stringify(todoArray))
    }, [todoArray])
    
    return (
        <div className='absolute z-40 top-16 left-1/2 transform -translate-x-1/2 w-full px-6 sm:w-[80%] lg:w-[50%]'>
            <div className='flex flex-col'>

                <div className='flex flex-row justify-between items-center mb-10'>
                    <h1 className='font-bold text-white text-4xl'>T O D O</h1>
                    <img src={props.isDarkMode ? iconSun : iconMoon} alt="icondarkmode" 
                        onClick={props.toggleDarkMode}  className='w-[30px] h-[30px]'
                    />
                </div>

                <div className={`${props.isDarkMode ? "bg-[#293241]" : "bg-white shadow-2xl" } flex rounded-lg w-full p-3 mb-4 items-center`}>
                    <div className="flex-1 ml-4">
                        <input type="text" 
                            className={`focus:outline-none w-full ${props.isDarkMode ? "bg-[#293241] text-[#C9CBE2]" : "bg-white"}`}
                            onChange={handleChange}
                            value={inputText}
                            name="inputText"
                            placeholder='Create a new todo...'
                            onKeyDown={handleKeyDown}
                            ref={inputRef}
                        />
                    </div>
                    <button className={`flex items-center h-8 w-8 rounded-full border border-gray-500 justify-center focus:outline-none`}
                            onClick={handleSubmit}
                    >
                        <img src={iconPlus} alt="checkIcon"/>
                    </button>
                </div>

                { 
                todoArray.length > 0 ?
                <>               
                <div className={`${props.isDarkMode ? "bg-[#293241]" : "bg-white shadow-2xl" } flex flex-col rounded-lg mb-4 w-full`}>
                    <div className='h-full'>
                        {todoElements}
                    </div>
                    <div className='flex self-end justify-between w-full p-4 border-t-[1px] text-gray-500 font-semibold border-gray-500'>
                        <h4>{todoArray.filter(todo => todo.isToggled === false).length} items left</h4>
                        <div className='hidden sm:flex'>
                            <button className={`mx-2 ${displayedArray == "All" ? "text-[#4E7BE6]" : "text-gray-500"}`} onClick={() => setDisplayedArray("All")}>All</button>
                            <button className={`mx-2 ${displayedArray == "Active" ? "text-[#4E7BE6]" : "text-gray-500"}`} onClick={() => setDisplayedArray("Active")}>Active</button>
                            <button className={`mx-2 ${displayedArray == "Completed" ? "text-[#4E7BE6]" : "text-gray-500"}`} onClick={() => setDisplayedArray("Completed")}>Completed</button>
                        </div>
                        <button className='hover:text-[#4E7BE6]' onClick={clearCompleted}>Clear completed</button>
                    </div>
                </div>

                <div className={`${props.isDarkMode ? "bg-[#293241]" : "bg-white shadow-2xl" } flex rounded-lg w-full items-center justify-center font-bold py-3 sm:hidden`}>
                    <div>
                        <button className={`mx-2 ${displayedArray == "All" ? "text-[#4E7BE6]" : "text-gray-500"}`} onClick={() => setDisplayedArray("All")}>All</button>
                        <button className={`mx-2 ${displayedArray == "Active" ? "text-[#4E7BE6]" : "text-gray-500"}`} onClick={() => setDisplayedArray("Active")}>Active</button>
                        <button className={`mx-2 ${displayedArray == "Completed" ? "text-[#4E7BE6]" : "text-gray-500"}`} onClick={() => setDisplayedArray("Completed")}>Completed</button>
                    </div>
                </div>
                </>
                : 
                ""
                }
            </div>
        </div>
    )
}

export default Menu


