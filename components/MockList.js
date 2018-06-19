const Mock = (props) => (
  <li>
    {props.mock.method} {props.mock.url}
    <pre>
      {JSON.stringify(props.mock.data, null, 2)}
    </pre>
  </li>
);

const MockList = (props) => (
  <ul>
    {props.mocks.map((mock) => (
      <Mock mock={mock} key={mock.id} />
    ))}
  </ul>
);

export default MockList;