import HttpMethod from "./HttpMethod";
import GlyphButton from './GlyphButton';
import Expand from './Expand';

class Mock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isResponseOpen: false };

    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen() {
    this.setState((prevState) => ({ isResponseOpen: !prevState.isResponseOpen }));
  }

  render() {
    const mock = this.props.mock;
    return (
      <li>
        <p>
          <HttpMethod name={mock.method}></HttpMethod>{' '}
          <b>{mock.url}</b>, status: {mock.status}, delay: {mock.delay} ms, {mock.enabled ? 'active' : 'disabled'}
          <GlyphButton onClick={this.toggleOpen} icon={this.state.isResponseOpen ? 'menu-up' : 'menu-down'} title="Show/Hide response"></GlyphButton>
          <GlyphButton onClick={this.props.onEdit} icon="pencil" title="Edit mock"></GlyphButton>
          <GlyphButton onClick={this.props.onDelete} icon="trash" title="Delete mock"></GlyphButton>
        </p>
        <Expand isOpen={this.state.isResponseOpen}>
          <pre>
            {JSON.stringify(mock.data, null, 2)}
          </pre>
        </Expand>
        <hr />
      </li>
    );
  }
}

export default Mock;