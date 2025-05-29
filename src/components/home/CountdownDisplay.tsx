import React from 'react';
import type { CountdownRenderProps } from 'react-countdown';

interface CountdownItemProps {
  value: number;
  label: string;
}

const CountdownItem: React.FC<CountdownItemProps> = ({ value, label }) => (
  <div className="flex flex-col items-center mx-3 sm:mx-5">
    <div className="w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center bg-white bg-opacity-10 backdrop-blur-sm rounded-lg border border-white border-opacity-20 mb-2">
      <span className="text-2xl sm:text-4xl font-bold text-white">{value}</span>
    </div>
    <span className="text-sm text-gray-300 uppercase tracking-wide">{label}</span>
  </div>
);

const CountdownDisplay: React.FC<CountdownRenderProps> = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return (
      <div className="text-center text-2xl font-bold text-accent-400 animate-pulse p-6">
        The event is happening now!
      </div>
    );
  }
  
  return (
    <div className="flex justify-center pt-6 pb-8">
      <CountdownItem value={days} label="Days" />
      <CountdownItem value={hours} label="Hours" />
      <CountdownItem value={minutes} label="Minutes" />
      <CountdownItem value={seconds} label="Seconds" />
    </div>
  );
};

export default CountdownDisplay;