export const Loader = ({ classes, styles }) => (
  <svg className={`lds-facebook svg-loader ${classes}`} style={{ margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto', height: '8rem', ...styles }} viewBox="0 0 100 100">
    <rect x="17" y="29.4463" width="16" height="41.1073" fill="#20a3a5">
      <animate attributeName="y" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="14;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.2s" />
      <animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="72;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.2s" />
    </rect>
    <rect x="42" y="28.5715" width="16" height="42.8571" fill="#148385">
      <animate attributeName="y" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="18;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.1s" />
      <animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="64;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.1s" />
    </rect>
    <rect x="67" y="26.8738" width="16" height="46.2525" fill="#20a3a5">
      <animate attributeName="y" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="18;30;30" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" />
      <animate attributeName="height" repeatCount="indefinite" dur="1s" calcMode="spline" keyTimes="0;0.5;1" values="64;40;40" keySplines="0 0.5 0.5 1;0 0.5 0.5 1" />
    </rect>
  </svg>
);
