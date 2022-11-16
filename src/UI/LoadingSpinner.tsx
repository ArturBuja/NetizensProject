//styles
import classes from './LoadingSpinner.module.css';

const LoadingSpinner: React.FC = (): JSX.Element => {
  return <div className={classes.spinner}></div>;
};

export default LoadingSpinner;
