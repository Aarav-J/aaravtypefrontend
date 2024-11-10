
// Function to adjust lines based on charPerLine and totalLines
export const getAdjustedLines = (textArray, maxChars, totalLines, currentWordIndex) => {
    let lines = [];
    let currentLine = [];
    let currentLineLength = 0;
    let wordIndex = 0;
  
    // First, create initial lines
    while (wordIndex < textArray.length) {
      const word = textArray[wordIndex];
      const wordLength = word.length;
      const wordWithSpaceLength = currentLineLength === 0 ? wordLength : wordLength + 1;
  
      if (currentLineLength + wordWithSpaceLength <= maxChars) {
        currentLine.push({ word, index: wordIndex });
        currentLineLength += wordWithSpaceLength;
      } else {
        lines.push(currentLine);
        currentLine = [{ word, index: wordIndex }];
        currentLineLength = wordLength;
      }
      wordIndex++;
    }
  
    // Push the last line
    if (currentLine.length > 0) {
      lines.push(currentLine);
    }
  
    // Find the line containing the current word
    let currentLineIndex = lines.findIndex(line =>
      line.some(item => item.index === currentWordIndex)
    );
  
    // Determine startLineIndex
    let startLineIndex = Math.max(0, currentLineIndex - 1);
    if (startLineIndex + totalLines > lines.length) {
      startLineIndex = Math.max(0, lines.length - totalLines);
    }
  
    // Get displayed lines
    let displayedLines = lines.slice(startLineIndex, startLineIndex + totalLines);
  
    // Flatten words and redistribute
    let allDisplayedWords = displayedLines.flat();
  
    const redistributedLines = redistributeWords(
      allDisplayedWords, maxChars, totalLines
    );
  
    return redistributedLines;
  };
  
  // Function to redistribute words among lines
  export const redistributeWords = (wordsArray, maxChars, totalLines) => {
    const newLines = [];
    let lineIndex = 0;
    let currentLine = [];
    let currentLineLength = 0;
  
    for (let i = 0; i < wordsArray.length; i++) {
      const { word, index } = wordsArray[i];
      const wordLength = word.length;
      const wordWithSpaceLength = currentLineLength === 0 ? wordLength : wordLength + 1;
  
      if (currentLineLength + wordWithSpaceLength <= maxChars) {
        currentLine.push({ word, index });
        currentLineLength += wordWithSpaceLength;
      } else {
        newLines.push(currentLine);
        lineIndex++;
        if (lineIndex >= totalLines) {
          break;
        }
        currentLine = [{ word, index }];
        currentLineLength = wordLength;
      }
    }
  
    // Add the last line if there's room
    if (newLines.length < totalLines && currentLine.length > 0) {
      newLines.push(currentLine);
    }
  
    // Ensure exactly totalLines lines
    while (newLines.length < totalLines) {
      newLines.push([]);
    }
  
    return newLines;
  };