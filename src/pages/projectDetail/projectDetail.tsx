import { Link, useLocation, useOutlet, useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { fetchProjectBySlug } from '../../services/projectService';
import { IProject } from '../../interfaces/IProject';

const ProjectDetail = () => {
  const outlet = useOutlet();
  const localtion = useLocation();
  const { organizationSlug, projectSlug } = useParams<{
    organizationSlug: string;
    projectSlug: string;
  }>();

  const [project, setProject] = useState<IProject | undefined>();

  const SUB_PAGES = [
    {
      title: 'About',
      to: `/organizations/${organizationSlug}/projects/${projectSlug}`,
    },
    {
      title: 'Tasks',
      to: `/organizations/${organizationSlug}/projects/${projectSlug}/tasks`,
    },
    {
      title: 'Tags',
      to: `/organizations/${organizationSlug}/projects/${projectSlug}/tags`,
    },
    {
      title: 'Statuses',
      to: `/organizations/${organizationSlug}/projects/${projectSlug}/statuses`,
    },
  ];

  useEffect(() => {
    if (!projectSlug) return;

    (async () => {
      const [err, data] = await fetchProjectBySlug(projectSlug);

      if (err) {
        // TODO: show alert modal or toast
        return alert('error');
      }

      setProject(data);
    })();
  }, [projectSlug]);

  return (
    <>
      <PageHeader title={project?.title} />

      <div className="container flex gap-10">
        <div className="w-[300px] min-w-[300px] bg-white border border-slate-200 box-border p-4 flex flex-col gap-2 h-min">
          {SUB_PAGES.map((page, index) => (
            <Link
              key={index}
              to={page.to}
              className={classNames(
                'w-full h-[45px]',
                'text-sm font-semibold',
                'flex items-center',
                'px-4 box-border',
                {
                  'bg-slate-100 hover:bg-slate-200':
                    page.to != localtion.pathname,
                  '!bg-sky-400 text-white hover:!bg-sky-500':
                    page.to == localtion.pathname,
                }
              )}
            >
              {page.title}
            </Link>
          ))}
        </div>

        <div className="flex-1">
          {!outlet ? <p>{project?.description}</p> : outlet}
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
