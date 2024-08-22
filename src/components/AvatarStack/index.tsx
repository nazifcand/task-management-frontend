import classNames from 'classnames';
import { FC } from 'react';
import stc from 'string-to-color';

interface IAvatarStack {
  stacks: any[];
  imageField?: string;
  titleField?: string;
  maxVisible?: number;
}

const AvatarStack: FC<IAvatarStack> = ({
  stacks = [],
  imageField = 'thumbnail',
  titleField = 'title',
  maxVisible = 5,
}) => {
  const shortTitle = (text: string) => {
    return text
      .split(' ')
      .map((i) => i.charAt(0).toLocaleUpperCase())
      .join('');
  };

  const filteredStacks = stacks.slice(0, maxVisible);

  return (
    <div className="flex items-center">
      {filteredStacks.map((stack: any, index: number) => (
        <div
          key={index}
          className={classNames(
            'w-[30px] min-w-[30px]',
            'border-2 border-white box-border',
            'rounded-full aspect-square',
            '-ml-4 first-of-type:ml-0',
            'relative group'
          )}
          style={{
            backgroundColor: stc(stack[titleField]),
          }}
        >
          <div className="px-2 py-1 text-white bg-black/80 absolute top-full left-1/2 -translate-x-1/2 text-xs mt-1.5 hidden group-hover:block w-max max-w-[250px] z-10">
            {stack[titleField]}
          </div>

          {stack[imageField] ? (
            <img
              src={stack[imageField]}
              alt={stack[titleField]}
              className="w-full h-full rounded-full relative cursor-pointer hover:z-10"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] font-medium text-white">
              {shortTitle(stack[titleField])}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AvatarStack;
