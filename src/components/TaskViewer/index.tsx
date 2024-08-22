import { FC } from 'react';
import TableView from './TableView';
import { ITask } from '../../interfaces/ITask';

interface ITaskViewer {
  view?: 'table' | 'kanban' | 'calendar';
  tasks: ITask[] | [];
}

const TaskViewer: FC<ITaskViewer> = ({ view = 'table', tasks }) => {
  return (
    <div className="w-full flex flex-col gap-8">
      {view == 'table' && <TableView tasks={tasks} />}
    </div>
  );
};

export default TaskViewer;
