import { FC } from 'react';
import { ITag } from '../../interfaces/ITag';

interface ITagList {
  tags: ITag[];
}

const TagList: FC<ITagList> = ({ tags }) => {
  return (
    <div className="w-full flex gap-1.5 flex-wrap">
      {tags.map((tag: ITag, index: number) => (
        <span
          key={index}
          className="px-2 py-0.5 text-[10px]"
          style={{ color: tag.textColor, backgroundColor: tag.color }}
        >
          {tag.title}
        </span>
      ))}
    </div>
  );
};

export default TagList;
