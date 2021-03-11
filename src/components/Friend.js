import React, { useState } from 'react';

function Friend({ name, image }) {
  const [friendcss, setfriendcss] = useState({
    display: 'flex',
    border: '1px solid #333',
    borderRadius: '10px',
    padding: '5px',
    hover :{
      color: '#ed1212',
      cursor: 'pointer',
    }
  });
  const displayMessages = e => {
    console.log(e.target);
  };
  return (
    <div
      onClick={displayMessages}
      // onMouseEnter={() => setfriendcss({ cursor: 'pointer' })}
      style={friendcss}
    >
      <img
        style={{
          objectFit: 'cover',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          marginRight: '15px',
        }}
        src={image}
      />
      <div>
        <h3 style={{ paddingBottom: '5px' }}>{name}</h3>
        <h5>on ligne</h5>
      </div>
    </div>
  );
}
export default Friend;
