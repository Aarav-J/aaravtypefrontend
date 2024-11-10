import React, {useRef, useEffect} from "react";
import useStore from "../store";
import MyLineChart from "./Chart";
import { ArrowClockwise } from "@phosphor-icons/react";
const Statistics = () => { 
    const {
        finalWPM, 
        finalAccuracy,
        reset, // Assuming resetTest is the function to reset the test
        text, 
        userInput, 
        selectedTimeControl
    } = useStore();
    // const finalWPM = 100
    // const finalAccuracy = 100

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                reset();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [reset]);
    
    return ( 
        <div className="w-11/12 h-2/6 flex flex-col items-center justify-center gap-6">
            <div className="statistics w-full h-full flex flex-row items-start px-12 py-3 gap-12">
            <div className="flex flex-col gap-3 items-start">
                    <div className="wpm flex flex-col items-start">
                        <span className="text-untyped text-lg">WPM</span>
                        <span className="text-correct text-6xl font-bold">{finalWPM}</span>
                    
                    </div>
                    <div className="acc flex flex-col items-start">
                        <span className="text-untyped text-lg">accuracy</span>
                        <span className="text-correct text-5xl font-bold">{finalAccuracy}%</span>
                    </div>
                    <div className="acc flex flex-col items-start">
                        <span className="text-untyped text-lg">test type</span>
                        <span className="text-correct text-lg">time {selectedTimeControl}</span>
                        <span className="text-correct text-lg">english</span>
                    </div>
                </div>
                <div className="chart w-full h-full">
                    <MyLineChart/>
                </div>
            </div>
            <div className="flex items-center justify-center">
            <ArrowClockwise
          size={26}
          className="mt-6 cursor-pointer"
          weight="bold"
          onClick={reset}
        />
      </div>
        </div>
    )
}

export default Statistics