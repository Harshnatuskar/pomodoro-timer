import { useEffect, useState } from 'react' 
import './App.css'
import { DisplayState } from './components/DisplayState';
import TimeSetter from './TimeSetter'; 
import Display from './components/Display';
import alarm from "./assets/alarm.mp3"

const defaultBreakTime = 5 * 60;
const defaultSessionTime = 25 *60;
const max = 60* 60;
const min = 60;
const interval = 60;

function App() {
  const [breakTime, setBreakTime] = useState(defaultBreakTime);
  const [sessionTime, setSessionTime] = useState(defaultSessionTime);
  const [displayState, setDisplayState] = useState<DisplayState>({
    time: sessionTime,
    timeType: "Session",
    timerRunning: false
  });
  
  useEffect(()=>{
    let timerID: number;
    if(!displayState.timerRunning){
      return;
    }else{
      timerID = window.setInterval(decrementDisplay,1000);
    }

    return ()=>{
      window.clearInterval(timerID);
    }
  },[displayState.timerRunning])

  useEffect(()=>{
    if(displayState.time === 0){
      const audio = document.getElementById("beep") as HTMLAudioElement;
      audio.currentTime = 2;
      audio.play().catch((err) => console.log(err))
      setDisplayState((prev) =>({
        ...prev,
        timeType: prev.timeType === "Session" ? "Break" : "Session",
        time: prev.timeType === "Session" ? breakTime : sessionTime,
      }));
    }
  },[displayState,breakTime,sessionTime]);

  const reset = () =>{
    setBreakTime(defaultBreakTime);
    setSessionTime(defaultSessionTime);
    setDisplayState({
      time:defaultSessionTime,
      timeType:"Session",
      timerRunning:false,
    });
    const audio = document.getElementById("beep") as HTMLAudioElement;
    audio.pause();
    audio.currentTime = 0;
  }

  const startStop = (displayState:DisplayState) =>{
    setDisplayState((prev: DisplayState) =>({
      ...prev,
      timerRunning:!prev.timerRunning,
    }))
    console.log(displayState);
  }

  const changeBreakTime = (time:number)=>{
    if(displayState.timerRunning) return;
    setBreakTime(time);
  }

  const decrementDisplay = () =>{
    setDisplayState((prev)=>({
      ...prev,
      time:prev.time - 1,
    }))
  }

  const changeSessionTime = (time:number)=>{
    if(displayState.timerRunning) return;
    setSessionTime(time);
    setDisplayState({
      time:time,
      timeType:"Session",
      timerRunning:false,
    });
  }

  return (
    <>
       <div className='pomodoro timer'>
          <div className="setters">
          <Display 
            className="display"
            displayState={displayState}
            reset={reset}
            startStop={startStop}
          /> 
            <div className="session-label">
              Session Length
            </div>
            <TimeSetter 
              time = {sessionTime} 
              setTime = {changeSessionTime}
              min = {min}
              max = {max}
              interval={interval}
              type="session"
            />
            <div className="break">
              <div id="break-label">
                Break Length
              </div>
              <TimeSetter
                time = {breakTime}
                setTime = {changeBreakTime}
                min = {min}
                max = {max}
                interval={interval}
                type="break"
              /> 
            </div>
          </div>
          <audio  id="beep" src={alarm} />
       </div>
    </>
  )
}

export default App
