const Mock = (props) => (
  <li>
    {props.mock.method} {props.mock.url}, returns status {props.mock.status}<br />
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
  </ul>
);

export default MockList;