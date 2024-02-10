import React, { useState, useRef } from 'react';
import classes from './stopwatch.module.css'

function Stopwatch() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const [text,setText] = useState("Start")
  const[isDisabled,setIsDisabled] = useState(true)

  const start = () => {
    setText("Stop")
    setIsDisabled(false)
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        const seconds = prevTime.seconds + 1;
        const minutes = prevTime.minutes + Math.floor(seconds / 60);
        const hours = prevTime.hours + Math.floor(minutes / 60);
        return {
          hours: hours,
          minutes: minutes % 60,
          seconds: seconds % 60,
        };
      });
    }, 1000);
  };

  const stop = () => {
    setText("Resume")
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const reset = () => {
    setText("Start");
    setIsDisabled(true)
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime({ hours: 0, minutes: 0, seconds: 0 });
  };

  const formatTime = (time) => {
    return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <div className={classes.main}>
            <div className={classes.inner_main}>
                <div className={classes.top}>
                    <h2 className={classes.heading}>
                        React Stopwatch
                    </h2>
                </div>
                <div className={classes.middle}>
                    <p id={classes.time}>
                        {formatTime(time)}
                    </p>
                </div>
                <div className={classes.bottom}>
                    <button onClick={isRunning ? stop : start}
                        className={classes.btn}>{text}</button>
                    <button className={`${classes.btn} ${isDisabled && classes.disabled}`} id={classes.start}
                    onClick={reset}>Reset</button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Stopwatch;