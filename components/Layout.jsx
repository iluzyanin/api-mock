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
        href="https://use.fontawesome.com/releases/v5.6.3/css/regular.css"
        integrity="sha384-aubIA90W7NxJ+Ly4QHAqo1JBSwQ0jejV75iHhj59KRwVjLVHjuhS3LkDAoa/ltO4"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.6.3/css/fontawesome.css"
        integrity="sha384-jLuaxTTBR42U2qJ/pm4JRouHkEDHkVqH0T1nyQXn1mZ7Snycpf6Rl25VBNthU4z0"
        crossOrigin="anonymous"
      />
    </Head>
    <div className="layout">{props.children}</div>
    <style jsx>{`
      .layout {
        margin: 0 auto;
        max-width: 1600px;
        padding: 20px;
      }
    `}</style>
  </React.Fragment>
))

export default Layout
