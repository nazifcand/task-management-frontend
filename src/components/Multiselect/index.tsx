import classNames from 'classnames';
import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import CloseIcon from '../../icons/CloseIcon';

interface IMultiSelect {
  label?: string;
  error?: string;
  selecteds: any[];
  options: any[];
  onChange: (item: any) => void;
  labelField?: string;
  keyField?: string;
}

const MultiSelect: FC<IMultiSelect> = ({
  label,
  error,
  options = [],
  selecteds,
  labelField = 'title',
  keyField = 'id',
  onChange,
}) => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const divRef = useRef<any>(null);
  const inputRef = useRef<any>(null);

  const selectedItems = options
    .filter((item) => selecteds.includes(item[keyField]))
    .sort((a, b) => a[labelField].localeCompare(b[labelField]));

  const filteredOptions = options
    .filter((item) => {
      const regex = new RegExp(String(search).toLocaleLowerCase(), 'gi');
      if (String(item[labelField]).toLocaleLowerCase().match(regex)) {
        return item;
      }
    })
    .filter((i) => !selecteds.includes(i.id))
    .sort((a, b) => a[labelField].localeCompare(b[labelField]));

  const handleRemove = (item: any) => {
    onChange(selecteds.filter((i) => i != item.id));
  };

  const handleAdd = (item: any) => {
    onChange([...selecteds, item.id]);
    inputRef.current.focus();
  };

  useEffect(() => {
    const clickEvent = (event: any) => {
      if (!divRef?.current.contains(event.target)) {
        setSearch('');
        setShow(false);
      }
    };

    window.addEventListener('click', clickEvent);
    return () => {
      window.removeEventListener('click', clickEvent);
    };
  }, []);

  return (
    <div ref={divRef} className="w-full flex flex-col gap-1 relative">
      {label && (
        <span className="text-slate-600 text-xs font-medium">{label}</span>
      )}

      <div
        className={cn([
          'w-full',
          'bg-white',
          'border border-slate-200',
          'text-sm p-2 box-border',
          'flex flex-wrap gap-2',
          'group',
        ])}
      >
        {selectedItems.map((item, index) => (
          <div
            key={index}
            className="bg-slate-200 py-2 px-3 flex items-center gap-1 hover:bg-sky-400 hover:text-white"
          >
            <span className="text-xs">{item[labelField]}</span>
            <CloseIcon
              className="cursor-pointer"
              onClick={() => handleRemove(item)}
            />
          </div>
        ))}

        <input
          ref={inputRef}
          type="text"
          className="px-2 text-sm text-slate-700 flex-1 outline-none min-w-[100px]"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setShow(true)}
        />
      </div>

      {(search.length > 0 || show) && (
        <>
          <div className="w-full flex flex-col p-2 gap-0.5 border-x border border-slate-200 bg-white max-h-[250px] overflow-auto absolute top-full left-0 z-10">
            {filteredOptions.map((option, index) => (
              <div
                key={index}
                className={classNames(
                  'p-2 text-sm flex items-center gap-2 cursor-pointer',
                  'hover:bg-sky-50/50 hover:text-sky-700',
                  {
                    'bg-sky-50 text-sky-700': selecteds.includes(option.id),
                  }
                )}
                onClick={() =>
                  selecteds.includes(option.id)
                    ? handleRemove(option)
                    : handleAdd(option)
                }
              >
                {option.avatar && (
                  <img src={option.avatar} className="w-6 rounded-full" />
                )}
                <span className="text-sm">{option[labelField]}</span>
              </div>
            ))}

            {filteredOptions.length == 0 && (
              <span className="text-sm text-slate-400 italic">
                Not fount item
              </span>
            )}
          </div>
        </>
      )}

      {error && <p className="text-xs mt-1 text-red-400">{error}</p>}
    </div>
  );
};

export default MultiSelect;
