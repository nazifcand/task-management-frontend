import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IProject } from '../../../interfaces/IProject';
import { fetchProjectBySlug } from '../../../services/projectService';
import Input from '../../../components/Input';
import { useFormik } from 'formik';
import Button from '../../../components/Button';
import {
  createStatus,
  fetchStatusById,
  updateStatus,
} from '../../../services/statusService';

const EditProjectStatus = () => {
  const { projectSlug, organizationSlug, statusId } = useParams<{
    organizationSlug: string;
    projectSlug: string;
    statusId: string;
  }>();

  const navigate = useNavigate();

  const [project, setProject] = useState<IProject | undefined>(undefined);

  const formik = useFormik({
    initialValues: {
      id: 0,
      title: '',
      color: '#00ffff',
      priority: 999,
      default: false,
      projectId: null,
    },
    onSubmit: async (values) => {
      values.priority = +values.priority;

      const [createErr] = await updateStatus(values.id, values);

      if (createErr) {
        // TODO: show alert modal or toast
        return alert('error');
      }

      navigate(
        `/organizations/${organizationSlug}/projects/${projectSlug}/statuses`
      );
    },
  });

  const { setFieldValue, getFieldProps, handleSubmit, setValues } = formik;

  useEffect(() => {
    if (!projectSlug) return;

    (async () => {
      const [err, data] = await fetchProjectBySlug(projectSlug);

      if (err) {
        // TODO: show alert modal or toast
        return alert('error');
      }

      setProject(data);
      setFieldValue('projectId', data.id);
    })();
  }, [projectSlug, setFieldValue]);

  useEffect(() => {
    if (!statusId) return;
    (async () => {
      const [err, data] = await fetchStatusById(+statusId);

      if (err) {
        // TODO: show alert modal or toast
        return alert('error');
      }

      setValues(data);
    })();
  }, [setValues, statusId]);

  return (
    <div className="w-full flex flex-col gap-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-[540px] w-full flex flex-col gap-4"
      >
        <Input label="Title" {...getFieldProps('title')} />
        <Input label="Priority" {...getFieldProps('priority')} />
        <Input
          label="Color"
          type="color"
          className="max-w-[75px]"
          {...getFieldProps('color')}
        />

        <Button type="submit" className="mr-auto">
          Save
        </Button>
      </form>
    </div>
  );
};

export default EditProjectStatus;
