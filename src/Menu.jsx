import React, {useState} from 'react'
import Todo from './Todo'

import iconMoon from './images/icon-moon.svg'
import iconSun from './images/icon-sun.svg'
import iconPlus from './images/icon-plus.svg'

function Menu(props) {
    const [inputText, setInputText] = useState("")
    const [todoArray, setTodoArray] = useState([])

    function handleChange(event){
        setInputText(event.target.value)
    }
    function handleSubmit(){
        if(inputText.trim() !== ""){
            setTodoArray(prevState => [...prevState, {text: inputText, isToggled: false, id: prevState.length}])
            setInputText("")
        }
    }
    function manageToggle(id){
        setTodoArray(prevArray => prevArray.map(item => item.id === id ? {...item, isToggled: !item.isToggled} : item))
    }
    console.log(todoArray)
    const todoElements = todoArray.map(todo => <Todo key={todo.id} id={todo.id} isDarkMode={props.isDarkMode} text={todo.text} isToggled={todo.isToggled} manageToggle={manageToggle}/>)

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
                        />
                    </div>
                    <button className={`flex items-center m-0 h-8 w-8 rounded-full border border-gray-500 justify-center text-gray-500 focus:outline-none`}
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
                        <h4>{todoArray.length} items </h4>
                        <div className='hidden sm:flex'>
                            <button className='mx-1'>All</button>
                            <button className='mx-1'>Active</button>
                            <button className='mx-1'>Completed</button>
                        </div>
                        <button>Clear completed</button>
                    </div>
                </div>

                <div className={`${props.isDarkMode ? "bg-[#293241]" : "bg-white shadow-2xl" } flex rounded-lg w-full items-center justify-center font-bold text-gray-500 py-3 sm:hidden`}>
                    <div>
                        <button className='mx-2'>All</button>
                        <button className='mx-2'>Active</button>
                        <button className='mx-2'>Completed</button>
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


