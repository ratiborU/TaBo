import { useState } from 'react';
// import UserService from '../services/api/UserService.tsx';
import { createDesk, getUserDesks } from '../services/api/DeskService.tsx';
import Desk from '../components/Desk';
import Button from '../components/UI/Button.tsx';
import AddDeskForm from '../components/AddDeskForm.tsx';
// import ModalChange from '../components/UI/ModalChange';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useAppSelector } from "../services/redux/hooks";
import { selectUser } from "../services/redux/fiatures/userSlice";


function HomePage() {
  const [isAddingDesk, setIsAddingDesk] = useState(false);
  const queryClient = useQueryClient();
  const user = useAppSelector(selectUser);
  // const dispatch = useAppDispatch();

  const { data: desks, isLoading, error } = useQuery({
    queryFn: async () => await getUserDesks(user._id),
    queryKey: ["desks", user._id],
    staleTime: Infinity,
  });

  const mutation = useMutation(
    async (name: string) => await createDesk(name, [user._id]),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['desks', user._id]});
      }
    }
  );

  const onButtonCreateDesk = (name: string) => {
    mutation.mutate(name);
    setIsAddingDesk(!isAddingDesk)
  }

  if (error) {
    return <>Произошла ошибка</>
  }

  if (isLoading) {
    return <>Идет загрузка</>;
  }
  
  return (
    <div className='desks'>
      {desks?.map((desk) => {
        if (!desk) {
          return <></> // проблема с удалением
        }
        return <Desk key={desk?._id} desk={desk}/>
      })}
      {!isAddingDesk && <Button className='desks__add-desk-button' callback={() => setIsAddingDesk(!isAddingDesk)} text='Добавить доску' type='button'/>}
      {isAddingDesk && <AddDeskForm callback={onButtonCreateDesk}initialValue=''/>}
    </div>
  );
}

export default HomePage;