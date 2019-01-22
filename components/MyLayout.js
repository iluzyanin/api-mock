import Head from 'next/head'

const Layout = props => (
  <React.Fragment>
    <Head>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
        integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
        crossorigin="anonymous"
      />
    </Head>
    <div className="layout">{props.children}</div>
    <style jsx>{`
      .layout {
        margin: 0 auto;
        max-width: 1000px;
        padding: 20px;
      }
    `}</style>
  </React.Fragment>
)

export default Layout
