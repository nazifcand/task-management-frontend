import { Link, useLocation, useOutlet, useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { useEffect, useState } from 'react';
import { IOrganization } from '../../interfaces/IOrganization';
import { fetchOrganizationBySlug } from '../../services/organizationService';
import classNames from 'classnames';

const OrganizationDetail = () => {
  const outlet = useOutlet();
  const localtion = useLocation();
  const { organizationSlug } = useParams<{
    organizationSlug: string;
  }>();

  const [organization, setOrganization] = useState<IOrganization | undefined>();

  const SUB_PAGES = [
    {
      title: 'About',
      to: `/organizations/${organizationSlug}`,
    },
    {
      title: 'Projects',
      to: `/organizations/${organizationSlug}/projects`,
    },
    {
      title: 'Users',
      to: `/organizations/${organizationSlug}/users`,
    },
  ];

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
        title={organization?.title}
        breadcrumbs={[
          {
            title: 'Organizations',
            to: '/organizations',
          },
          {
            title: organization?.title,
            to: `#`,
          },
        ]}
      />

      <div className="container flex gap-10">
        <div className="w-[300px] min-w-[300px] bg-white border border-slate-200 box-border p-4 flex flex-col gap-2 h-min">
          {SUB_PAGES.map((page, index) => (
            <Link
              key={index}
              to={page.to}
              className={classNames(
                'w-full h-[45px]',
                'font-semibold',
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
          {!outlet ? <p>{organization?.description}</p> : outlet}
        </div>
      </div>
    </>
  );
};

export default OrganizationDetail;
