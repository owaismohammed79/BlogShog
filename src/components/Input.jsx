import React, {useId} from "react";
import PropTypes from 'prop-types'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    onChange,
    ...props
},ref) {
    const id = useId();
    return(
        <div className="w-full">
            {label && <label className= 'inline-block mb-1 pl-1' htmlFor={id}>{label}</label>}
            <input type = {type} onChange={onChange} className= {`px-3 py-2 rounded-lg bg-white text-black outline-none focus:outline-none focus:ring-2 duration-200 border border-gray-200 w-full ${className}`} {...props} ref={ref}  id={id}/>
        </div>//In the above i/p box you can see that we are passing the reference we have taken from the user and also see that we have enclosed this whole function in forward Ref so that the parent component can make use of the states that this component has or even focus on this input box
    )
})

Input.propTypes ={
    className: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func
}

export default Input