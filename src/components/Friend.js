import React from 'react';

function Friend({ name, image }) {
  return (
    <div style={{ display: 'flex', border: '1px solid #333',borderRadius: '10px' }}>
      <img
        style={{
          objectFit: 'cover',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
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
