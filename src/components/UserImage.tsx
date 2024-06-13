import React, { useMemo } from 'react';
import { getUserStiles } from '../services/utils/utils';

type UserImageProps = {
  username: string,
  size: string,
  fontSize: string,
  className: string,
  callback?: () => void
}

const UserImage = ({username, size, fontSize, className, callback = () => {}}: UserImageProps) => {
  const userColor = useMemo(() => getUserStiles(username), [username]);

  return (
    <div 
      className={`user-image ${className}`} 
      onClick={callback}
      style={{
        backgroundColor: userColor, 
        width: size,
        height: size,
        fontSize: fontSize,
        lineHeight: size
      }}
    >
      {username[0].toUpperCase()}
    </div>
  );
};

export default UserImage;