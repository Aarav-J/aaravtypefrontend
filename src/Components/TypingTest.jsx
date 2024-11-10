import React, { useEffect, useRef, useState } from "react";
import useStore from "../store";
import TextRenderer from "./TextRenderer";
import { getAdjustedLines } from "../lineutils";
import { ArrowClockwise } from "@phosphor-icons/react";
import Unfocused from "./Unfocused"
import Statistics from "./Statistics"; // Import Statistics component
import { Timer } from "@phosphor-icons/react";
function TypingTest() {
  const {
    text,
    userInput,
    currentIndex,
    cursorIndex,
    setUserInput,
    setCurrentIndex,
    setCursorIndex,
    reset,
    charPerLine,
    numLines,
    timeLeft,
    setTimeLeft,
    isTestRunning,
    setIsTestRunning,
    startTime,
    setStartTime,
    correctCharCount,
    incrementCorrectCharCount,
    totalCharCount,
    incrementTotalCharCount,
    isFocused, 
    setIsFocused,
    isTestOver, 
    setIsTestOver, 
    setCharPerLine, 
    setFinalWPM,
    setFinalAccuracy,
    addPerformanceData,
    selectedTimeControl,
    setSelectedTimeControl,
  } = useStore();

  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const containerRef = useRef(null);

  // Calculate WPM and accuracy in real-time
  useEffect(() => {
    if (isTestRunning && startTime) {
      const calculateMetrics = () => {
        const timeElapsed = (Date.now() - startTime) / 60000; // minutes
        const rawWpm = Math.round((totalCharCount / 5) / timeElapsed);
        const accuracyScore =
          totalCharCount > 0
            ? Math.round((correctCharCount / totalCharCount) * 100)
            : 100;

        setWpm(rawWpm);
        setAccuracy(accuracyScore);
      };

      const metricsInterval = setInterval(calculateMetrics, 500);
      return () => clearInterval(metricsInterval);
    } else {
      // Ensure timeLeft displays selected time when not running
      setTimeLeft(selectedTimeControl);
    }
  }, [isTestRunning, startTime, totalCharCount, correctCharCount, selectedTimeControl]);

  useEffect(() => {
    if (containerRef.current || isFocused) {
      containerRef.current.focus();
    }
  }, [isFocused]);

  useEffect(() => {
    let timerInterval;
    if (isTestRunning && timeLeft > 0) {
      timerInterval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    }

    if (timeLeft === 0 && isTestRunning) {
      endTest();
    }

    return () => clearInterval(timerInterval);
  }, [isTestRunning, timeLeft, setTimeLeft]);

  // Calculate charPerLine based on window width
  useEffect(() => {
    const calculateCharPerLine = () => {
      const baseWidth = 1240; // base width in pixels
      const baseCharPerLine = 70; // charPerLine at base width
      const currentWidth = window.innerWidth;
      const newCharPerLine = Math.floor((currentWidth / baseWidth) * baseCharPerLine);
      setCharPerLine(newCharPerLine);
    };

    // Initial calculation
    calculateCharPerLine();

    // Add event listener on window resize
    window.addEventListener('resize', calculateCharPerLine);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', calculateCharPerLine);
    };
  }, [setCharPerLine]);

  const endTest = () => {
    setIsTestRunning(false);
    setIsTestOver(true); // Set isTestOver to true
    if (containerRef.current) {
      containerRef.current.blur();
    }

    const endTime = Date.now();
    const timeElapsed = (endTime - startTime) / 60000; // in minutes

    let correctChars = 0;
    let totalChars = 0;

    for (let i = 0; i < userInput.length; i++) {
      const word = text[i];
      const userWord = userInput[i] || [];

      totalChars += word.length;

      for (let j = 0; j < word.length; j++) {
        if (userWord[j] === word[j]) {
          correctChars++;
        }
      }
    }

    const finalWPM = Math.round((correctChars / 5) / timeElapsed);
    const finalAccuracy = Math.round((correctChars / totalChars) * 100);

    setFinalWPM(finalWPM);
    setFinalAccuracy(finalAccuracy);
  };

  const handleKeyDown = (e) => {
    if (!isTestRunning) {
      // Start the test on first key press
      setIsTestRunning(true);
      setStartTime(Date.now());
      setTimeLeft(selectedTimeControl); // Initialize timeLeft
      // Allow the first key to be processed
    }
  
    if (timeLeft === 0) { // Removed || !isTestRunning
      // Do not allow typing when time is up
      e.preventDefault();
      return;
    }
  
    e.preventDefault();
    const key = e.key;
  
    if (key === "Tab") {
      setWpm(0);
      setAccuracy(0);
      reset();
      return;
    }
  
    // Handle space key to move to next word
    if (key === " " || key === "Spacebar" || key === "Space") {
      // Remove the increments to prevent double-counting
      // const typedWord = (userInput[currentIndex]?.join("") || "").trim();
      // const currentWord = text[currentIndex];
  
      // if (typedWord === currentWord) {
      //   incrementCorrectCharCount(currentWord.length + 1); // Remove this line
      // }
  
      // incrementTotalCharCount(currentWord.length + 1); // Remove this line
  
      // Calculate WPM and accuracy upon completing a word
      const timeElapsed = (Date.now() - startTime) / 60000; // minutes
      const charsTyped = userInput.slice(0, currentIndex + 1).reduce(
        (total, wordArr) => total + (wordArr ? wordArr.length : 0),
        0
      );
      const correctChars = userInput.slice(0, currentIndex + 1).reduce(
        (total, wordArr, idx) => {
          const word = text[idx];
          let correct = 0;
          if (wordArr) {
            for (let i = 0; i < wordArr.length; i++) {
              if (wordArr[i] === word[i]) {
                correct++;
              }
            }
          }
          return total + correct;
        },
        0
      );

      const currentWPM = Math.round((charsTyped / 5) / timeElapsed);
      const currentAccuracy = Math.round((correctChars / charsTyped) * 100);

      addPerformanceData({ wpm: currentWPM, accuracy: currentAccuracy });

      if (currentIndex >= text.length - 1) {
        // End of text
        endTest();
        return;
      }
  
      setCurrentIndex(currentIndex + 1);
      setCursorIndex(0);
      return;
    }
  
    // Handle backspace
    if (key === "Backspace") {
      if (cursorIndex > 0) {
        const newInput = [...userInput];
        newInput[currentIndex] = newInput[currentIndex].slice(0, -1);
        setUserInput(newInput);
        setCursorIndex(cursorIndex - 1);
        // Adjust correctCharCount if the removed character was correct
        const currentChar = text[currentIndex][cursorIndex - 1];
        if (newInput[currentIndex][cursorIndex - 1] === currentChar) {
          incrementCorrectCharCount(-1);
        }
        // Removed decrement of totalCharCount to ignore backspaces
      } else if (currentIndex > 0) {
        const prevWordIndex = currentIndex - 1;
        const prevWordLength = userInput[prevWordIndex]?.length || 0;
        setCurrentIndex(prevWordIndex);
        setCursorIndex(prevWordLength);
      }
      return;
    }
  
    // Handle regular character input
    if (key.length === 1 && key !== " " && key !== "Spacebar" && key !== "Space") {
      const newInput = [...userInput];
      if (!newInput[currentIndex]) {
        newInput[currentIndex] = [];
      }
      newInput[currentIndex][cursorIndex] = key;
      setUserInput(newInput);
      setCursorIndex(cursorIndex + 1);
  
      incrementTotalCharCount(1);
  
      const currentChar = text[currentIndex][cursorIndex];
      if (key === currentChar) {
        incrementCorrectCharCount(1);
      }
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    
    <div className="w-2/3 flex flex-col justify-center items-center" onClick={() => { 
      if(!isFocused) { 
        setIsFocused(true)
      }
    }}>
      
      {isTestRunning && isFocused && !isTestOver ? (
         <div className="mb-2 w-full flex flex-row gap-3 items-start text-xl">
         <div>{timeLeft}</div>
         <div>{wpm}</div>
         <div>{accuracy}%</div>
       </div>
      ) : null}
     
      { isFocused ? (
          <div
        ref={containerRef}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        className="text-center w-full outline-none"
      >
        <TextRenderer />
        {
        isFocused ? (<div className="w-full flex items-center justify-center">
        <ArrowClockwise
          size={26}
          className="mt-6 cursor-pointer"
          weight="bold"
          onClick={reset}
        />
      </div>) : null
      }
      </div>
        ) : 
        ( 
          <Unfocused/>
        )
      }
      
      {!isTestRunning && isTestOver && (
        <div className="mt-4 text-center">
          {/* Optionally, remove this block if Statistics component handles final display */}
          <div className="text-2xl font-bold">Test Finished!</div>
          <div className="mt-2">
            <div>Final WPM: {wpm}</div>
            <div>Final Accuracy: {accuracy}%</div>
          </div>
        </div>
      )}
     
      
    </div>
  );
}

export default TypingTest;