import React, {useState} from 'react'
import iconCheck from './images/icon-check.svg'

function Todo(props) {

    return (
        <div className='flex items-center p-4 border-b-[1px] border-gray-500'>
            <button className={`flex items-center m-0 h-8 w-8 rounded-full border border-gray-500 justify-center ${props.isToggled ? "bg-gradient-to-br from-[#40c9ff] to-[#e81cff]" : (props.isDarkMode ? "bg-[#293241]" : "bg-white")} text-gray-500 focus:outline-none`}
                onClick={() => props.manageToggle(props.id)}
            >   
                <img src={iconCheck} alt="checkIcon" className={`${props.isToggled ? "" : "hidden"}`}/>
            </button>
            <div className="flex-1 ml-4">
                <h3 className={`focus:outline-none w-full ${props.isDarkMode ? "bg-[#293241] text-[#C9CBE2]" : "bg-white"} ${props.isToggled ? "line-through text-[#46485C]" : ""}`}>{props.text}</h3>
            </div>
        </div>
    )
}

export default Todo