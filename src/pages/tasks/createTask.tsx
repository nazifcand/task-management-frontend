import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IProject } from '../../interfaces/IProject';
import {
  fetchProjectBySlug,
  fetchProjectStatusesBySlug,
  fetchProjectTagsBySlug,
} from '../../services/projectService';
import { IOrganization } from '../../interfaces/IOrganization';
import {
  fetchOrganizationBySlug,
  fetchOrganizationUsersBySlug,
} from '../../services/organizationService';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import MultiSelect from '../../components/Multiselect';
import { useFormik } from 'formik';
import Button from '../../components/Button';
import { ITag } from '../../interfaces/ITag';
import { IUser } from '../../interfaces/IUser';
import { IStatus } from '../../interfaces/IStatus';
import Select from '../../components/Select';
import { createTask } from '../../services/taskService';
import PageHeader from '../../components/PageHeader';

const CreateTask = () => {
  const { projectSlug, organizationSlug } = useParams<{
    organizationSlug: string;
    projectSlug: string;
  }>();

  const navigate = useNavigate();

  const [organization, setOrganization] = useState<IOrganization | undefined>(
    undefined
  );
  const [project, setProject] = useState<IProject | undefined>(undefined);
  const [tags, setTags] = useState<ITag[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [statuses, setStatuses] = useState<IStatus[]>([]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      projectId: null,
      statusId: null,
      users: [],
      tags: [],
      startDate: 0,
      endDate: 0,
    },
    onSubmit: async (values) => {
      values.startDate = new Date(values.startDate).getTime();
      values.endDate = new Date(values.endDate).getTime();

      const [createErr] = await createTask(values);

      if (createErr) {
        // TODO: show alert modal or toast
        return alert('error');
      }

      navigate(
        `/organizations/${organizationSlug}/projects/${projectSlug}/tasks`
      );
    },
  });

  const { values, setFieldValue, getFieldProps, handleSubmit } = formik;

  useEffect(() => {
    if (!projectSlug || !organizationSlug) return;

    (async () => {
      Promise.all([
        fetchProjectBySlug(projectSlug),
        fetchProjectTagsBySlug(projectSlug),
        fetchOrganizationBySlug(organizationSlug),
        fetchOrganizationUsersBySlug(organizationSlug),
        fetchProjectStatusesBySlug(projectSlug),
      ])
        .then((res) => {
          const [projectErr, projectData] = res[0];
          const [tagErr, tagData] = res[1];
          const [organizationErr, organizationData] = res[2];
          const [usersErr, usersData] = res[3];
          const [statusesErr, statusesData] = res[4];

          setFieldValue('projectId', projectData.id);

          if (!organizationErr) {
            setOrganization(organizationData);
          }

          if (!projectErr) {
            setProject(projectData);
          }

          if (!tagErr) {
            setTags(tagData);
          }

          if (!usersErr) {
            setUsers(usersData);
          }

          if (!statusesErr) {
            setStatuses(statusesData);
            if (statusesData.length > 0)
              setFieldValue('statusId', statusesData[0].id);
          }
        })
        .catch(() => {
          // TODO: show alert modal or toast
          return alert('error');
        });
    })();
  }, [organizationSlug, projectSlug, setFieldValue]);

  return (
    <>
      <PageHeader
        title="Create Task"
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
            title: (
              <span>
                <strong className="font-medium">{project?.title}</strong> Tasks
              </span>
            ),
            to: `/organizations/${organizationSlug}/projects/${projectSlug}/tasks`,
          },
          { title: 'Create Task', to: '#' },
        ]}
      />

      <div className="container w-full flex flex-col gap-4">
        <form
          onSubmit={handleSubmit}
          className="max-w-[540px] w-full flex flex-col gap-4"
        >
          <Input label="Title" {...getFieldProps('title')} />
          <MultiSelect
            label="Users"
            selecteds={values.users}
            options={users}
            labelField="username"
            onChange={(selecteds) => setFieldValue('users', selecteds)}
          />
          <MultiSelect
            label="Tags"
            selecteds={values.tags}
            options={tags}
            onChange={(selecteds) => setFieldValue('tags', selecteds)}
          />
          <Textarea
            label="Description"
            spellCheck={false}
            {...getFieldProps('description')}
          />
          <Select
            label="Status"
            options={statuses}
            value={values.statusId}
            onChange={(option: IStatus) => setFieldValue('statusId', option.id)}
          />

          <div className="w-full flex items-center gap-4">
            <Input
              type="datetime-local"
              label="Start Date"
              {...getFieldProps('startDate')}
            />
            <Input
              type="datetime-local"
              label="End Date"
              {...getFieldProps('endDate')}
            />
          </div>

          <Button type="submit" className="mr-auto">
            Create
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateTask;
