import React from 'react';

const Check = ({ clickHandler, classes, myData }) => (
  <span
    className={classes}
    onClick={clickHandler}
    data-mydata={myData}
    role="button"
    tabIndex={0}
  >
    <svg className="cleanform__icon-check" style={{ pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M480.1 128.1l-272 272C204.3 405.7 198.2 408 192 408s-12.28-2.344-16.97-7.031l-144-144c-9.375-9.375-9.375-24.56 0-33.94s24.56-9.375 33.94 0L192 350.1l255-255c9.375-9.375 24.56-9.375 33.94 0S490.3 119.6 480.1 128.1z" /></svg>
  </span>
);

export default Check;
