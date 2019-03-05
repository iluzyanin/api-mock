import Head from 'next/head'

const Layout = React.memo(props => (
  <React.Fragment>
    <Head>
      <title>API Mock</title>
      <link rel="icon" type="image/x-icon" href="/ui/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
        integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.7.1/css/all.css"
        integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
        crossOrigin="anonymous"
      />
      <style type="text/css">{`
        html {
          margin-left: calc(100vw - 100%);
        }
      `}</style>
    </Head>
    <div className="layout">{props.children}</div>
    <style jsx>{`
      .layout {
        margin: 0 auto;
        max-width: 1600px;
        padding: 20px;
        display: flex;
      }
    `}</style>
  </React.Fragment>
))

export default Layout
