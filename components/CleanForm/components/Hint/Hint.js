import React, { useRef, useState } from 'react';
import MyTransition from '../../MyTransition/MyTransition';
import HintStyled from './HintStyled';

const Hint = props => {
  const {
    children,
    text,
    classes,
    noHint,
    heightTreshold = 100,
    delay,
    hintColor,
    vertOffset = 0,
    horizOffset = 0,
    hideTriangle,
  } = props;
  const [showHint, setShowHint] = useState();
  const hintBox = useRef();
  const triangle = useRef();

  const mouseOverHandler = e => {
    if (noHint) {
      return;
    }

    if (!showHint) {
      setShowHint(true);
      const child = e.currentTarget;
      const screenWidth = window.innerWidth;

      setTimeout(() => {
        const { right } = hintBox.current.getBoundingClientRect();
        const { left: childLeft, right: childRight, height: childHeight, width: childWidth, top: childTop } = child.getBoundingClientRect();

        const childCenter = childRight - (childWidth / 2);
        const childCenterVert = childTop - (childHeight / 2);
        const hintBoxPos = childCenter < screenWidth / 2 ? 'left' : 'right';
        const hintBoxVertPos = childCenterVert < heightTreshold ? 'bottom' : 'top';

        if (hintBoxVertPos === 'top') {
          hintBox.current.style.bottom = `${childHeight + 5 + vertOffset}px`;
          triangle.current.style.bottom = 0;
        } else {
          hintBox.current.style.top = `${childHeight + 5 + vertOffset}px`;
          triangle.current.style.top = 0;
          triangle.current.style.transform = 'rotate(180deg)';
          triangle.current.style.bottom = 'unset';
        }

        if (hintBoxPos === 'left') {
          hintBox.current.style.left = `${-1 + horizOffset}rem`;
          triangle.current.style.left = `${childWidth / 2}px`;
          const maxWidth = screenWidth > 520 ? 400 : screenWidth - (childLeft + 20);
          hintBox.current.style.maxWidth = `${maxWidth}px`;
        } else {
          hintBox.current.style.right = `${-1 + horizOffset}rem`;
          triangle.current.style.right = `${childWidth / 2}px`;
          const maxWidth = screenWidth > 520 ? 400 : right - 20;
          hintBox.current.style.maxWidth = `${maxWidth}px`;
        }
      }, delay || 100);
    }
  };

  return (
    <HintStyled
      showHint={showHint}
      className={classes}
      hintColor={hintColor}
      hideTriangle={hideTriangle}
    >
      <div
        onMouseOver={mouseOverHandler}
        onMouseLeave={() => setShowHint()}
        onFocus={() => {}}
      >
        {children}
      </div>
      <MyTransition
        showElement={showHint}
      >
        <div
          className="hint__wrapper"
          ref={hintBox}
        >
          <div className="hint__text">
            {text}
          </div>
          <div className="hint__triangle" ref={triangle} />
        </div>
      </MyTransition>
    </HintStyled>
  );
};

export default Hint;
