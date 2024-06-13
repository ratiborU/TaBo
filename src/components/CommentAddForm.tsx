import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const taskSchema = z.object({
  content: z.string().min(1, "Это поле обязательно для заполнения")
})

type TTaskSchema = z.infer<typeof taskSchema>;

const CommentAddForm = () => {

  const {register, handleSubmit, formState: {errors}, } = useForm<TTaskSchema>({resolver: zodResolver(taskSchema)});

  return (
    <div>
      <form onSubmit={() => {}}>
        <input className='' type="text" />
        <button>Добавить комментарий</button>
      </form>
    </div>
  );
};

export default CommentAddForm;