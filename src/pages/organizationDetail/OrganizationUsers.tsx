import { useEffect, useState } from 'react';
import { fetchOrganizationUsersBySlug } from '../../services/organizationService';
import { useParams } from 'react-router-dom';
import { IUser } from '../../interfaces/IUser';
import classNames from 'classnames';

const OrganizationUsers = () => {
  const { organizationSlug } = useParams<{ organizationSlug: string }>();

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (!organizationSlug) return;

    (async () => {
      const [reqError, usersData] = await fetchOrganizationUsersBySlug(
        organizationSlug
      );

      if (reqError) {
        // TODO: show alert modal or toast
        return alert('errro');
      }

      setUsers(usersData);
    })();
  }, [organizationSlug]);

  return (
    <>
      <div className="container grid grid-cols-4 gap-4">
        {users.map((user: IUser, index: number) => (
          <div
            key={index}
            className={classNames(
              'bg-white border border-slate-200 box-border p-4',
              'relative',
              'flex flex-col items-center gap-1'
            )}
          >
            <img
              src={user.avatar}
              alt={user.avatar}
              className="w-[100px] h-[100px]"
            />

            <strong className="mt-3 mb-2">{user.username}</strong>

            <span className="text-slate-600 text-sm">{`${user.name} ${user.surname}`}</span>
            <span className="text-slate-600 text-sm">{user.email}</span>
            <span className="text-slate-600 text-sm">{user.phone}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrganizationUsers;
