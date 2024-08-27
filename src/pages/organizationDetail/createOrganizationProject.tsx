import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import { fetchOrganizationBySlug } from '../../services/organizationService';
import { useEffect, useState } from 'react';
import { IOrganization } from '../../interfaces/IOrganization';
import { createProject } from '../../services/projectService';

const CreateOrganizationProject = () => {
  const { organizationSlug } = useParams<{ organizationSlug: string }>();
  const navigate = useNavigate();

  const [organization, setOrganization] = useState<IOrganization | undefined>();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      organizationId: null,
    },
    onSubmit: async (values) => {
      const [createErr] = await createProject(values);

      if (createErr) {
        // TODO: show alert modal or toast
        return alert('error');
      }

      navigate(`/organizations/${organizationSlug}/projects`);
    },
  });

  const { getFieldProps, handleSubmit, setFieldValue } = formik;

  useEffect(() => {
    if (!organizationSlug) return;

    (async () => {
      const [err, data] = await fetchOrganizationBySlug(organizationSlug);

      if (err) {
        // TODO: show alert modal or toast
        return alert('error');
      }

      setFieldValue('organizationId', data.id);
      setOrganization(data);
    })();
  }, [organizationSlug, setFieldValue]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-[540px] w-full flex flex-col gap-4"
      >
        <Input label="Title" {...getFieldProps('title')} />
        <Textarea label="Description" {...getFieldProps('description')} />

        <Button type="submit" className="mr-auto">
          Create
        </Button>
      </form>
    </>
  );
};

export default CreateOrganizationProject;
