import React from 'react';

export default function Die(props) {
  return (
    <div className="dieEl">
      <p>{props.value}</p>
    </div>
  );
}
