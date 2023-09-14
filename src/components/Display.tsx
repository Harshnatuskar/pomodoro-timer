import {FaPlay, FaPause ,FaUndo} from "react-icons/fa";
import { DisplayState, formatTime } from "./DisplayState"; 

interface DisplayProps{
    className?: string;
    displayState: DisplayState;
    reset: () => void;
    startStop: (displayState:DisplayState) => void;
}
 
 
const Display : React.FC<DisplayProps>=({
    displayState,
    reset,
    startStop,
}) => {
  return (
    <div className="display">
        <h4 id="timer-label">
            {displayState.timeType}
        </h4>
        <span id="time-left" style={{color:`${displayState?'white':'grey'}`}}>
            {formatTime(displayState.time)}
        </span>
        <div>
            <button id="start_stop" style={{margin:"20px"}} onClick={()=>startStop(displayState)}>
                {displayState.timerRunning?<FaPause /> : <FaPlay />}
            </button>
            <button id="reset" style={{margin:"20px"}} onClick={reset}>
                <FaUndo />
            </button>
        </div>
    </div>
  )
}

export default Display
