import React, { useState } from "react";

const Button = (props) => {
    const [count, setCount] = useState(0);

    return(
        <button onClick={()=>setCount(count + 1)} >{props.text} {count}</button>
    );
}

Button.defaultProps = {
    text: "button",
}
export default Button;