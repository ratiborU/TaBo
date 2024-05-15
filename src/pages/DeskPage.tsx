import { useState } from 'react';
import Column from '../components/Column';
import Button from '../components/UI/Button';
import moreIcon from "../assets/icons/More horiz.svg";
import profileIcon from "../assets/icons/Profile.svg";
import DeskService from '../services/api/DeskService';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
// import { useAppSelector } from "../services/redux/hooks";
// import { selectUser } from "../services/redux/fiatures/userSlice";
import AddColumnForm from '../components/AddColumnForm';
import { useQueryClient, useMutation } from 'react-query';
import ColumnService from '../services/api/ColumnService';


function DeskPage() {
  const {id} = useParams();
  // const user = useAppSelector(selectUser);
  const [isAddingColumn, setIsAddingColumn] = useState(false);

  const { data: desk, isLoading, error } = useQuery({
    queryFn: async () => await DeskService.getFullDesk(id),
    queryKey: ["desk"],
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (name: string) => await ColumnService.createColumn(name, id!),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('desk');
      }
    }
  );

  const createColumn = (name: string) => {
    mutation.mutate(name);
    console.log(name);
    setIsAddingColumn(false);
  }


  if (isLoading) {
    return <>Идет загрузка</>
  }
  if (error) {
    return <>произошла ошибка</>
  }
  return (
    <>
      <nav className='desk-nav'>
        <div className="desk-nav__name">Название доски</div>
        <div className="desk-nav__users">
          <img  src={profileIcon} alt="" />
          <img  src={profileIcon} alt="" />
        </div>
        <Button className="desk-nav__button" callback={() => {}} text="Фильтры" type="button"/>
        <Button className="desk-nav__button" callback={() => {}} text="Поделиться" type="button"/>
        <div className="desk-nav__more-icon">
          <img src={moreIcon} alt="#" />
        </div>
      </nav>
    
      <div className='columns'>
        {desk?.columns.map(column => {
          return <Column key={column._id} column={column}/>
        })}
        {!isAddingColumn && <Button className='columns__add-column-button' callback={() => {setIsAddingColumn(true)}} text="Добавить колонку" type="button"/>}
        {isAddingColumn && <AddColumnForm callback={createColumn} initialValue=''/>}
      </div>
    </>
  );
}

export default DeskPage;