import React from 'react';

const CircleQuestion = ({ clickHandler, classes }) => (
  <span
    className={classes}
    onClick={clickHandler}
    role="button"
    tabIndex={0}
  >
    <svg className="cleanform__circle-question" style={{ pointerEvents: 'none' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 400c-18 0-32-14-32-32s13.1-32 32-32c17.1 0 32 14 32 32S273.1 400 256 400zM325.1 258L280 286V288c0 13-11 24-24 24S232 301 232 288V272c0-8 4-16 12-21l57-34C308 213 312 206 312 198C312 186 301.1 176 289.1 176h-51.1C225.1 176 216 186 216 198c0 13-11 24-24 24s-24-11-24-24C168 159 199 128 237.1 128h51.1C329 128 360 159 360 198C360 222 347 245 325.1 258z" /></svg>
  </span>
);

export default CircleQuestion;
