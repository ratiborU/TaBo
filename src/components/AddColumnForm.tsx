import {useState} from 'react';
import Button from './UI/Button';
import { useForm } from 'react-hook-form';

type AddColumnFormProps = {
  callback: (name: string) => void,
  initialValue: string
}

function AddColumnForm({callback, initialValue="",}: AddColumnFormProps) {
  const {register, handleSubmit} = useForm();

  const onSubmitHandle = (data) => {
    callback(data.name);
  }

  const [name, setName] = useState(initialValue);
  return (
    <div className='columns__add-column-form'>
      <input {...register("name")} className="columns__add-column-input" type="text" placeholder='Введите название...' onChange={(e) => setName(e.target.value)} value={name}/>
      <Button className="columns__add-column-form-button" callback={handleSubmit(onSubmitHandle)} text="Сохранить" type='button'/>
    </div>
  );
}

export default AddColumnForm;