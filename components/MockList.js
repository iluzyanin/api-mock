const Mock = (props) => (
  <li>
    <p>
      <span className={`method--${props.mock.method.toLowerCase()}`}>{props.mock.method}</span>{' '}
      <b>{props.mock.url}</b>, status: {props.mock.status}
    </p>
    <pre className="pre-scrollable">
      {JSON.stringify(props.mock.data, null, 2)}
    </pre>
    <hr />
  </li>
);

const MockList = (props) => (
  <ul className="list-unstyled">
    {props.mocks.map((mock) => (
      <Mock mock={mock} key={mock.id} />
    ))}
    <style jsx global>{`
      .method--get {
        background-color: #3D9970;
        color: white;
        padding: 5px;
        font-weight: bold;
        border-radius: 3px;
      }
      .method--post {
        background-color: #001f3f;
        color: white;
        padding: 5px;
        font-weight: bold;
        border-radius: 3px;
      }
    `}</style>
  </ul>
);

export default MockList;