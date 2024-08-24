import { useEffect, useState } from 'react';
import { fetchProjectStatusesBySlug } from '../../../services/projectService';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/Button';
import { IStatus } from '../../../interfaces/IStatus';
import Table from '../../../components/Table';

const ProjectStatuses = () => {
  const navigate = useNavigate();
  const { organizationSlug, projectSlug } = useParams<{
    organizationSlug: string;
    projectSlug: string;
  }>();

  const [statuses, setStatuses] = useState<IStatus[]>([]);

  useEffect(() => {
    if (!projectSlug) return;

    (async () => {
      const [err, data] = await fetchProjectStatusesBySlug(projectSlug);

      if (err) {
        // TODO: show alert modal or toast
        return alert('errro');
      }

      setStatuses(data);
    })();
  }, [projectSlug]);

  return (
    <div className="w-full flex flex-col gap-4">
      <Button
        className="ml-auto"
        onClick={() =>
          navigate(
            `/organizations/${organizationSlug}/projects/${projectSlug}/statuses/create`
          )
        }
      >
        Create
      </Button>

      <Table
        columns={[
          {
            title: 'Title',
            value: (row: IStatus) => row.title,
          },
          {
            title: 'Color',
            value: (row: IStatus) => (
              <input type="color" value={row.color} disabled />
            ),
          },
          {
            title: 'Priority',
            value: (row: IStatus) => `#${row.priority}`,
          },
          {
            title: '',
            value: (row: IStatus) => (
              <div className="flex justify-end">
                <Button
                  color="orange"
                  size="xSmall"
                  onClick={() =>
                    navigate(
                      `/organizations/${organizationSlug}/projects/${projectSlug}/statuses/${row.id}/edit`
                    )
                  }
                >
                  Edit
                </Button>
              </div>
            ),
          },
        ]}
        data={statuses}
      />
    </div>
  );
};

export default ProjectStatuses;
