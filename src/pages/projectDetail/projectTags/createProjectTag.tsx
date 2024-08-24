import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IProject } from '../../../interfaces/IProject';
import { fetchProjectBySlug } from '../../../services/projectService';
import Input from '../../../components/Input';
import { useFormik } from 'formik';
import Button from '../../../components/Button';
import { createTag } from '../../../services/tagService';

const CreateProjectTag = () => {
  const { projectSlug, organizationSlug } = useParams<{
    organizationSlug: string;
    projectSlug: string;
  }>();

  const navigate = useNavigate();

  const [project, setProject] = useState<IProject | undefined>(undefined);

  const formik = useFormik({
    initialValues: {
      title: 'Tag 4',
      color: 'blue',
      projectId: null,
      textColor: 'red',
    },
    onSubmit: async (values) => {
      const [createErr] = await createTag(values);

      if (createErr) {
        // TODO: show alert modal or toast
        return alert('error');
      }

      navigate(
        `/organizations/${organizationSlug}/projects/${projectSlug}/tags`
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
        <Input
          label="Color"
          type="color"
          className="max-w-[75px]"
          {...getFieldProps('color')}
        />
        <Input
          label="Text Color"
          type="color"
          className="max-w-[75px]"
          {...getFieldProps('textColor')}
        />

        <Button type="submit" className="mr-auto">
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateProjectTag;
