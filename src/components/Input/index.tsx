import { FC, InputHTMLAttributes } from 'react';
import classNames from 'classnames/bind';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  className?: string;
  errorMessage?: string | false;
  inputSize?: 'small' | 'medium' | 'large';
}

const cn = classNames.bind({
  small: 'h-[35px] text-xs',
  medium: 'h-[40px] text-sm',
  large: 'h-[45px] text-base',
});

const Input: FC<IInput> = ({
  label,
  errorMessage,
  placeholder,
  inputSize = 'medium',
  className,
  ...args
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <span className="text-slate-600 text-xs font-medium">{label}</span>
      )}

      <input
        {...args}
        placeholder={placeholder || label}
        className={cn(
          'w-full h-[40px]',
          'border border-slate-200',
          'font-poppins text-sm',
          'bg-white outline-none',
          'px-3 focus:border-sky-400',
          { '!border-red-300 bg-red-50/50': errorMessage },
          inputSize,
          className
        )}
      />

      {errorMessage && (
        <span className="text-xs text-red-400">{errorMessage}</span>
      )}
    </div>
  );
};

export default Input;
