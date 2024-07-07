import React, { useRef, useEffect } from 'react';
import { Profiler } from 'react';

const ReactProfilerWrapper = ({ children }) => {
  const profilerDataRef = useRef(null);
  const profilerDisplayRef = useRef(null);

  useEffect(() => {
    // Create the profiler display element
    const displayElement = document.createElement('div');
    displayElement.style.cssText = `
      position: fixed;
      bottom: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px;
      border-radius: 5px;
      font-size: 12px;
      z-index: 9999;
      max-width: 300px;
    `;
    document.body.appendChild(displayElement);
    profilerDisplayRef.current = displayElement;

    // Cleanup function to remove the display element when the component unmounts
    return () => {
      document.body.removeChild(displayElement);
    };
  }, []);

  const updateProfilerDisplay = () => {
    if (profilerDisplayRef.current && profilerDataRef.current) {
      const { id, phase, actualDuration, baseDuration, startTime, commitTime } = profilerDataRef.current;
      profilerDisplayRef.current.innerHTML = `
        <h3 style="margin: 0 0 5px; font-size: 14px;">Profiler Info</h3>
        <p>ID: ${id}</p>
        <p>Phase: ${phase}</p>
        <p>Actual Duration: ${actualDuration.toFixed(2)}ms</p>
        <p>Base Duration: ${baseDuration.toFixed(2)}ms</p>
        <p>Start Time: ${startTime.toFixed(2)}</p>
        <p>Commit Time: ${commitTime.toFixed(2)}</p>
      `;
    }
  };

  const onRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions
  ) => {
    profilerDataRef.current = {
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime
    };
    updateProfilerDisplay();
  };

  return (
    <Profiler id="App" onRender={onRenderCallback}>
      {children}
    </Profiler>
  );
};

export default ReactProfilerWrapper;