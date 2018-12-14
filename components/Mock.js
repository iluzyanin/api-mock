import Link from 'next/link'
import dynamic from 'next/dynamic';
import HttpMethod from "./HttpMethod";
import GlyphButton from './GlyphButton';
import Expand from './Expand';

const ReactJson = dynamic(
  import('react-json-view'),
  { ssr: false }
);

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
      [<li>
        <p>
          <HttpMethod name={mock.method}></HttpMethod>{' '}
          <code>{mock.url}</code> | status: {mock.status} | delay: {mock.delay} ms | {mock.enabled ? 'active' : 'disabled'}
          <GlyphButton onClick={this.toggleOpen} icon={this.state.isResponseOpen ? 'menu-up' : 'menu-down'} title="Show/Hide response"></GlyphButton>
          <Link as={`ui/edit-mock?id=${mock.id}`} href={`/edit-mock?id=${mock.id}`}>
            <GlyphButton icon="pencil" title="Edit mock"></GlyphButton>
          </Link>
          <GlyphButton onClick={this.props.onDelete} icon="trash" title="Delete mock"></GlyphButton>
          <div className="description">{mock.description}</div>
        </p>
        <Expand isOpen={this.state.isResponseOpen}>
          <ReactJson src={mock.data} theme="flat" />
        </Expand>
        <hr />
      </li>,
      <style jsx>{`
        .description {
          margin-top: 4px;
          font-family: monospace;
          font-size: 12px;
          color: light-grey;
        }
    ` }</style>]
    );
  }
}

export default Mock;