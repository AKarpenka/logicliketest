import React, { memo } from 'react';
import Spin from 'antd/es/spin';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import styles from './CustomSpinner.module.scss';
import { DEFAULT_COLOR, DEFAULT_SIZE } from './constants';

interface ICustomSpinnerProps {
  size?: number;
  color?: string;
}

const CustomSpinner: React.FC<ICustomSpinnerProps> = memo(({ 
  size = DEFAULT_SIZE, 
  color = DEFAULT_COLOR 
}) => {
  const customSpinner = (
    <LoadingOutlined 
      className={styles.spinnerIcon}
      style={{ 
        fontSize: size, 
        color: color
      }} 
      spin 
    />
  );

  return (
    <div className={styles.spinnerContainer}>
      <Spin indicator={customSpinner} />
    </div>
  );
});

export default CustomSpinner;
