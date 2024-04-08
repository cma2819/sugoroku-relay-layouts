import React, { useEffect, useState } from 'react';
import { render } from '../../render';
import '../common.css';

const App = () => {

  const [ currentTime, setCurrentTime ] = useState<string>('');

  const timerRep = nodecg.Replicant('timer');

  useEffect(() => {
    timerRep.on('change', newVal => {
      setCurrentTime(newVal.timeDisplayText);
    });
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '520px',
      height: '120px',
    }}>
      { currentTime }
    </div>
  );
};

render(<App />);