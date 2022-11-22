import React from 'react';

export default function Die(props) {
  return (
    <div className="die-face">
      <p>{props.value}</p>
    </div>
  );
}
