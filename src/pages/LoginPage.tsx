// import React from 'react';
import Button from '../components/UI/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
// import AuthService from '../services/api/AuthService';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '../services/api/AuthService';

import { useAppDispatch } from "../services/redux/hooks";
import { setUser } from "../services/redux/fiatures/userSlice";


const loginSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(4, "Пароль не должен быть меньше 4 символов")
});

type TLoginSchema = z.infer<typeof loginSchema>;


function LoginPage() {
  // const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const {register, handleSubmit, formState: {errors}, setError} = useForm<TLoginSchema>({resolver: zodResolver(loginSchema)});
  const loginMutation = useMutation(
    async ({email, password}: TLoginSchema) => await login(email, password),
    {
      onSuccess: (data) => {
        dispatch(setUser(data));
        queryClient.invalidateQueries('desks');
        navigate("/");
      },
      onError: (e: Error) => {
        console.log(e.message);
        if (e.message.split(':')[0] == "email") {
          setError("email", {
            type: "server",
            message: e.message.split(':')[1]
          });
        } else if (e.message.split(':')[0] == "password") {
          setError("password", {
            type: "server",
            message: e.message.split(':')[1]
          });
        }
      }
    }
  );

  const onSubmitHandle = (data: TLoginSchema) => {
    loginMutation.mutate(data);
    console.log(data);
  }

  
  return (
    <div className='login'>
      <div className="login__title">Вход</div>
      <form onSubmit={handleSubmit(onSubmitHandle)}>
        <input {...register("email")} className="login__email form-input" type="text" placeholder='Логин...'/>
          {errors.email && <p className='error-form-message'>{`${errors.email.message}`}</p>}
        <input {...register("password")} className="login__password form-input" type="password" placeholder='Пароль...'/>
          {errors.password && <p className='error-form-message'>{`${errors.password.message}`}</p>}
        <Button className="login__button" callback={() => {}} text="Войти" type='submit'/>
      </form>
      <div className="login__text">
        <p className='login__text-ask'>Еще нет аккаунта?</p>
        <NavLink to={`/login/signin`} className='login__text-registration'>Зарегистрироваться</NavLink>
      </div>
    </div>
  );
}

export default LoginPage;