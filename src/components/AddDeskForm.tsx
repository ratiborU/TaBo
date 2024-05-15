import {useState} from 'react';
import Button from './UI/Button';
import { useForm } from 'react-hook-form';

type AddDeskFormProps = {
  callback: (name: string) => void,
  initialValue: string
}

function AddDeskForm({callback, initialValue="",}: AddDeskFormProps) {
  const {register, handleSubmit} = useForm();

  const onSubmitHandle = (data) => {
    callback(data.name);
  }

  const [name, setName] = useState(initialValue);
  return (
    <div className='desks__add-desk-form'>
      <input {...register("name")} className="desks__add-desk-input" type="text" placeholder='Введите название...' onChange={(e) => setName(e.target.value)} value={name}/>
      <Button className="desks__add-desk-form-button" callback={handleSubmit(onSubmitHandle)} text="Сохранить" type='button'/>
    </div>
  );
}

export default AddDeskForm;