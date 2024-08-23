import { FC } from 'react';
import { ITask } from '../../interfaces/ITask';
import Table from '../Table';
import TagList from '../TagLists';
import AvatarStack from '../AvatarStack';
import Button from '../Button';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';

interface ITableView {
  tasks: ITask[] | [];
}

const TableView: FC<ITableView> = ({ tasks }) => {
  const navigate = useNavigate();
  const { organizationSlug, projectSlug } = useParams<{
    organizationSlug: string;
    projectSlug: string;
  }>();

  return (
    <Table
      columns={[
        {
          title: '#ID',
          value: (row: ITask) => `#${row.id}`,
        },
        {
          title: 'Title',
          value: (row: ITask) => (
            <p className="max-w-[250px] truncate">{row.title}</p>
          ),
        },
        {
          title: 'Description',
          value: (row: ITask) => (
            <p className="max-w-[250px] truncate">{row.description}</p>
          ),
        },
        {
          title: 'Status',
          value: (row: ITask) => (
            <div className="flex items-center gap-2">
              <div
                className="w-[10px] min-w-[10px] aspect-square rounded-full"
                style={{ backgroundColor: row.status.color }}
              ></div>
              <span>{row.status.title}</span>
            </div>
          ),
        },
        {
          title: 'Start Date',
          value: (row: ITask) => formatDate(row.startDate),
        },
        {
          title: 'End Date',
          value: (row: ITask) => formatDate(row.endDate),
        },
        {
          title: 'Users',
          value: (row: ITask) => (
            <AvatarStack
              stacks={row.users}
              imageField="avatar"
              titleField="username"
            />
          ),
        },
        {
          title: 'Tags',
          value: (row: ITask) => <TagList tags={row.tags} />,
        },
        {
          title: '',
          value: (row: ITask) => (
            <div className="flex justify-end">
              <Button
                color="orange"
                size="xSmall"
                onClick={() =>
                  navigate(
                    `/organizations/${organizationSlug}/projects/${projectSlug}/tasks/${row.id}/edit`
                  )
                }
              >
                Edit
              </Button>
            </div>
          ),
        },
      ]}
      data={tasks}
    />
  );
};

export default TableView;
