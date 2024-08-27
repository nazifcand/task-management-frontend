import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Button from '../../components/Button';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Textarea from '../../components/Textarea';
import { createOrganization } from '../../services/organizationService';

const CreateOrganization = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    onSubmit: async (values) => {
      const [createErr] = await createOrganization(values);

      if (createErr) {
        // TODO: show alert modal or toast
        return alert('error');
      }

      navigate(`/organizations`);
    },
  });

  const { getFieldProps, handleSubmit } = formik;

  return (
    <>
      <PageHeader title="Create Organization" />

      <div className="container">
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
      </div>
    </>
  );
};

export default CreateOrganization;
