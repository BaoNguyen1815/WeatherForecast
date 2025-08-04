import React, { InputHTMLAttributes, forwardRef, ReactNode } from 'react';
import './Input.scss';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  rightElement?: ReactNode; 
  className?: string;
  //Maybe some common styles can be added here as a props like outline, filled, etc
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ rightElement, className, ...props }, ref) => {
  return (
    <div className="input-wrapper">
      <input ref={ref} {...props} className={`input-element ${className}`} />
      {rightElement}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;