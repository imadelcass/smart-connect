import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from './axios';
const image =
  'https://firebasestorage.googleapis.com/v0/b/clone-12b84.appspot.com/o/images%2Fimad.jpg?alt=media&token=005c8f74-c327-491e-badc-eaf25a17e1ff';
function MessageMain() {
  const [users, setusers] = useState([]);
  const [targetElement, settargetElement] = useState('');
  const [usersStyle, setusersStyle] = useState({
    display: 'none',
    position: 'absolute',
    top: '18vh',
    width: '60%',
  });
  const [filtredUsers, setfiltredUsers] = useState([]);
  const [userStyle, setuserStyle] = useState({
    padding: '15px',
    border: '1px solid #333',
    marginBottom: '5px',
    background: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    width : '95%'
  });
  
  useEffect(() => {
    axios.get('/demo/users').then(e => {
      setusers(e.data);
      setfiltredUsers(e.data);
    });
  }, []);
  let inputRef = useRef();
  useEffect(() => {
    let handler = e => {
      if (!inputRef.current.contains(e.target))
        setusersStyle({ display: 'none' });
    };
    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });
  const displayUsers = e => {
    settargetElement(e.target);
    console.log(targetElement);
    setusersStyle({ display: 'block' });
  };
  const filterUsers = e => {
    setfiltredUsers(
      users.filter(user => {
        // return the user contien letter from input
        if (user.name.toLowerCase().includes(e.target.value)) {
          return user;
        }
      })
    );
  };
  const maskUsers = e => {
    // if you click outside the input
    if (e.target != targetElement) {
      setusersStyle({ display: 'none' });
    }
  };
  return (
    <div>
      <div>
        <input
          style={{ width: '95%', marginTop: '20px' }}
          type='text'
          onClick={displayUsers}
          onKeyUp={filterUsers}
        />
        <div ref={inputRef} style={usersStyle}>
          {filtredUsers.map(user => {
            return (
              <Link to={`/users/${user._id}`}>
                <div key={user.name} style={userStyle}>
                  <h4>{user.name}</h4>
                  <img style={{ width: '50px' }} src={user.image} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MessageMain;
