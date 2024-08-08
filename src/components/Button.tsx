import { ButtonHTMLAttributes, FC } from 'react';
import classNames from 'classnames/bind';
import LoadingIcon from '../icons/LoadingIcon';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
}

const cn = classNames.bind({
  small: 'h-[35px] px-4 text-xs',
  medium: 'h-[40px] px-6 text-sm',
  large: 'h-[45px] px-8 text-base',
});

const Button: FC<IButton> = ({
  children,
  size = 'medium',
  className,
  type = 'button',
  loading = false,
  disabled = false,
  ...args
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        'text-center',
        'flex items-center justify-center gap-2',
        'bg-slate-500 text-slate-100 hover:bg-slate-600',
        'font-medium',
        'rounded-md',
        { 'opacity-75 cursor-not-allowed': loading || disabled },
        size,
        className
      )}
      {...args}
    >
      {loading && (
        <LoadingIcon className="animate-spin" width={15} height={15} />
      )}
      {children}
    </button>
  );
};

export default Button;
