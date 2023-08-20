import React from "react";
import './style.css'
const Button =({onClick, text, disabled, width})=>{

return <div onClick={onClick} style={{width:width}}className="custom-button" disabled={disabled}>{text}</div> 
}

export default Button;