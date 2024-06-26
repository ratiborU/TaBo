import { useEffect, useState } from 'react';
import Column from '../components/Column';
import Button from '../components/UI/Button';
import { addUserToDesk, getFullDesk } from '../services/api/DeskService';
import { createColumn } from '../services/api/ColumnService';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import AddColumnForm from '../components/AddColumnForm';
import { useQueryClient, useMutation } from 'react-query';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { updateTask, getTaskById } from '../services/api/TaskSerice';
import { useAppDispatch, useAppSelector } from '../services/redux/hooks';
import { selectUser } from '../services/redux/fiatures/userSlice';
import UserImage from '../components/UserImage';
import { setDesk } from '../services/redux/fiatures/deskSlice';


function DeskPage() {
  const {id} = useParams();
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: desk, isLoading, status, error } = useQuery({
    queryFn: async () => {
      const response = await getFullDesk(id)
      dispatch(setDesk(response));
      return response;
    },
    queryKey: ["desk", id],
  });


  useEffect(() => {
    if (status == 'error') {
      navigate("/login/login");
    }
  }, [navigate, status]);


  const mutation = useMutation(
    async (name: string) => await createColumn(name, id!),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('desk');
      }
    }
  );

  const onButtonCreateColumn = (name: string) => {
    mutation.mutate(name);
    console.log(name);
    setIsAddingColumn(false);
  }

  const onDragEnd = async (result: DropResult) => {
    const task = await getTaskById(result.draggableId);
    await updateTask(task._id, task.name, result.destination!.droppableId, task.description, task.users, task.result, task.deadline, result.destination!.index);
    queryClient.invalidateQueries({queryKey: ["desk", id]});
  }

  const onAgree = async () => {
    await addUserToDesk(user._id, desk!._id);
    queryClient.invalidateQueries({queryKey: ["desk", id]});
  }

  const onDisgree = () => {
    navigate("/");
  }

  const onShareButton = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Ссылка приглашение скопированна в буфер обмена.');
  }

  

  if (isLoading) {
    return <>Идет загрузка</>
  }
  if (error) {
    return <>Произошла ошибка</>
  }
  if (!desk?.users.map(x => x._id).includes(user._id)) {
    return (
      <div className="popup-invitation-to-desk">
        <p className="popup-invitation-to-desk__text">Вас приглашают стать участником доски {desk?.name} вы согласны?</p>
        <div className='popup-invitation-to-desk__buttons'>
          <button className="popup-invitation-to-desk__button" type='button' onClick={onAgree}>да</button>
          <button className="popup-invitation-to-desk__button-refuse" type='button' onClick={onDisgree}>нет</button>
        </div>
        
      </div>
    )
  }


  return (
    <>
      <nav className='desk-nav'>
        <div className="desk-nav__name">{desk.name}</div>
        <div className="desk-nav__users">
          {desk.users.map(user => <UserImage key={user._id} username={user.name} size='30px' fontSize='14px' className=''/>)}
        </div>
        <Button className="desk-nav__button" callback={onShareButton} text="Поделиться" type="button"/>
      </nav>

      
      <div className='columns'>
        <DragDropContext
          onDragEnd={onDragEnd}
        >
          {desk?.columns.map(column => {
            return <Column key={column._id} column={column}/>
          })}
        </DragDropContext>
        {!isAddingColumn && <Button className='columns__add-column-button' callback={() => {setIsAddingColumn(true)}} text="Добавить колонку" type="button"/>}
        {isAddingColumn && <AddColumnForm callback={onButtonCreateColumn} initialValue=''/>}
      </div>
      
    </>
  );
}

export default DeskPage;