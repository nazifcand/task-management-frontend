import { FC, ReactNode } from 'react';
import Breadcrumb from '../Breadcrumb';

interface IPageHeader {
  title?: string;
  summary?: string;
  breadcrumbs?: any[];
  children?: ReactNode;
}

const PageHeader: FC<IPageHeader> = ({
  title,
  summary,
  breadcrumbs,
  children,
}) => {
  return (
    <div className="container mb-4 flex items-center">
      <div className="flex flex-col">
        {breadcrumbs && <Breadcrumb breadcrumbs={breadcrumbs} />}

        <h1 className="text-5xl font-bold mt-6 mb-2">{title}</h1>
        {summary && <p className="text-slate-500 italic text-sm">{summary}</p>}
      </div>

      {children && <div className="ml-auto">{children}</div>}
    </div>
  );
};

export default PageHeader;
