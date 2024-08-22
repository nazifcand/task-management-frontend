import classNames from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import Input from '../Input';
import LoadingIcon from '../../icons/LoadingIcon';
import ChevronIcon from '../../icons/ChevronIcon';

interface ISelect {
  options: any[];
  label?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  placeholder?: string;
  value: any;
  readOnly?: boolean;
  disabled?: boolean;
  loading?: boolean;
  keyField?: string;
  labelField?: string;
  onChange?: (option: any) => void;
}

const Select: FC<ISelect> = ({
  options = [],
  label,
  value,
  readOnly = false,
  disabled = false,
  loading = false,
  keyField = 'id',
  labelField = 'title',
  className,
  onChange,
}) => {
  const selectRef = useRef<any>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [search, setSearch] = useState('');

  const selectedOption = options?.find(
    (i) =>
      String(i[keyField]).toLocaleLowerCase() ==
      String(value).toLocaleLowerCase()
  );

  const selectedValueLabel = selectedOption ? selectedOption[labelField] : '';

  const filteredOptions = options.filter((item) => {
    const regex = new RegExp(String(search).toLocaleLowerCase(), 'gi');
    if (String(item[labelField]).toLocaleLowerCase().match(regex)) {
      return item;
    }
  });

  const handleOnClick = (option: any) => {
    setShowOptions(false);
    setSearch('');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChange && onChange(option);
  };

  useEffect(() => {
    if (showOptions) {
      setSearch('');
    }
  }, [showOptions]);

  useEffect(() => {
    const clickEvent = (event: any) => {
      if (!selectRef?.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    window.addEventListener('click', clickEvent);
    return () => {
      window.removeEventListener('click', clickEvent);
    };
  }, []);

  return (
    <div
      ref={selectRef}
      className={classNames(['w-full flex flex-col gap-1', className])}
    >
      {/* label start */}
      {label && (
        <span className="text-slate-600 text-xs font-medium">{label}</span>
      )}
      {/* label */}

      <div className="relative">
        <Input
          readOnly={showOptions || readOnly ? false : true}
          value={showOptions ? search : selectedValueLabel}
          placeholder={showOptions ? 'ara...' : 'Lütfen seçiniz'}
          disabled={disabled || readOnly}
          onChange={(e) => setSearch(e.target.value)}
          className="!cursor-pointer"
          onKeyDown={(e) => {
            if (
              e.key == 'Enter' &&
              showOptions &&
              filteredOptions.length == 1
            ) {
              handleOnClick(filteredOptions[0]);
              e.preventDefault();
            }
          }}
          onClick={() =>
            setShowOptions((prev) => !loading && !disabled && !prev)
          }
        />

        <div
          className="absolute top-1/2 -translate-y-1/2 right-4 text-gray cursor-pointer"
          onClick={() => setShowOptions((prev) => !prev)}
        >
          {loading ? (
            <LoadingIcon
              width={20}
              height={20}
              className="text-slate-300 animate-spin"
            />
          ) : (
            <ChevronIcon width={20} height={20} />
          )}
        </div>

        {showOptions && (
          <div className="w-full flex flex-col p-2 gap-0.5 border-x border border-slate-200 bg-white max-h-[250px] overflow-auto absolute top-full left-0 z-10">
            {filteredOptions.map((option: any, index: number) => (
              <div
                key={index}
                className={classNames(
                  'px-2 text-sm min-h-[35px] h-[35px] flex items-center cursor-pointer',
                  'hover:bg-sky-50/50 hover:text-sky-700',
                  {
                    'bg-sky-50 text-sky-700': option[keyField] == value,
                  }
                )}
                onClick={() => handleOnClick(option)}
              >
                {option[labelField]}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
