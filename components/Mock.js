import Link from 'next/link'
import HttpMethod from './HttpMethod'
import GlyphButton from './GlyphButton'
import Expand from './Expand'
import JSONInput from 'react-json-editor-ajrm'
import locale from 'react-json-editor-ajrm/locale/en'

class Mock extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { isResponseOpen: false }

    this.toggleOpen = this.toggleOpen.bind(this)
  }

  toggleOpen() {
    this.setState(prevState => ({ isResponseOpen: !prevState.isResponseOpen }))
  }

  render() {
    const { mock } = this.props
    return (
      <React.Fragment>
        <li>
          <p>
            <HttpMethod name={mock.method} isDisabled={!mock.enabled} />{' '}
            <code>{mock.url}</code> | status: {mock.status} | delay:{' '}
            {mock.delay} ms | {mock.enabled ? 'active' : 'disabled'}
            <GlyphButton
              onClick={this.toggleOpen}
              icon={this.state.isResponseOpen ? 'menu-up' : 'menu-down'}
              title="Show/Hide response"
            />
            <Link
              as={`ui/edit-mock?id=${mock.id}`}
              href={`/edit-mock?id=${mock.id}`}
            >
              <GlyphButton icon="pencil" title="Edit mock" />
            </Link>
            <GlyphButton
              onClick={this.props.onClone}
              icon="duplicate"
              title="Clone mock"
            />
            <GlyphButton
              onClick={this.props.onDelete}
              icon="trash"
              title="Delete mock"
            />
            <span className="description">{mock.description}</span>
          </p>
          <Expand isOpen={this.state.isResponseOpen}>
            <JSONInput
              locale={locale}
              placeholder={mock.data}
              theme="light_mitsuketa_tribute"
              width="100%"
              height="auto"
              confirmGood={false}
              viewOnly={true}
            />
          </Expand>
          <hr />
        </li>
        <style jsx>{`
          .description {
            margin-top: 4px;
            font-family: monospace;
            font-size: 12px;
            color: light-grey;
            display: block;
          }
          hr {
            margin: 5px 0 15px 0;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default Mock
