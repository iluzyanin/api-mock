import classnames from 'classnames'
import HttpMethod from './HttpMethod'

const descriptionSorter = (mockA, mockB) => {
  if (!mockA.description) {
    return 1
  }

  return mockA.description.localeCompare(mockB.description)
}

class MockList extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      groupedMocks: {},
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mocks !== this.props.mocks) {
      this.setState({
        groupedMocks: this.getGroupedMocks(this.props.mocks),
      })
    }
  }

  onMockDelete = (e, mockId) => {
    e.preventDefault()
    e.stopPropagation()
    this.props.onMockDelete(mockId)
  }

  onMockClone = (e, mockId) => {
    e.preventDefault()
    e.stopPropagation()
    this.props.onMockClone(mockId)
  }

  getGroupedMocks = mocks =>
    mocks.reduce((grouped, mock) => {
      const group = mock.group || 'zzz_ungrouped'
      grouped[group] = grouped[group] || {
        isOpen: true,
        mocks: [],
      }
      grouped[group].mocks.push(mock)
      return grouped
    }, {})

  toggleIsOpen = groupName => {
    this.setState(prevState => ({
      groupedMocks: {
        ...prevState.groupedMocks,
        [groupName]: {
          ...prevState.groupedMocks[groupName],
          isOpen: !prevState.groupedMocks[groupName].isOpen,
        },
      },
    }))
  }

  renderMocksCount = count => {
    if (!count) {
      return 'No requests'
    }

    if (count === 1) {
      return '1 Request'
    }

    return `${count} Requests`
  }

  render() {
    if (Object.keys(this.state.groupedMocks).length === 0) {
      return null
    }

    return (
      <React.Fragment>
        <ul className="mockGroups">
          {Object.keys(this.state.groupedMocks).map((groupName, i) => (
            <li key={groupName}>
              <div
                className={classnames('mockGroupTitle', {
                  'mockGroupTitle--isClosed': !this.state.groupedMocks[groupName].isOpen,
                  'mockGroupTitle--first': i === 0,
                })}
                onClick={() => this.toggleIsOpen(groupName)}
              >
                <i
                  className={classnames('far', 'folderIcon', {
                    'fa-folder-open': this.state.groupedMocks[groupName].isOpen,
                    'fa-folder': !this.state.groupedMocks[groupName].isOpen,
                  })}
                  title="Toggle group"
                />
                <div className="groupInfo">
                  {groupName}
                  <div className="mocksCount">
                    {this.renderMocksCount(this.state.groupedMocks[groupName].mocks.length)}
                  </div>
                </div>
              </div>
              {this.state.groupedMocks[groupName].isOpen && (
                <ul className="mockList">
                  {this.state.groupedMocks[groupName].mocks.sort(descriptionSorter).map(mock => (
                    <li
                      key={mock.id}
                      className={classnames('mockItem', {
                        'mockItem--selected': mock.id === this.props.selectedMockId,
                      })}
                      onClick={() => this.props.onMockClick(mock)}
                    >
                      <span className="method">
                        <HttpMethod name={mock.method} />
                      </span>
                      <span className="description" title={mock.description}>
                        {mock.description}
                      </span>
                      <span className="controls">
                        <i
                          className="far fa-copy cloneButton"
                          title="Clone mock"
                          onClick={e => this.onMockClone(e, mock.id)}
                        />
                        <i
                          className="far fa-trash-alt deleteButton"
                          title="Delete mock"
                          onClick={e => this.onMockDelete(e, mock.id)}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <style jsx>{`
          .mockGroups {
            margin: 0 10px;
            list-style-type: none;
            padding-left: 0;
            font-size: 15px;
          }
          .mockGroupTitle {
            cursor: pointer;
            width: 100%;
            padding: 10px 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            user-select: none;
            display: flex;
            align-items: center;
          }
          .mockGroupTitle--first {
            border-top: 0;
          }
          .mockGroupTitle--isClosed {
            box-shadow: none;
            border-bottom: none;
          }
          .groupInfo {
            padding-left: 5px;
          }
          .mocksCount {
            font-size: 12px;
            color: dimgray;
          }
          .folderIcon {
            margin-right: 5px;
            color: dimgray;
          }
          .folderIcon.fa-folder {
            margin-right: 7px;
          }
          .mockList {
            padding-left: 10px;
            box-shadow: inset 0 20px 10px -20px rgba(0, 0, 0, 0.17);
          }
          .mockItem {
            height: 30px;
            display: flex;
            align-items: center;
            padding: 5px 5px 5px 5px;
            position: relative;
          }
          .mockItem:hover {
            background-color: whitesmoke;
            cursor: pointer;
            padding-right: 42px;
          }
          .mockItem:hover .controls {
            visibility: visible;
            background-color: whitesmoke;
          }
          .mockItem--selected {
            background-color: gainsboro;
            border-radius: 3px;
            padding-right: 42px;
          }
          .mockItem--selected:hover {
            background-color: gainsboro;
          }
          .mockItem--selected .controls {
            visibility: visible;
            background-color: gainsboro;
          }
          .mockItem--selected:hover .controls {
            background-color: gainsboro;
          }
          .method {
            min-width: 40px;
            line-height: 13px;
          }
          .description {
            font-size: 13px;
            width: 200px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .controls {
            position: absolute;
            right: 10px;
            font-size: 12px;
            visibility: hidden;
            z-index: 1;
          }
          .deleteButton {
            color: salmon;
          }
          .cloneButton {
            color: gray;
            margin-right: 8px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default MockList
