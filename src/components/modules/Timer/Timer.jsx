import Button from 'components/shared/Button/Button';
import { useEffect, useState } from 'react';
import styles from './timer.module.scss';

const Timer = () => {
  const [startTimer, setstartTimer] = useState(0);
  const [runTimer, setRunTimer] = useState(false);

  useEffect(() => {
    if (runTimer) {
      let InetvalId;
      InetvalId = setInterval(() => {
        setstartTimer(prevTime => prevTime + 1);
      }, 1000);
      return () => clearInterval(InetvalId);
    }
  }, [startTimer, runTimer]);

  const showTimer = () =>
    startTimer < 60
      ? `${startTimer} s.`
      : `${Math.floor(startTimer / 60)} m. ${Math.floor(startTimer % 60)} s.`;

  const timerOff = () => {
    setRunTimer(false);
    setstartTimer(0);
  };
  return (
    <div>
      <div className={styles.timer}>{showTimer()}</div>
      <div className={styles.buttons}>
        <Button
          onClick={() => {
            setRunTimer(true);
          }}
        >
          start
        </Button>
        <Button onClick={() => timerOff()}>stop</Button>
      </div>
    </div>
  );
};

export default Timer;
