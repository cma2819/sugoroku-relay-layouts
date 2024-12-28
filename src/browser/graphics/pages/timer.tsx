import React, { useEffect, useState } from 'react';
import { render } from '../../render';
import '../common.css';
import { Timer } from '../../../nodecg/generated';

const params = new URLSearchParams(location.search);
const isUp = params.has('up') && Boolean(params.get('up'));

const App = () => {

  const [ currentTime, setCurrentTime ] = useState<Timer['timeDisplayText']>({
    up: '',
    down: '',
  });

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
      { isUp ? currentTime.up : currentTime.down }
    </div>
  );
};

render(<App />);