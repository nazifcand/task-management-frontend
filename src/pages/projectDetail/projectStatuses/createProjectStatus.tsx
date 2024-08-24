import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IProject } from '../../../interfaces/IProject';
import { fetchProjectBySlug } from '../../../services/projectService';
import Input from '../../../components/Input';
import { useFormik } from 'formik';
import Button from '../../../components/Button';
import { createStatus } from '../../../services/statusService';

const CreateProjectStatus = () => {
  const { projectSlug, organizationSlug } = useParams<{
    organizationSlug: string;
    projectSlug: string;
  }>();

  const navigate = useNavigate();

  const [project, setProject] = useState<IProject | undefined>(undefined);

  const formik = useFormik({
    initialValues: {
      title: '',
      color: '#00ffff',
      priority: 999,
      default: false,
      projectId: null,
    },
    onSubmit: async (values) => {
      values.priority = +values.priority;

      const [createErr] = await createStatus(values);

      if (createErr) {
        // TODO: show alert modal or toast
        return alert('error');
      }

      navigate(
        `/organizations/${organizationSlug}/projects/${projectSlug}/statuses`
      );
    },
  });

  const { setFieldValue, getFieldProps, handleSubmit } = formik;

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
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateProjectStatus;
