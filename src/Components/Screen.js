import React, { useState, useEffect } from 'react';

const Screen = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Function to update screen width
  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  // Initial update
  useEffect(() => {
    updateScreenWidth();

    // Cleanup: Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  // Add event listener for window resize
  useEffect(() => {
    window.addEventListener('resize', updateScreenWidth);

    // Cleanup: Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <p>Screen Width: {screenWidth}</p>
    </div>
  );
};

export default Screen;
