import fetch from 'isomorphic-unfetch'
import classnames from 'classnames'
import HttpMethod from './HttpMethod'

class MockList extends React.PureComponent {
  constructor(props) {
    super(props)

    this.deleteMock = this.deleteMock.bind(this)
    this.state = {
      selectedMockId: null,
      initialized: false,
    }
  }

  componentDidUpdate() {
    if (this.props.mocks.length > 0 && !this.state.initialized) {
      this.selectMock(this.props.mocks[0])
      this.setState({
        initialized: true,
      })
    }
  }

  async cloneMock(mock) {
    const clonedMock = {
      ...mock,
      id: undefined,
      description: `${mock.description} COPY`,
    }
    await fetch('/mocks', {
      body: JSON.stringify(clonedMock),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    })
    await this.props.onMocksChange()
  }

  async deleteMock(mockId) {
    await fetch(`/mocks/${mockId}`, { method: 'DELETE' })
    await this.props.onMocksChange()
  }

  selectMock = mock => {
    this.setState(state => ({ selectedMockId: mock.id }))
    this.props.onMockClick(mock)
  }

  descriptionSorter(mockA, mockB) {
    if (!mockA.description) {
      return 1
    }

    return mockA.description.localeCompare(mockB.description)
  }

  render() {
    return (
      <React.Fragment>
        <ul className="mockList">
          {this.props.mocks.sort(this.descriptionSorter).map(mock => (
            <li
              key={mock.id}
              className={classnames('mockItem', {
                'mockItem--selected': mock.id === this.state.selectedMockId,
              })}
              onClick={() => this.selectMock(mock)}
            >
              <span className="method">
                <HttpMethod name={mock.method} />
              </span>
              <span className="description" title={mock.description}>
                {mock.description}
              </span>
            </li>
          ))}
        </ul>
        <style jsx>{`
          .mockList {
            margin: 10px;
            list-style-type: none;
          }
          .mockItem {
            height: 30px;
            display: flex;
            align-items: center;
            padding: 5px;
          }
          .mockItem:hover {
            background-color: whitesmoke;
            cursor: pointer;
          }
          .mockItem--selected {
            background-color: gainsboro;
            border-radius: 3px;
          }
          .mockItem--selected:hover {
            background-color: gainsboro;
          }
          .method {
            min-width: 60px;
            line-height: 13px;
          }
          .description {
            font-size: 13px;
            width: 200px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default MockList
