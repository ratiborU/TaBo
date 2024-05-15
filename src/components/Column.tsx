import { useState } from 'react';
import moreIcon from "../assets/icons/More horiz.svg";
import Task from './Task';
import { ColumnWithTasks } from '../services/types/types';
// import ButtonTask from './UI/ButtonTask';
import Button from "./UI/Button";
import AddTaskForm from './AddTaskForm';
import { useQueryClient, useMutation } from 'react-query';
import { Column } from '../services/types/types';
import ColumnService from '../services/api/ColumnService';
import ModalChange from './UI/ModalChange';


type ColumnProps = {
  column: ColumnWithTasks
}


function Column({column}: ColumnProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const queryClient = useQueryClient();
  
  const mutationUpdate = useMutation(
    async (updatedColumn: Column) => await ColumnService.updateColumn(updatedColumn),
    {
      onSuccess: () => queryClient.invalidateQueries('desk')
    }
  );

  const mutationDelete = useMutation(
    async () => await ColumnService.deleteColumn(column._id),
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

  return (
    <div className='column'>
      <div className="column__title">
        <div className="column__title-text">{column.name}</div>
        {/* <div className="column__title-more"><img src={moreIcon} alt="" /></div> */}
        <div className="column__title-more" onClick={handleModal}>
            <img src={moreIcon} alt="#" />
            {isModalVisible && <ModalChange callbackChange={() => setIsChanging(true)} callbackDelete={handleDeleteColumn}/>}
          </div>
      </div>
      
      <div className="column__tasks">
        {column.tasks.map((x, i) => <Task key={i} task={x}/>)}
        
        {!isAddingTask && <Button className="column__button" callback={() => {setIsAddingTask(true)}} text="Добавить задачу" type={"button"}/>}
        {isAddingTask && <AddTaskForm callback={() => {setIsAddingTask(false)}} initialValue=''/>}
      </div>
      
    </div>
  );
}

export default Column;