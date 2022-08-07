// trigger when click into input editable, it will select all text
export const selectInlineTittle = (e) =>{
    e.target.select()
}

// trigger when press key Enter, it will blur the input and call handleUpdate() func
export const handleColumnTitleOnEnter = (e,handleUpdate)=>{
    if(e.key === "Enter"){
        e.target.blur()
        // handleUpdate()
    }
}
