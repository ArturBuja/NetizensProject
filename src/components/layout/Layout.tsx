import classes from './Layout.module.css';
import MainNavigation from '../MainHeader/MainHeader';
import ScrollButton from '../../UI/ScroolButton';

const Layout = (props: any) => {
  return (
    <>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
      <ScrollButton />
    </>
  );
};

export default Layout;
