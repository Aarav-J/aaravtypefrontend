import React from "react";
import TypingTest from "./Components/TypingTest";
import useStore from "./store";
import Statistics from "./Components/Statistics";
import TapKey from "./Components/TabKey";
import Navbar from "./Components/Navbar";
import { Timer } from "@phosphor-icons/react";
function App() {
  
  const {isTestOver, setIsTestOver, isFocused, reset, selectedTimeControl, setSelectedTimeControl} = useStore()  
  
  return (
    <div className="flex flex-col items-center justify-between h-screen bg-background w-screen text-untyped py-8">
      <div className="w-full items-center justify-center flex flex-col">
        <Navbar/>
        {!isFocused && !isTestOver  && (
        <div className="px-12 w-2/5 py-4 bg-colorBackground justify-evenly flex flex-row items-center rounded-md gap-6">
          <div className="flex flex-row gap-2 text-correct text-lg justify-center items-center">
            <Timer size={24} weight="bold"/>
            <span>time</span>
          </div>
          <div className="w-2 h-full bg-background rounded-lg"></div>
          <div className="flex flex-row gap-4 items-center justify-center">
            {[15,30,60,120].map((time) => { 
              return (<span className={`text-lg ${time == selectedTimeControl ? 'text-untyped' : 'text-correct'} cursor-pointer`} onClick={() => { 
                reset()
                setSelectedTimeControl(time)
                setIsFocused(false)
              }}>{time}</span>)
            })}
          </div>
        </div>
      )}
      </div>
      
      {isTestOver ? <Statistics/> : <TypingTest/>}
      {/* <Statistics/> */}
      <div className="flex flex-row gap-2 py-1 justify-center items-center">
        <TapKey/>
        <span className="text-sm font-light font-oxygen"> - restart test</span>
      </div>
    </div>
  );
}

export default App;