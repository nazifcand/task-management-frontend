import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import { useEffect } from 'react';
import {
  updateProject,
  fetchProjectBySlug,
} from '../../services/projectService';

const EditOrganizationProject = () => {
  const { organizationSlug, projectSlug } = useParams<{
    organizationSlug: string;
    projectSlug: string;
  }>();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      id: 0,
      title: '',
      description: '',
      organizationId: null,
    },
    onSubmit: async (values) => {
      const [err] = await updateProject(values.id, values);

      if (err) {
        // TODO: show alert modal or toast
        return alert('error');
      }

      navigate(`/organizations/${organizationSlug}/projects`);
    },
  });

  const { getFieldProps, handleSubmit, setFieldValue, setValues } = formik;

  useEffect(() => {
    if (!projectSlug) return;

    (async () => {
      const [err, data] = await fetchProjectBySlug(projectSlug);

      if (err) {
        // TODO: show alert modal or toast
        return alert('error');
      }

      const { id, title, description, organizationId } = data;
      setValues({ id, title, description, organizationId });
    })();
  }, [projectSlug, setFieldValue, setValues]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-[540px] w-full flex flex-col gap-4"
      >
        <Input label="Title" {...getFieldProps('title')} />
        <Textarea label="Description" {...getFieldProps('description')} />

        <Button type="submit" className="mr-auto">
          Save
        </Button>
      </form>
    </>
  );
};

export default EditOrganizationProject;
