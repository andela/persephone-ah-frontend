import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Button = ({ customClassName, buttonText, isInverse, handleclick }) => {
  const buttonTypeClassName = isInverse ? 'button-inverse' : 'button-normal';

  return (
    <button
      className={`button ${buttonTypeClassName} ${customClassName}`}
      onClick={handleclick}
    >
      <span>{buttonText}</span>
    </button>
  );
};

Button.propTypes = {
  customClassName: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  isInverse: PropTypes.bool,
  handleclick: PropTypes.func
};

export default Button;
