import classNames from 'classnames';
import { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ChevronIcon from '../../icons/ChevronIcon';

interface IBreadcrumb {
  breadcrumbs: any[];
}

const Breadcrumb: FC<IBreadcrumb> = ({ breadcrumbs = [] }) => {
  return (
    <div className="flex items-center gap-2">
      <Link to="/" className={classNames('text-slate-500 text-sm')}>
        Home
      </Link>

      {breadcrumbs.map((item, index) => (
        <Fragment key={index}>
          <ChevronIcon width={13} className="-rotate-90 text-slate-400" />
          <Link
            to={item.to}
            className={classNames('text-slate-500 text-sm hover:text-black', {
              'font-medium text-black': index == breadcrumbs.length - 1,
            })}
          >
            {item.title}
          </Link>
        </Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
