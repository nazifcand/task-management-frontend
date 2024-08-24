import { useEffect, useState } from 'react';
import { fetchProjectTagsBySlug } from '../../../services/projectService';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/Button';
import { ITag } from '../../../interfaces/ITag';
import Table from '../../../components/Table';

const ProjectTags = () => {
  const navigate = useNavigate();
  const { organizationSlug, projectSlug } = useParams<{
    organizationSlug: string;
    projectSlug: string;
  }>();

  const [tags, setTags] = useState<ITag[]>([]);

  useEffect(() => {
    if (!projectSlug) return;

    (async () => {
      const [err, data] = await fetchProjectTagsBySlug(projectSlug);

      if (err) {
        // TODO: show alert modal or toast
        return alert('errro');
      }

      setTags(data);
    })();
  }, [projectSlug]);

  return (
    <div className="w-full flex flex-col gap-4">
      <Button
        className="ml-auto"
        onClick={() =>
          navigate(
            `/organizations/${organizationSlug}/projects/${projectSlug}/tags/create`
          )
        }
      >
        Create
      </Button>

      <Table
        columns={[
          {
            title: 'Title',
            value: (row: ITag) => row.title,
          },
          {
            title: 'Color',
            value: (row: ITag) => (
              <input type="color" value={row.color} disabled />
            ),
          },
          {
            title: 'Text Color',
            value: (row: ITag) => (
              <input type="color" value={row.textColor} disabled />
            ),
          },
          {
            title: '',
            value: (row: ITag) => (
              <div className="flex justify-end">
                <Button
                  color="orange"
                  size="xSmall"
                  onClick={() =>
                    navigate(
                      `/organizations/${organizationSlug}/projects/${projectSlug}/tags/${row.id}/edit`
                    )
                  }
                >
                  Edit
                </Button>
              </div>
            ),
          },
        ]}
        data={tags}
      />
    </div>
  );
};

export default ProjectTags;
