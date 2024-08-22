import { useEffect, useState } from 'react';
import { IOrganization } from '../../interfaces/IOrganization';
import { fetchOrganizations } from '../../services/organizationService';
import { Link } from 'react-router-dom';

const Organizations = () => {
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
      <div className="container grid grid-cols-5 gap-4">
        {organizations.map((org: IOrganization, index) => (
          <Link
            className="flex flex-col gap-2 p-4 bg-white border border-slate-200"
            to={`/organizations/${org.slug}/projects`}
            key={index}
          >
            <div className="w-full aspect-video">
              <img src={org.thumbnail} alt={org.title} />
            </div>

            <h3 className="font-bold text-xl">{org.title}</h3>
            <p className="text-sm text-slate-500 italic">{org.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Organizations;
