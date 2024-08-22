import { FC, TextareaHTMLAttributes } from 'react';
import classNames from 'classnames/bind';

interface ITextarea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  placeholder?: string;
  errorMessage?: string | false;
  size?: 'small' | 'medium' | 'large';
}

const cn = classNames.bind({
  small: 'h-[35px] text-xs',
  medium: 'h-[40px] text-sm',
  large: 'h-[45px] text-base',
});

const Textarea: FC<ITextarea> = ({
  label,
  errorMessage,
  placeholder,
  size = 'medium',
  ...args
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <span className="text-slate-600 text-xs font-medium">{label}</span>
      )}

      <textarea
        {...args}
        placeholder={placeholder || label}
        className={cn(
          'w-full min-h-[100px]',
          'border border-slate-200',
          'font-poppins text-sm',
          'bg-white outline-none',
          'p-3 focus:border-sky-400',
          'resize-none',
          { '!border-red-300 bg-red-50/50': errorMessage },
          size
        )}
      />

      {errorMessage && (
        <span className="text-xs text-red-400">{errorMessage}</span>
      )}
    </div>
  );
};

export default Textarea;
