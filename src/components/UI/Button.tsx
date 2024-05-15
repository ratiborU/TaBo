// import React from 'react';

type ButtonProps = {
  className: string,
  callback: () => void,
  text: string,
  type: "button" | "submit" | "reset"
}

function Button({className, callback, text, type="button"}: ButtonProps) {
  return (
    <button className={className} onClick={callback} type={type}><span>{text}</span></button>
  );
}

export default Button;