import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import Button from '../../components/Button';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Textarea from '../../components/Textarea';
import {
  fetchOrganizationBySlug,
  updateOrganization,
} from '../../services/organizationService';
import { useEffect } from 'react';

const EditOrganization = () => {
  const { organizationSlug } = useParams<{ organizationSlug: string }>();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      id: 0,
      title: '',
      description: '',
    },
    onSubmit: async (values) => {
      const [updateErr] = await updateOrganization(values.id, values);

      if (updateErr) {
        // TODO: show alert modal or toast
        return alert('error');
      }

      navigate(`/organizations`);
    },
  });

  const { getFieldProps, handleSubmit, setValues } = formik;

  useEffect(() => {
    if (!organizationSlug) return;

    (async () => {
      const [err, data] = await fetchOrganizationBySlug(organizationSlug);

      if (err) {
        // TODO: show alert modal or toast
        return alert('error');
      }

      const { id, title, description } = data;
      setValues({ id, title, description });
    })();
  }, [organizationSlug, setValues]);

  return (
    <>
      <PageHeader title="Edit Organization" />

      <div className="container">
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
      </div>
    </>
  );
};

export default EditOrganization;
