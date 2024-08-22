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
import { fetchTaskById, updateTask } from '../../services/taskService';
import PageHeader from '../../components/PageHeader';

const EditTask = () => {
  const { projectSlug, organizationSlug, taskId } = useParams<{
    organizationSlug: string;
    projectSlug: string;
    taskId: string;
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
      id: 0,
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

      const [updateErr] = await updateTask(values.id, values);

      if (updateErr) {
        // TODO: show alert modal or toast
        return alert('error');
      }

      navigate(
        `/organizations/${organizationSlug}/projects/${projectSlug}/tasks`
      );
    },
  });

  const { values, setFieldValue, getFieldProps, handleSubmit, setValues } =
    formik;

  useEffect(() => {
    if (!taskId) return;
    (async () => {
      const [err, data] = await fetchTaskById(+taskId);

      if (err) {
        // TODO: show alert modal or toast
        return alert('error');
      }

      setValues({
        ...data,
        startDate: data.startDate.split('.000Z')[0],
        endDate: data.endDate.split('.000Z')[0],
        users: data.users.map((i: IUser) => i.id),
        tags: data.tags.map((i: ITag) => i.id),
      });
    })();
  }, [setValues, taskId]);

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
        title="Edit Task"
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
          { title: 'Edit Task', to: '#' },
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
            Save
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditTask;
