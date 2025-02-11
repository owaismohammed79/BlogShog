import PropTypes from 'prop-types'

function Logo({width = '', height = ''}) {
  return (
    <div className="flex items-center justify-center h-auto">
      <img 
        src='../../assets/BlogLogo.png' 
        alt="Blog Logo" 
        style={{ width: `${width}px`, height: `${height}px` }}
        className="object-cover  rounded-md" 
      />
    </div>
  )
}

Logo.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
}

export default Logo