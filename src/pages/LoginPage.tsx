import { useFormik } from 'formik';
import Input from '../components/Input';
import * as Yup from 'yup';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { fetchMe, login } from '../services/authService';
import { useState } from 'react';
import { useUserStore } from '../stores/userStore';

const LoginPage = () => {
  const userStore = useUserStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(8).required(),
    }),
    validateOnMount: true,
    onSubmit: async (values) => {
      setLoading(true);
      const [responseError, data] = await login(values);
      setLoading(false);

      if (responseError) {
        // TODO: show alert modal or toast
        return alert('error');
      }

      // set token
      localStorage.setItem('token', data.token);

      // fetch user data
      const [meError, me] = await fetchMe();

      if (meError) {
        // TODO: show alert modal or toast
        return alert('error');
      }

      userStore.setUser(me);
      navigate('/');
    },
  });
  const { handleSubmit, getFieldProps, touched, errors, isValid } = formik;

  return (
    <div className="w-[375px] bg-white p-8 box-border rounded-lg border border-slate-200 shadow-md flex flex-col gap-4">
      <h1 className="text-3xl font-semibold">Giriş Yap</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <Input
          label="E-posta"
          errorMessage={touched?.email && errors?.email}
          {...getFieldProps('email')}
        />
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
          Giriş Yap
        </Button>

        <Link
          to="/register"
          className="text-sm underline text-slate-400 hover:text-slate-700"
        >
          Hemen kayıt ol!
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
