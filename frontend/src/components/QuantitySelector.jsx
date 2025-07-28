// src/components/QuantitySelector.jsx
import { useState } from 'react';

export default function QuantitySelector({ initial = 1, min = 0 }) {
  const [value, setValue] = useState(initial);

  return (
    <div className="input-group">
      <button className="js-btn-minus" onClick={()=>setValue(v=> Math.max(min, v-1))}>–</button>
      <input type="text" className="form-control" value={value} readOnly />
      <button className="js-btn-plus" onClick={()=>setValue(v=> v+1)}>+</button>
    </div>
  );
}
