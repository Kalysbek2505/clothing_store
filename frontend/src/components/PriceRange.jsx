// src/components/PriceRange.jsx
import { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function PriceRange() {
  const [range, setRange] = useState([75, 300]);
  return (
    <div className="price-range">
      <Slider
        range
        min={0}
        max={500}
        defaultValue={range}
        onChange={setRange}
      />
      <input 
        type="text"
        value={`$${range[0]} - $${range[1]}`}
        readOnly
      />
    </div>
  );
}
