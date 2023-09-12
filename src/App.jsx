import { useState } from 'react' 
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h2>Pomodoro Timer</h2>
      <div>
         <div id="timer-label time-left" className="timer" >
          25:00
         </div> 
         <div className='buttons'>
          <button id='session-increment'>+</button>
          <div id="session-label">length</div>
          <div id="session-length">25</div>
          <button id='session-decrement'>-</button>
          <button id='break-increment'>+</button>
          <div id="break-label">break</div>
          <div id='break-length'>5</div>
          <button id='break-decrement'>-</button> 
         </div>
         <div className='control'>
            <button id='start_stop'>start</button> 
            <button id='reset'>reset</button>
         </div>           
      </div>
       
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> 
      </div>
      <p className="read-the-docs">
        Made using Vite and React
      </p>
    </>
  )
}

export default App
