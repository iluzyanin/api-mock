const HttpMethod = ({ name, isDisabled }) => (
  <React.Fragment>
    <span
      className={`http-method http-method--${name.toLowerCase()}${
        isDisabled ? ' http-method--disabled' : ''
      }`}
    >
      {name}
    </span>
    <style jsx>{`
      .http-method {
        font-weight: bold;
        font-family: monospace;
      }
      .http-method.http-method--disabled {
        color: lightgray;
      }
      .http-method--get {
        color: forestgreen;
      }
      .http-method--post {
        color: orange;
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
)

export default HttpMethod
