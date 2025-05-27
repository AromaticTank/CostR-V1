
import React, { useState, useEffect, useRef } from 'react';

interface AnimatedLogoProps {
  className?: string;
  textClassName?: string;
  sloganClassName?: string;
  showSlogan?: boolean;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  className = "flex flex-col items-center",
  textClassName = "text-4xl font-bold",
  sloganClassName = "text-xs font-light text-gray-500 mt-1",
  showSlogan = true
}) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [showFinalR, setShowFinalR] = useState(false);
  const [finalRScale, setFinalRScale] = useState(1);
  const sloganText = "an AromaticTank app";

  const animationTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    // Reset states on re-mount or prop change (though not expecting props to change here)
    setDisplayText('');
    setShowCursor(true);
    setShowFinalR(false);
    setFinalRScale(1);

    const clearAllTimeouts = () => {
      animationTimeoutsRef.current.forEach(clearTimeout);
      animationTimeoutsRef.current = [];
    };

    const sequence = [
      { action: 'type', char: 'C', delay: 200 },
      { action: 'type', char: 'o', delay: 150 },
      { action: 'type', char: 's', delay: 150 },
      { action: 'type', char: 't', delay: 150 },
      { action: 'type', char: 'R', delay: 150 },
      { action: 'pause', delay: 500 }, // Pause after "CostR" is typed
      { action: 'disappearCostR', delay: 100 },
      { action: 'pause', delay: 200 }, // Brief pause before final R appears
      { action: 'appearFinalR', delay: 100 },
      { action: 'scaleFinalR', delay: 150 },
    ];

    let currentIndex = 0;
    let currentTypedText = "";

    function runNextStep() {
      if (!mountedRef.current || currentIndex >= sequence.length) {
        if (currentIndex >= sequence.length && mountedRef.current) {
             // End of sequence for "CostR", final R scaling handled by state
        }
        return;
      }

      const step = sequence[currentIndex];
      let timeoutId: ReturnType<typeof setTimeout>;

      if (step.action === 'type') {
        setShowCursor(true);
        currentTypedText += step.char;
        setDisplayText(currentTypedText);
        timeoutId = setTimeout(() => {
          currentIndex++;
          runNextStep();
        }, step.delay);
      } else if (step.action === 'pause') {
        timeoutId = setTimeout(() => {
          currentIndex++;
          runNextStep();
        }, step.delay);
      } else if (step.action === 'disappearCostR') {
        setDisplayText(''); // Make "CostR" disappear
        setShowCursor(false); // Hide cursor with "CostR"
        timeoutId = setTimeout(() => {
          currentIndex++;
          runNextStep();
        }, step.delay);
      } else if (step.action === 'appearFinalR') {
        setShowFinalR(true); // Show the standalone "R"
        // We don't show cursor for the final R
        timeoutId = setTimeout(() => {
          currentIndex++;
          runNextStep();
        }, step.delay);
      } else if (step.action === 'scaleFinalR') {
        setFinalRScale(1.1); // Scale the final "R"
        // No further steps, animation ends
        currentIndex++; 
      }
      animationTimeoutsRef.current.push(timeoutId!);
    }

    runNextStep(); // Start the animation

    return () => {
      mountedRef.current = false;
      clearAllTimeouts();
    };
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className={className}>
      <div
        className={`${textClassName} inline-flex items-center justify-center`}
        style={{
          fontFamily: "'Lexend', sans-serif",
          transition: 'transform 0.3s ease-out',
          // Apply scale only to the final R
          transform: showFinalR ? `scale(${finalRScale})` : 'scale(1)',
        }}
      >
        {!showFinalR && (
          <>
            <span className="text-gradient-animated">{displayText}</span>
            {showCursor && displayText && ( // Show cursor only if there's text being typed for CostR
              <span
                className="inline-block w-px h-[0.8em] bg-onSurface animate-blink ml-0.5"
                style={{ backgroundColor: 'var(--color-onSurface)' }}
              ></span>
            )}
          </>
        )}
        {showFinalR && (
          <span className="text-gradient-animated">R</span>
        )}
         {/* Fallback for empty display during transition to maintain height if needed */}
        {!displayText && !showFinalR && <span className="opacity-0">R</span>}
      </div>

      {showSlogan && (
        <p className={sloganClassName} style={{ fontFamily: "'Lexend', sans-serif" }}>
          {sloganText}
        </p>
      )}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </div>
  );
};

export default AnimatedLogo;
