import classNames from "classnames";
import React from "react";

import styles from "./progressBar.module.css";

interface IProps {
  max: number;
  value: number;
  className?: string;
  onChange: (progress: number) => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
}

const ProgressBar: React.FC<IProps> = ({
  max,
  value,
  className,
  onChange,
  onMouseDown,
  onMouseUp,
}) => {
  const classProps = classNames(styles.default, className);
  const percentNum = (value / max || 0) * 100;
  const percent = `${percentNum}%`;
  const firstStep = 100;
  const secondStep = 100;

  return (
    <div className={classProps}>
      <div className={styles.stepContainer}>
          <div className={styles.step} style={{ width: firstStep }}>
          </div>
          <div className={styles.step} style={{ width: secondStep }}>
          </div>
          <div className={styles.step} style={{ width: secondStep }}>
          </div>
        </div>
      <div className={styles.bgBar}>
        <div className={styles.bar} style={{ width: percent }}>
          <input
            onChange={(e) => onChange(parseInt(e.target.value, 10))}
            onTouchStart={onMouseDown}
            onTouchEnd={onMouseUp}
            type="range"
            min="0"
            max="100"
            step="1"
            value={percentNum}
            className={styles.controller}
          /> 
        </div>
      </div>
    </div>

    
  );
};

export default ProgressBar;