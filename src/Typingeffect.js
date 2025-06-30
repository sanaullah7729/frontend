 import React from "react";

export const TypingText = ({ text, speed = 150 }) => {
  const [displayed, setDisplayed] = React.useState('');

  React.useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, index + 1));
      index++;
      if (index === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span style={styles.heroTitleAccent}>
      {displayed}
      <span style={{ borderRight: '2px solid white', marginLeft: '2px', animation: 'blink 1s infinite' }}></span>
    </span>
  );
};

const styles ={
     heroTitleAccent: {
    background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
}
