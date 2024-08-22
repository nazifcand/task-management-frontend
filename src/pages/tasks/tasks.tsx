import { useEffect, useState } from 'react';
import { IProject } from '../../interfaces/IProject';
import { fetchProjectBySlug } from '../../services/projectService';
import { ITask } from '../../interfaces/ITask';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTasks } from '../../services/taskService';
import TaskViewer from '../../components/TaskViewer';
import PageHeader from '../../components/PageHeader';
import { fetchOrganizationBySlug } from '../../services/organizationService';
import { IOrganization } from '../../interfaces/IOrganization';
import Button from '../../components/Button';

const Tasks = () => {
  const navigate = useNavigate();
  const { organizationSlug, projectSlug } = useParams<{
    organizationSlug: string;
    projectSlug: string;
  }>();

  const [organization, setOrganization] = useState<IOrganization | undefined>(
    undefined
  );
  const [project, setProject] = useState<IProject | undefined>(undefined);
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    if (!projectSlug) return;

    (async () => {
      const [reqError, projectData] = await fetchProjectBySlug(projectSlug);

      if (reqError) {
        // TODO: show alert modal or toast
        return alert('errro');
      }

      setProject(projectData);

      const [projectReqError, tasksData] = await fetchTasks({
        projectId: projectData?.id,
      });

      if (projectReqError) {
        // TODO: show alert modal or toast
        return alert('errro');
      }

      setTasks(tasksData);
    })();
  }, [projectSlug]);

  useEffect(() => {
    if (!organizationSlug) return;
    (async () => {
      const [err, data] = await fetchOrganizationBySlug(organizationSlug);

      if (err) {
        // TODO: show alert modal or toast
        return alert('error');
      }

      setOrganization(data);
    })();
  }, [organizationSlug]);

  return (
    <>
      <PageHeader
        title={`${project?.title} Tasks`}
        breadcrumbs={[
          {
            title: 'Organizations',
            to: '/organizations',
          },
          {
            title: (
              <span>
                <strong className="font-medium">{organization?.title}</strong>{' '}
                Projects
              </span>
            ),
            to: `/organizations/${organizationSlug}/projects`,
          },
          {
            title: `${project?.title} Tasks`,
            to: `#`,
          },
        ]}
      >
        <Button
          onClick={() =>
            navigate(
              `/organizations/${organizationSlug}/projects/${projectSlug}/tasks/create`
            )
          }
        >
          Create
        </Button>
      </PageHeader>

      <div className="container">
        <TaskViewer tasks={tasks} />
      </div>
    </>
  );
};

export default Tasks;
