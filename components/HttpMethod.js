const HttpMethod = (props) => (
  <React.Fragment>
    <span className={`http-method http-method--${props.name.toLowerCase()}`}>{props.name}</span>
    <style jsx>{`
      .http-method {
        color: white;
        padding: 5px;
        font-weight: bold;
        border-radius: 3px;
      }
      .http-method--get {
        background-color: forestgreen;

      }
      .http-method--post {
        background-color: midnightblue;
      }
      .http-method--put {
        background-color: goldenrod;
      }
      .http-method--delete {
        background-color: rebeccapurple;
      }
      .http-method--patch {
        background-color: saddlebrown;
      }
    `}</style>
  </React.Fragment>
);

export default HttpMethod;