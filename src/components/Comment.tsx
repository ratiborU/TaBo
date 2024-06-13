// import React from 'react';
import { IComment } from '../services/types/types';
import image from "../assets/icons/Profile.svg";
import { transformDate } from '../services/utils/utils';

type CommentProps = {
  comment: IComment
}

const Comment = ({comment}: CommentProps) => {
  // console.log(comment);
  return (
    <div className='comment'>
      <div className="comment__image">
        <img src={image} alt="" />
      </div>
      <div className="commet__block">
        <div className="comment__name">{comment.username}</div>
        <div className="comment__text">{comment.content}</div>
        <div className="comment__date">{transformDate(comment.date)}</div> 
      </div>
    </div>
  );
};

export default Comment;