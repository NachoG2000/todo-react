import React from 'react'

import iconCheck from './images/icon-check.svg'
import iconCross from './images/icon-cross.svg'

function Todo(props) {

    return (
        <div className='flex justify-between p-4 items-center border-b-[1px] border-gray-500'>
            <div className='flex items-center'>
                <button className={`flex items-center m-0 h-8 w-8 rounded-full border border-gray-500 justify-center ${props.isToggled ? "bg-gradient-to-br from-[#40c9ff] to-[#e81cff]" : (props.isDarkMode ? "bg-[#293241]" : "bg-white")} text-gray-500 focus:outline-none`}
                    onClick={() => props.manageToggle(props.id)}
                >   
                    <img src={iconCheck} alt="checkIcon" className={`${props.isToggled ? "" : "hidden"}`}/>
                </button>
                <div className="flex-1 ml-4">
                    <h3 className={`focus:outline-none w-full text-center ${props.isDarkMode ? (props.isToggled ? "line-through text-[#46485C]" : "text-[#C9CBE2]") : (props.isToggled ? "line-through text-[#C9CBE2]" : "text-[#46485C]")}`}>{props.text}</h3>
                </div>
            </div>
            <img src={iconCross} alt="checkIcon" className='cursor-pointer' onClick={() => props.deleteItem(props.id)}/>
        </div> 
    )
}

export default Todo


