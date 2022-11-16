import React, { useState, useCallback } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import classes from './ScrollButton.module.css';

const ScrollButton: React.FC = (): JSX.Element => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = useCallback(() => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  window.addEventListener('scroll', toggleVisible);

  return (
    <div className={classes.button}>
      <FaArrowCircleUp
        onClick={scrollToTop}
        style={{ display: visible ? 'inline' : 'none' }}
      />
    </div>
  );
};

export default ScrollButton;
