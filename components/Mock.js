import HttpMethod from "./HttpMethod";
import GlyphButton from './GlyphButton';

const Mock = (props) => (
  <li>
    <p>
      <HttpMethod name={props.mock.method}></HttpMethod>{' '}
      <b>{props.mock.url}</b>, status: {props.mock.status}, delay: {props.mock.delay} ms
      <GlyphButton onClick={props.onEdit} icon="pencil"></GlyphButton>
      <GlyphButton onClick={props.onDelete} icon="trash"></GlyphButton>
    </p>
    <pre className="pre-scrollable">
      {JSON.stringify(props.mock.data, null, 2)}
    </pre>
    <hr />
  </li>
);

export default Mock;