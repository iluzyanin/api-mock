const HttpMethod = React.memo(({ name }) => (
  <React.Fragment>
    <span className={`http-method http-method--${name.toLowerCase()}`}>
      {name}
    </span>
    <style jsx>{`
      .http-method {
        font-weight: bold;
        font-family: monospace;
      }
      .http-method--get {
        color: forestgreen;
      }
      .http-method--post {
        color: coral;
      }
      .http-method--put {
        color: steelblue;
      }
      .http-method--delete {
        color: firebrick;
      }
      .http-method--patch {
        color: midnightblue;
      }
    `}</style>
  </React.Fragment>
))

export default HttpMethod
