import {useState} from 'react';
import Button from './UI/Button';
import { useForm } from 'react-hook-form';

type AddTaskFormProps = {
  callback: (name: string) => void,
  initialValue: string
}

function AddTaskForm({callback, initialValue="",}: AddTaskFormProps) {
  const {register, handleSubmit} = useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitHandle = (data: any) => {
    callback(data.name);
  }

  const [name, setName] = useState(initialValue);
  return (
    <div className='tasks__add-task-form'>
      <input {...register("name")} className="tasks__add-task-input" type="text" placeholder='Введите название...' onChange={(e) => setName(e.target.value)} value={name}/>
      <Button className="tasks__add-task-form-button" callback={handleSubmit(onSubmitHandle)} text="Сохранить" type="button"/>
    </div>
  );
}

export default AddTaskForm;