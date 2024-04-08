import React, { useEffect, useState } from 'react';
import { render } from '../../render';

const toDatetimeLocalString = (d: Date) => {
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();
  const hours = d.getHours();
  const minutes = d.getMinutes();

  return `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

const App = () => {

  const [ currentTime, setCurrentTime ] = useState<string>('');
  const [ startAt, setStartAt ] = useState<string>('');
  const [ endAt, setEndAt ] = useState<string>('');

  const timerRep = nodecg.Replicant('timer');
  const timerInputsRep = nodecg.Replicant('timerInputs');

  useEffect(() => {
    timerRep.on('change', newVal => {
      setCurrentTime(newVal.timeDisplayText);
    });

    nodecg.readReplicant('timerInputs', (val) => {
      const startAt = new Date(Date.parse(val.startAt));
      const endAt = new Date(Date.parse(val.endAt));
      setStartAt(toDatetimeLocalString(startAt));
      setEndAt(toDatetimeLocalString(endAt));
    });
  }, []);

  const editStartAt = (v: string) => {
    setStartAt(v);
    timerInputsRep.value && (timerInputsRep.value.startAt = new Date(Date.parse(v)).toISOString());
  };
  
  const editEndAt = (v: string) => {
    setEndAt(v);
    timerInputsRep.value && (timerInputsRep.value.endAt = new Date(Date.parse(v)).toISOString());
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <label>残り時間：
        <input type='text' readOnly value={currentTime} /></label>
      <p>開始日時・終了日時を変更すると即座に反映されます</p>
      <label>開始日時：
        <input type='datetime-local' value={startAt} onChange={(e) => {
          editStartAt(e.currentTarget.value);
        }} />
      </label>
      <label>終了日時：
        <input type='datetime-local' value={endAt} onChange={(e) => {
          editEndAt(e.currentTarget.value);
        }} />
      </label>
    </div>
  );
};

render(<App />);