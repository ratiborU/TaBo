import React from 'react';
import icon from "../assets/icons/Profile.svg";
import { TaskWithComments } from '../services/types/types';

type TaskProps = {
  task: TaskWithComments
}

function Task({task}: TaskProps) {
  const date = new Date(task.deadline);

  return (
    <div className='task'>
      <div className="task__title">
        <div className="task__title-text">{task.name}</div>
        <div className="task__users">
          <img src={icon} alt="" />
          <img src={icon} alt="" />
        </div>
      </div>
      
      <div className="task__description">
        <div className="task__description-text">{task.description}...</div>
        <div className="task__deadline">{date.getDate()}.0{date.getMonth()}.{date.getFullYear()} </div>
      </div>
    </div>
  );
}

export default Task;