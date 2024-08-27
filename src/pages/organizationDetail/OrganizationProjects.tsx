import { useEffect, useState } from 'react';
import { fetchOrganizationBySlug } from '../../services/organizationService';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IProject } from '../../interfaces/IProject';
import { IOrganization } from '../../interfaces/IOrganization';
import { fetchProjects } from '../../services/projectService';
import Button from '../../components/Button';

const OrganizationProjects = () => {
  const navigate = useNavigate();

  const { organizationSlug } = useParams<{ organizationSlug: string }>();

  const [organization, setOrganization] = useState<IOrganization | undefined>(
    undefined
  );
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    if (!organizationSlug) return;

    (async () => {
      const [reqError, organizationData] = await fetchOrganizationBySlug(
        organizationSlug
      );

      if (reqError) {
        // TODO: show alert modal or toast
        return alert('errro');
      }

      setOrganization(organizationData);

      const [projectReqError, projectsData] = await fetchProjects({
        organizationId: organizationData.id,
      });

      if (projectReqError) {
        // TODO: show alert modal or toast
        return alert('errro');
      }

      setProjects(projectsData);
    })();
  }, [organizationSlug]);

  return (
    <>
      <Button
        className="ml-auto"
        onClick={() =>
          navigate(`/organizations/${organizationSlug}/projects/create`)
        }
      >
        Create
      </Button>

      <div className="w-full grid grid-cols-4 gap-4">
        {projects.map((project: IProject, index) => (
          <Link
            className="flex flex-col gap-2 p-4 bg-white border border-slate-200"
            to={`/organizations/${organizationSlug}/projects/${project.slug}`}
            key={index}
          >
            <div className="w-full aspect-video">
              <img src={project.thumbnail} alt={project.title} />
            </div>

            <h3 className="font-bold text-xl">{project.title}</h3>
            <p className="text-sm text-slate-500 italic">
              {project.description}
            </p>

            <Button
              color="orange"
              size="xSmall"
              className="mr-auto"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                navigate(
                  `/organizations/${organizationSlug}/projects/${project.slug}/edit`
                );
              }}
            >
              Edit
            </Button>
          </Link>
        ))}
      </div>
    </>
  );
};

export default OrganizationProjects;
