import classes from './Layout.module.css';
import MainNavigation from '../MainHeader/MainHeader';
import ScrollButton from '../../UI/ScroolButton';

type IProps = {
  children: React.ReactNode;
};

const Layout: React.FC<IProps> = props => {
  return (
    <>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
      <ScrollButton />
    </>
  );
};

export default Layout;
