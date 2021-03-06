import React from 'react';
import axios from './axios';

function MessageMain() {
    
  const displayUsers = () => {
    axios.get('/demo/users').then(e => console.log(e.data));
  };
  return (
    <div>
      <div>
        <input
          style={{ width: '95%', marginTop: '20px' }}
          type='text'
          onClick={displayUsers}
        />
      </div>
    </div>
  );
}

export default MessageMain;
