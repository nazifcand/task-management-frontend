import { useFormik } from 'formik';
import Input from '../components/Input';
import * as Yup from 'yup';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { register } from '../services/authService';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      phone: '',
      name: '',
      surname: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().min(4).required(),
      email: Yup.string().email().required(),
      phone: Yup.number().required(),
      name: Yup.string().min(3).required(),
      surname: Yup.string().min(2).required(),
      password: Yup.string().min(8).required(),
    }),
    validateOnMount: true,
    onSubmit: async (values) => {
      setLoading(true);
      const [responseError] = await register(values);
      setLoading(false);

      if (responseError) {
        // TODO: show alert modal or toast
        return alert('error');
      }

      navigate('/login');
    },
  });
  const { handleSubmit, getFieldProps, touched, errors, isValid } = formik;

  return (
    <div className="w-[450px] bg-white p-8 box-border border border-slate-200 shadow-md flex flex-col gap-4">
      <h1 className="text-3xl font-semibold">Kayıt Ol</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <Input
          label="Kullanıcı Adı"
          errorMessage={touched?.username && errors?.username}
          {...getFieldProps('username')}
        />
        <div className="flex gap-4">
          <Input
            label="Ad"
            errorMessage={touched?.name && errors?.name}
            {...getFieldProps('name')}
          />
          <Input
            label="Soyad"
            errorMessage={touched?.surname && errors?.surname}
            {...getFieldProps('surname')}
          />
        </div>

        <div className="flex gap-4">
          <Input
            label="Telefon"
            errorMessage={touched?.phone && errors?.phone}
            {...getFieldProps('phone')}
          />
          <Input
            label="E-posta"
            errorMessage={touched?.email && errors?.email}
            {...getFieldProps('email')}
          />
        </div>
        <Input
          type="password"
          label="Şifre"
          errorMessage={touched?.password && errors?.password}
          {...getFieldProps('password')}
        />

        <Button
          type="submit"
          className="ml-auto"
          disabled={!isValid}
          loading={loading}
        >
          Kayıt Ol
        </Button>

        <Link
          to="/login"
          className="text-sm underline text-slate-400 hover:text-slate-700"
        >
          Giriş Yap
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;
