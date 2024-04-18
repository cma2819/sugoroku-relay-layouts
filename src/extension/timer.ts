import { NodeCG } from './nodecg';

type TimerProps = {
    start: Date;
    end: Date;
    isCountdown?: boolean;
}

export const Timer = (props: TimerProps) => {
  const isCountdown = props.isCountdown ?? false;
  const startAtTimestamp = isNaN(props.start.getTime()) ? 0 : props.start.getTime();
  const endAtTimestamp = isNaN(props.end.getTime()) ? Infinity : props.end.getTime();
  const timeLength = Math.max(0, endAtTimestamp - startAtTimestamp);

  let currentTimeInSeconds = 0;

  const getTimestamps = () => ({
    start: startAtTimestamp,
    end: endAtTimestamp,
  });

  const tick = (now: Date) => {
    const timestamp = now.getTime();
    const progress = Math.max(0, timestamp - startAtTimestamp);

    const currentInMs = isCountdown ? Math.max(0, timeLength - progress) : Math.min(timeLength, progress);

    currentTimeInSeconds = Math.floor(currentInMs / 1000);
  };

  const getCurrentTimeInSeconds = () => {
    return currentTimeInSeconds;
  };

  const getDisplayTime = () => {
    const hours = Math.floor(currentTimeInSeconds / 3600);
    const minutes = Math.floor((currentTimeInSeconds % 3600) / 60);
    const seconds = Math.floor(currentTimeInSeconds % 60);

    return [hours > 0 ? String(hours) : null, String(minutes).padStart(2, '0'), String(seconds).padStart(2, '0')].filter((v): v is string => v !== null).join(':');
  };

  return {
    getTimestamps,
    tick,
    getCurrentTimeInSeconds,
    getDisplayTime,
  };
};

const timer = (nodecg: NodeCG) => {

  let timer: ReturnType<typeof Timer>;

  const defaultSchedule = nodecg.bundleConfig.defaultSchedule;

  const timerInputsRep = nodecg.Replicant('timerInputs', {
    defaultValue: {
      startAt: defaultSchedule?.start ?? (new Date(0)).toISOString(),
      endAt: defaultSchedule?.end ?? (new Date(Infinity)).toISOString(),
    }
  });
  const timerRep = nodecg.Replicant('timer', {
    defaultValue: {
      startAtTimestamp: 0,
      endAtTimestamp: 0,
      timeInSeconds: 0,
      timeDisplayText: '00:00',
    }
  });

  timerInputsRep.on('change', newVal => {
    timer = Timer({
      start: new Date(Date.parse(newVal.startAt)),
      end: new Date(Date.parse(newVal.endAt)),
      isCountdown: true
    });
  });
  
  setInterval(() => {
    if(timer) {
      timer.tick(new Date());

      const timestamps = timer.getTimestamps();

      timerRep.value = {
        startAtTimestamp: timestamps.start,
        endAtTimestamp: timestamps.end,
        timeInSeconds: timer.getCurrentTimeInSeconds(),
        timeDisplayText: timer.getDisplayTime(),
      };
    }
  }, 100);
};

export default timer;