import React, { useState } from 'react';

function AddPathParameters() {
  const [a] = useState('3'); // 默认值为字符串 '3'
  const [b] = useState('4'); // 默认值为字符串 '4'

  return (
    <div id="wd-add">
      <h4>Add Path Parameters</h4>
      {a} + {b} = {parseInt(a) + parseInt(b) || 0}
    </div>
  );
}

export default AddPathParameters;