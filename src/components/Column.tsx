import { useState } from 'react';
import moreIcon from "../assets/icons/More horiz.svg";
import Task from './Task';
import { IColumnWithTasks } from '../services/types/types';
import Button from "./UI/Button";
import AddTaskForm from './AddTaskForm';
import { useQueryClient, useMutation } from 'react-query';
import { IColumn } from '../services/types/types';
import { deleteColumn, updateColumn } from '../services/api/ColumnService';
import ModalChange from './UI/ModalChange';
import { createTask } from '../services/api/TaskSerice';

import { Droppable } from 'react-beautiful-dnd';
// import { useAppSelector } from '../services/redux/hooks';
// import { selectDesk } from '../services/redux/fiatures/deskSlice';


type ColumnProps = {
  column: IColumnWithTasks
}


function Column({column}: ColumnProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [inputTitle, setInputTitle] = useState(column.name)
  // const [tasks, setTasks] = useState(column.tasks.sort((a, b) => a.position - b.position));
  const queryClient = useQueryClient();

  // const deskRedux = useAppSelector(selectDesk);
  // console.log(deskRedux.columns);
  // console.log(column)
  const mutationUpdate = useMutation(
    async (updatedColumn: IColumn) => await updateColumn(updatedColumn),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('desk');
        setIsChanging(false);
      }
    }
  );

  const mutationDelete = useMutation(
    async () => await deleteColumn(column._id),
    {
      onSuccess: () => queryClient.invalidateQueries('desk')
    }
  );
  
  const mutationAddTask = useMutation(
    async (name: string) => await createTask(name, column._id),
    {
      onSuccess: () => queryClient.invalidateQueries('desk')
    }
  );

  const closeModal = () => {
    setIsModalVisible(false);
    document.removeEventListener("click", closeModal)
  }

  const handleModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsModalVisible(!isModalVisible);
    document.addEventListener("click", closeModal)
  }

  const handleDeleteColumn = () => {
    mutationDelete.mutate();
    setIsDeleted(true);
  }

  const handleAddTask = (name: string) => {
    mutationAddTask.mutate(name);
    setIsAddingTask(false)
  }

  const onTitleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutationUpdate.mutate({...column, name: inputTitle});
  }


  if (isDeleted) {
    return <></>
  }


  return (
    <Droppable droppableId={column._id}>
    {(provided) => (
      <div className='column'
        {...provided.droppableProps}
        ref={provided.innerRef}
      >
        <div className="column__title">
          {!isChanging && <div className="column__title-text">{column.name}</div>}
          {isChanging && 
            <form onSubmit={onTitleFormSubmit}>
              <input className='column__title-input' type="text" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)}/>
            </form>
            
          }
          {/* <div className="column__title-more"><img src={moreIcon} alt="" /></div> */}
          <div className="column__title-more" onClick={handleModal}>
            <img src={moreIcon} alt="#" />
            {isModalVisible && <ModalChange callbackChange={() => setIsChanging(true)} callbackDelete={handleDeleteColumn}/>}
          </div>
        </div>
        
        {/* че-то странное не факт что будет работать */}
        <div className="column__tasks">
          
          {[...column.tasks].sort((a, b) => a.position - b.position).map((x, i) => <Task key={x._id} task={x} index={i}/>)}
          {/* {tasks.map((x, i) => <Task key={x._id} task={x} index={i}/>)} */}
          {provided.placeholder}
          {!isAddingTask && <Button className="column__button" callback={() => {setIsAddingTask(true)}} text="Добавить задачу" type={"button"}/>}
          {isAddingTask && <AddTaskForm callback={handleAddTask} initialValue=''/>}
        </div>
      </div>
    )}
    
    </Droppable>
  );
}

export default Column;