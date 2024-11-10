
import React, { useEffect } from "react";
import useStore from "../store";
import { getAdjustedLines } from "../lineutils";

function TextRenderer() {
  const {
    text,
    userInput,
    currentIndex,
    cursorIndex,
    charPerLine,
    numLines,
    addWords,
  } = useStore();

  // Get adjusted lines using the utility function
  const adjustedLines = getAdjustedLines(
    text,
    charPerLine,
    numLines,
    currentIndex
  );

  // Find the current line index
  const currentLineIndex = adjustedLines.findIndex((line) =>
    line.some((item) => item.index === currentIndex)
  );

  // Use useEffect to detect when to add more words
  useEffect(() => {
    // If the user has scrolled to the last two lines, add 15 more words
    if (currentLineIndex >= adjustedLines.length - 2) {
      addWords(15);
    }
  }, [currentLineIndex, adjustedLines.length, addWords]);

  // Render the text as before
  const renderText = () => {
    const elements = [];

    adjustedLines.forEach((line, lineOffset) => {
      const lineElements = [];

      line.forEach(({ word, index: wordIndex }) => {
        const userWord = userInput[wordIndex] || [];
        const wordChars = word.split("");

        const wordSpan = wordChars.map((char, charIndex) => {
          const userChar = userWord[charIndex];
          let classNames = "text-2xl font-oxygen";

          const isCurrent =
            wordIndex === currentIndex && charIndex === cursorIndex;

          if (userChar) {
            classNames +=
              userChar === char ? " text-correct" : " text-incorrect";
          }

          if (isCurrent) {
            classNames += " border-b-2 border-underline";
          }

          return (
            <span
              key={`char-${wordIndex}-${charIndex}`}
              className={classNames}
            >
              {userChar || char}
            </span>
          );
        });

        // Handle extra user characters
        if (userWord.length > wordChars.length) {
          userWord.slice(wordChars.length).forEach((extraChar, extraIndex) => {
            wordSpan.push(
              <span
                key={`extra-${wordIndex}-${extraIndex}`}
                className="text-incorrect text-2xl font-oxygen"
              >
                {extraChar}
              </span>
            );
          });
        }

        // Add the word to the line elements
        lineElements.push(
          <span
            key={`word-${wordIndex}`}
            className="inline-block whitespace-nowrap mr-2"
          >
            {wordSpan}
          </span>
        );
      });

      elements.push(
        <div key={`line-${lineOffset}`} className="w-full flex flex-wrap">
          {lineElements}
        </div>
      );
    });

    return elements;
  };

  return <div className="w-full leading-relaxed">{renderText()}</div>;
}

export default TextRenderer;
