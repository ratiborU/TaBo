import Button from '../components/UI/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registration, login } from '../services/api/AuthService';
import { useAppDispatch } from '../services/redux/hooks';
import { setUser } from '../services/redux/fiatures/userSlice';


//перенести в другой файл
const signUpSchema = z.object({
  name: z.string().min(2, "Имя не должно быть меньше 2 символов"),
  email: z.string().email("Некорректный email"),
  password: z.string().min(4, "Пароль не должен быть меньше 4 символов"),
  confirmPassword: z.string()
})
.refine(data => data.password === data.confirmPassword, {
  message: "Пароли должны совпадать",
  path: ["confirmPassword"]
});

type TSignUpSchema = z.infer<typeof signUpSchema>;


function SignInPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  
  const {register, handleSubmit, formState: {errors}, setError} = useForm<TSignUpSchema>({resolver: zodResolver(signUpSchema)});
  const signinMutation = useMutation(
    async ({name, email, password}: TSignUpSchema) => await registration(name, email, password),
    {
      onSuccess: async (data) => {
        const responseLogin = await login(data.email, data.password);
        dispatch(setUser(responseLogin));
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

  const onSubmitHandle = (data: TSignUpSchema) => {
    signinMutation.mutate(data);
  }

  
  return (
    <div className='signin'>
      <div className="signin__title">Регистрация</div>
      <form onSubmit={handleSubmit(onSubmitHandle)}>
        <input {...register("name")} className="signin__name form-input" type="text" placeholder='Имя...' autoComplete="new-password"/>
          {errors.name && <p className='error-form-message'>{`${errors.name.message}`}</p>}
        <input {...register("email")} className="signin__email form-input" type="text" placeholder='Логин...' autoComplete="new-password"/>
          {errors.email && <p className='error-form-message'>{`${errors.email.message}`}</p>}
        <input {...register("password")} className="signin__password form-input" type="password" placeholder='Пароль...' autoComplete="new-password"/>
          {errors.password && <p className='error-form-message'>{`${errors.password.message}`}</p>}
        <input {...register("confirmPassword")} className="signin__password-check form-input" type="password" placeholder='Повторите пароль...' autoComplete="new-password"/>
          {errors.confirmPassword && <p className='error-form-message'>{`${errors.confirmPassword.message}`}</p>}
        <Button className="signin__button" callback={() => {}} text="Зарегистрироваться" type='submit'/>
      </form>
      <div className="signin__text">
        <p className='signin__text-ask'>Уже есть аккаунт?</p>
        <NavLink to={`/login/login`} className='signin__text-registration'>Войти</NavLink>
      </div>
    </div>
  );
}

export default SignInPage;