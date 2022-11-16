import { Link, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error: any = useRouteError();

  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>Przepraszamy wystąpił błąd, treść błędu:</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>

      <Link to='/'>
        <h3>POWRÓT DO STRONY GŁÓWNEJ</h3>
      </Link>
    </div>
  );
}
