import { Timer, TimerInputs } from './generated';

type Asset = {
  base: string;
  bundleName: string;
  category: string;
  ext: string;
  name: string;
  sum: string;
  url: string;
}

type Assets = Array<Asset>;

type ReplicantMap = {
  timer: Timer;
  timerInputs: TimerInputs;
}

export {
  Asset,
  Assets,
  ReplicantMap,
  Timer,
  TimerInputs,
};
