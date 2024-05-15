import { useState } from 'react';
import moreIcon from "../assets/icons/More horiz.svg"
import profileIcon from "../assets/icons/Profile.svg"
import { NavLink } from 'react-router-dom';
import { Desk } from '../services/types/types';
import ModalChange from './UI/ModalChange';
import AddDeskForm from './AddDeskForm';
import DeskService from '../services/api/DeskService';
import { useMutation, useQueryClient } from 'react-query';

type DeskProps = {
  desk: Desk
}

function Desk({desk}: DeskProps) {
  const [users, setUsers] = useState([{image: profileIcon}, {image: profileIcon}]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const queryClient = useQueryClient();

  // console.log(desk);

  const mutationUpdate = useMutation(
    async (updatedDesk: Desk) => await DeskService.updateDesk(updatedDesk),
    {
      onSuccess: () => queryClient.invalidateQueries('desks')
    }
  );

  const mutationDelete = useMutation(
    async () => await DeskService.deleteDesk(desk._id),
    {
      onSuccess: () => queryClient.invalidateQueries('desks')
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

  const handleUpdateDesk = (updatedName: string) => {
    desk.name = updatedName;
    setIsChanging(false);
    mutationUpdate.mutate({...desk, name: updatedName});
  }

  const handleDeleteDesk = () => {
    mutationDelete.mutate();
    setIsDeleted(true);
  }

  // if (isDeleted) {
  //   return <></>
  // }

  if (isChanging) {
    return <AddDeskForm callback={handleUpdateDesk} initialValue={desk.name}/>
  }

  return (
    <NavLink to={`/desk/desk/${desk._id}`}>
      <div className='desk'>
        <div className="desk__title">
          <div className="desk__title-text">{desk.name}</div>

          <div className="desk__title-more-icon" onClick={handleModal}>
            <img src={moreIcon} alt="#" />
            {isModalVisible && <ModalChange callbackChange={() => setIsChanging(true)} callbackDelete={handleDeleteDesk}/>}
          </div>
        </div>

        <div className="desk__users">
          {users.map((user, i) => <div key={i}><img src={user.image} alt="" /></div>)}
        </div>
      </div>
    </NavLink>
    
  );
}

export default Desk;