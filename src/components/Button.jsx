import PropTypes from 'prop-types';

//This is a common template for a button, we make such kind of components for their re-useability in multiple places
function Button({
    children,
    type = "button",
    textColor = "text-white",
    bgColor = "bg-blue-600",
    className='',
    ...props //...Mat bhul jao bhaiiiiii
    }) {
    return (    
        <button type = {type} className={`px-4 py-2 rounded ${bgColor} ${textColor} ${className}`} {...props}>{children}</button>
    )
}
//children is nothing it might contain plain text or some other component or even a div or a span


Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    textColor: PropTypes.string,
    bgColor: PropTypes.string,
    className: PropTypes.string,
};

export default Button;

//Here we aren't making use of ref and forwardRef and that is because we don't have it's usecase. In case of a input box we might need to focus on it as someone clicks on the label or even validate the inputs or use the input value somewhere and that is why we are making use of ref and forwardRef there.