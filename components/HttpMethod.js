const nameMap = {
  GET: 'GET',
  DELETE: 'DEL',
  PATCH: 'PATC',
  POST: 'POST',
  PUT: 'PUT',
}

const HttpMethod = React.memo(({ name }) => (
  <React.Fragment>
    <span className={`http-method http-method--${name.toLowerCase()}`}>
      {nameMap[name]}
    </span>
    <style jsx>{`
      .http-method {
        font-weight: bold;
        font-family: 'Lucida console', monospace, 'Courier new';
        font-size: 12px;
      }
      .http-method--get {
        color: mediumseagreen;
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
        color: gray;
      }
    `}</style>
  </React.Fragment>
))

export default HttpMethod
