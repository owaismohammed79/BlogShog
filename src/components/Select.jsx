import React, {useId} from 'react'
import PropTypes from 'prop-types';

//Custom drop-down list element
export const Select = React.forwardRef(function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
  //ForwardRef is to allow the parents to access to the properties of this element as they'll be used someWhere else
  const id = useId();
  return (
    <div className='w-full'>
      <select 
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className} `} 
        id = {id} 
        {...props} 
        ref={ref}> 
        {options?.map((option) => ( //Watch the syntax of ternary op and in the above line do check the reference passed is of the select tag and in the below line check that the key is given to iteratable unique elements which are option tags here
          <option key = {option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
})

Select.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  className: PropTypes.string
}

export default Select