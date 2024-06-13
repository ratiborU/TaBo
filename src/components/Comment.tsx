// import React from 'react';
import { useMutation } from 'react-query';
import { IComment } from '../services/types/types';
import { transformDate } from '../services/utils/utils';
import UserImage from './UserImage';
import { deleteComment } from '../services/api/CommentService';

type CommentProps = {
  comment: IComment
}

const Comment = ({comment}: CommentProps) => {
  
  const deleteCommentMutation = useMutation({
    mutationFn: async () => {
      await deleteComment(comment._id);
    },
    onSuccess: () => {
      alert('Задача удалена');
    }
  });

  return (
    <div className='comment'>
      <div className="comment__image">
        <UserImage username={comment.username} size="30px" fontSize='14px'/>
        {/* <img src={image} alt="" /> */}
      </div>
      <div className="commet__block">
        <div className="comment__username-and-date">
          <div className="comment__name">{comment.username}</div>
          <div className="comment__date">{transformDate(comment.date)}</div>
        </div>
        
        <div className="comment__text">{comment.content}</div>
        <div className="comment__delete" onClick={() => deleteCommentMutation.mutate()}>удалить</div> 
      </div>
    </div>
  );
};

export default Comment;