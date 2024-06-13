import React, { useEffect, useState } from 'react';
import { ITaskWithComments, IUser } from '../services/types/types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { deleteTask, updateTask } from '../services/api/TaskSerice';
import { transformDate } from '../services/utils/utils';
import { Draggable } from 'react-beautiful-dnd';
import { createComment } from '../services/api/CommentService';
import { useAppSelector } from '../services/redux/hooks';
import { selectUser} from '../services/redux/fiatures/userSlice';
import { selectDesk } from '../services/redux/fiatures/deskSlice';

import UserImage from './UserImage';
import Comment from './Comment';
import Button from './UI/Button';


const taskSchema = z.object({
  title: z.string().min(1, "Это поле обязательно для заполнения"),
  description: z.string().max(1000, "Сликом много буковок"),
  deadline: z.string(),
  result: z.string()
}).refine(data => {
  if (data.deadline == '') {
    return true
  }
  const date = new Date(`${data.deadline}T12:00:00Z`);
  return !isNaN(date.valueOf());
}, {
  message: "Неверно введена дата",
  path: ["deadline"]
});
type TTaskSchema = z.infer<typeof taskSchema>;


const commentSchema = z.object({
  content: z.string().min(1, "Это поле обязательно для заполнения")
})
type TCommentSchema = z.infer<typeof commentSchema>;


type TaskProps = {
  task: ITaskWithComments,
  index: number
}




function Task({task, index}: TaskProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [description, setDescription]= useState(task.description);
  const user = useAppSelector(selectUser);
  const deskRedux = useAppSelector(selectDesk);


  const {register, handleSubmit, formState: {errors}, } = useForm<TTaskSchema>({resolver: zodResolver(taskSchema)});
  const {register: registerComment, handleSubmit: handleSubmitComment } = useForm<TCommentSchema>({resolver: zodResolver(commentSchema)});


  const taskUpdateMutation = useMutation({
    mutationFn: async (data: TTaskSchema) => {
      // console.log(data);
      const dateResult = data.deadline == '' ? '' : `${data.deadline}T12:00:00Z`
      await updateTask(task._id, data.title, task.columnId, description, users, data.result, dateResult, task.position);
    },
    onSuccess: () => {
      alert('Изменения сохранены');
    }
  });

  const createCommentMutation = useMutation({
    mutationFn: async (data: TCommentSchema) => {
      const currentDate = new Date();
      await createComment(user._id, user.name, task._id, data.content, currentDate.toISOString());
    },
    onSuccess: () => {
      alert('Изменения сохранены');
    }
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async () => {
      await deleteTask(task._id);
    },
    onSuccess: () => {
      alert('Задача удалена');
      onClosePopup();
    }
  });

  useEffect(() => {
    if (task.users) {
      setUsers(task.users);
    }
    
  }, [task]);

  const onSubmitForm = (data: TTaskSchema) => {
    // console.log('dataaaaaaaa');
    taskUpdateMutation.mutate(data);
  }

  const onSubmitCommentForm = (data: TCommentSchema) => {
    // console.log('commeeeeeeeent');
    createCommentMutation.mutate(data);
  }

  const onOpenPopup = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(true);
    document.addEventListener("click", onClosePopup);
    document.body.style.overflow = 'hidden';
  }

  const onClosePopup = () => {
    setIsOpen(false);
    setIsAddingMember(false);
    document.removeEventListener("click", onClosePopup);
    document.body.style.overflow = 'scroll'
  }

  

  const getDeadlineDateClass = () => {
    if (task.result) {
      return 'task__deadline';
    }
    const currentDate = new Date();
    const taskDate = new Date(task.deadline);
    return currentDate.toISOString() < taskDate.toISOString() ? 'task__deadline': "task__deadline-pass";
    // console.log(currentDate.toISOString() > taskDate.toISOString());
  }



  // console.log(task.users);
  if (isOpen) {
    return (
      <>
        <div className="dark-window"></div>
        <div className="task-popup-container">
          <div className="task-popup" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit(onSubmitForm)} id="taskForm"></form>
            <form onSubmit={handleSubmitComment(onSubmitCommentForm)} id="commentForm"></form>
            <div>
              <input {...register('title')} className='task-popup__title-input' type="text" placeholder='Название задачи...' defaultValue={task.name} form="taskForm"/>
              {errors.title && <p className='error-form-message'>{`${errors.title.message}`}</p>}
              <textarea {...register('description')} className='task-popup__textarea' name="" id="" placeholder='Описание задачи...' value={description} onChange={(e) => setDescription(e.target.value)} form="taskForm"></textarea>
              {errors.description && <p className='error-form-message'>{`${errors.description.message}`}</p>}
              
              
              <p className='task-popup__title'>Участники:</p>
              <div className="task-popup__members">
                <p className='task-popup__members-to-choose-text'>Ответственные:</p>
                {users.map(user => 
                  <UserImage 
                    callback={() => setUsers(users.filter(x => x._id != user._id))} 
                    key={user._id} 
                    username={user.name} 
                    size='30px' 
                    fontSize='14px' 
                    className=''
                  />
                  )}
              </div>
              {!isAddingMember && <Button className='task-popup__button task-popup__button_mb' callback={() => setIsAddingMember(true)} text='Добавить участника' type='button'/>}
              {isAddingMember && 
              <div className='task-popup__members-to-choose'>
                <p className='task-popup__members-to-choose-text'>Выбрать:</p>
                {deskRedux.users.map(user => 
                !users.find(x => x._id == user._id) && 
                <UserImage 
                  callback={() => {
                    setUsers([...users, user])
                  }} 
                  key={user._id} 
                  username={user.name} 
                  size='30px' 
                  fontSize='14px' 
                  className=''
                />)}
              </div>}
              {isAddingMember && <Button className='task-popup__button task-popup__button_mb' callback={() => setIsAddingMember(false)} text='Скрыть' type='button'/>}

              <p className='task-popup__title'>Результат:</p>
              <input {...register('result')} className='task-popup__input' type="text" placeholder='Результат задачи...' defaultValue={task.result} form="taskForm"/>
              {errors.result && <p className='error-form-message'>{`${errors.result.message}`}</p>}
              {/* <div className="task-popup__buttons">
                <Button className='task-popup__button' callback={() => {}} text='Выбрать файл' type='button'/>
                <Button className='task-popup__button' callback={() => {}} text='Сохранить' type='button'/>
                <Button className='task-popup__button' callback={() => {}} text='Скачать' type='button'/>
              </div> */}

              <p className='task-popup__title'>Deadline:</p>
              <input {...register('deadline')} className='task-popup__input task-popup__input_mb' type="text" placeholder='Крайний срок YYYY-MM-DD...' defaultValue={task.deadline && task.deadline.split('T')[0]} form="taskForm"/>
              {errors.deadline && <p className='error-form-message'>{`${errors.deadline.message}`}</p>}

              <p className='task-popup__title'>Комментарии</p>
              <div className="task-popup__comments">
                {task.comments.map(comment => <Comment key={comment._id} comment={comment}/>)}
                {/* <Comment/> */}
              </div>
              <div>
                  <input {...registerComment('content')} className='task-popup__input' type="text" form="commentForm" placeholder='Ваш комментарий...'/>
                  <button className='task-popup__button task-popup__button_mb' form="commentForm">Добавить комментарий</button>
              </div>
              {/* <input className='task-popup__input' type="text" placeholder='Ваш комментарий...'/>
              <Button className='task-popup__button task-popup__button_add-comment' callback={() => {}} text='Добавить' type='button'/> */}
              
              <div className="task-popup__save-buttons">
                <button className='task-popup__button' type='submit' form='taskForm'>Сохранить</button>
                <Button className='task-popup__button-delete' callback={() => deleteTaskMutation.mutate()} text='Удалить' type='button'/>
              </div>
            </div>

            
          </div>
        </div>
        
      </>
    )
  }


  return (
    <Draggable draggableId={task._id} index={index}>
    {(provided) => (
      <div 
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        className='task' 
        onClick={onOpenPopup}
      >
        <div className="task__title">
          <div className="task__title-text">{task.name}</div>
          <div className="task__users">
            {users.map(user => 
              <UserImage 
                callback={() => {
                  setUsers([...users, user])
                }} 
                key={user._id} 
                username={user.name} 
                size='20px' 
                fontSize='10px' 
                className=''
              />
            )}
          </div>
        </div>
        
        <div className="task__description">
          {task.description &&<div className="task__description-text">{task.description}...</div>}
          {task.deadline && <div className={getDeadlineDateClass()}>{transformDate(task.deadline)}</div>}
          
        </div>
      </div>
    )}
    </Draggable>
  );
}

export default Task;