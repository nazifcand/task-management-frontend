import { useEffect, useState } from 'react';
import { IOrganization } from '../../interfaces/IOrganization';
import { fetchOrganizations } from '../../services/organizationService';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const Organizations = () => {
  const navigate = useNavigate();

  const [organizations, setOrganizations] = useState<IOrganization[]>([]);

  useEffect(() => {
    (async () => {
      const [reqError, data] = await fetchOrganizations();

      if (reqError) {
        // TODO: show alert modal or toast
        return alert('errro');
      }

      setOrganizations(data);
    })();
  }, []);

  return (
    <>
      <div className="container">
        <Button
          className="ml-auto"
          onClick={() => navigate(`/organizations/create`)}
        >
          Create
        </Button>
      </div>

      <div className="container grid grid-cols-5 gap-4">
        {organizations.map((org: IOrganization, index) => (
          <Link
            className="flex flex-col gap-2 p-4 bg-white border border-slate-200"
            to={`/organizations/${org.slug}`}
            key={index}
          >
            <div className="w-full aspect-video">
              <img src={org.thumbnail} alt={org.title} />
            </div>

            <h3 className="font-bold text-xl">{org.title}</h3>
            <p className="text-sm text-slate-500 italic">{org.description}</p>

            <Button
              color="orange"
              size="xSmall"
              className="mr-auto"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                navigate(`/organizations/${org.slug}/edit`);
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

export default Organizations;
