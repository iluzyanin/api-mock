import Head from 'next/head';

const Layout = (props) => (
  <React.Fragment>
    <Head>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />
    </Head>
    <div className="layout">
      {props.children}
    </div>
    <style jsx>{`
      .layout {
        margin: 0 auto;
        max-width: 1000px;
        padding: 20px;
      }
    `}</style>
  </React.Fragment>
);

export default Layout
