// client/src/store.js
import { create } from 'zustand';
import { faker } from '@faker-js/faker';

const useStore = create((set) => ({
  text: faker.word.words(40).split(' '), // Initial text
  userInput: [],
  currentIndex: 0,
  cursorIndex: 0,
  charPerLine: 70,
  numLines: 3,
  timeLeft: 20,             // Total time in seconds
  isTestRunning: false,     // Test status
  startTime: null,          // Start time of the test
  correctCharCount: 0,      // Number of correct characters typed
  totalCharCount: 0,        // Total number of characters typed
  isFocused: false,
  isTestOver: false,        // Track if the test is over
  finalWPM: 0, 
  finalAccuracy: 0, 
  performanceData: [], // Array to store WPM and accuracy per word
  selectedTimeControl: 60,    // Default time control in seconds
  setSelectedTimeControl: (time) => set({ selectedTimeControl: time }),
  setUserInput: (newInput) => set({ userInput: newInput }),
  setCurrentIndex: (index) => set({ currentIndex: index }),
  setCursorIndex: (cursor) => set({ cursorIndex: cursor }),
  setTimeLeft: (time) => set({ timeLeft: time }),
  setIsTestRunning: (status) => set({ isTestRunning: status }),
  setStartTime: (time) => set({ startTime: time }),
  setIsFocused: (newFocus) => set({isFocused: newFocus}), 
  setIsTestOver: (status) => set({ isTestOver: status }),
  setFinalWPM: (newFinalWPM) => set({ finalWPM: newFinalWPM }),
  setFinalAccuracy: (newFinalAccuracy) => set({ finalAccuracy: newFinalAccuracy }),
  setCharPerLine: (newCharPerLine) => set({ charPerLine: newCharPerLine }),
  incrementCorrectCharCount: (count) =>
    set((state) => ({ correctCharCount: state.correctCharCount + count })),
  incrementTotalCharCount: (count) =>
    set((state) => ({ totalCharCount: state.totalCharCount + count })),
  addPerformanceData: (data) =>
    set((state) => ({ performanceData: [...state.performanceData, data] })),
  addWords: (numWords) => {
    const newWords = faker.word.words(numWords).split(' ');
    set((state) => ({
      text: [...state.text, ...newWords],
    }));
  },

  reset: () =>
    set((state) => ({
      userInput: [],
      currentIndex: 0,
      cursorIndex: 0,
      text: faker.word.words(40).split(' '),
      timeLeft: state.selectedTimeControl, // Initialize based on selected time
      isTestRunning: false,
      startTime: null,
      correctCharCount: 0,
      totalCharCount: 0,
      isTestOver: false, // Reset isTestOver
      performanceData: [], // Reset performance data
    })),
}));

export default useStore;