import { ButtonHTMLAttributes, FC } from 'react';
import classNames from 'classnames/bind';
import LoadingIcon from '../../icons/LoadingIcon';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'xSmall' | 'small' | 'medium' | 'large';
  color?: 'sky' | 'red' | 'green' | 'orange';
  loading?: boolean;
}

const cn = classNames.bind({
  xSmall: 'h-[26px] px-3 text-xs',
  small: 'h-[35px] px-4 text-xs',
  medium: 'h-[40px] px-6 text-sm',
  large: 'h-[45px] px-8 text-base',
  sky: 'bg-sky-400 text-white hover:bg-sky-500',
  red: 'bg-red-400 text-white hover:bg-red-500',
  green: 'bg-green-400 text-white hover:bg-green-500',
  orange: 'bg-orange-400 text-white hover:bg-orange-500',
});

const Button: FC<IButton> = ({
  children,
  size = 'medium',
  className,
  type = 'button',
  color = 'sky',
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
        'font-medium',
        { 'opacity-75 cursor-not-allowed': loading || disabled },
        size,
        color,
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
