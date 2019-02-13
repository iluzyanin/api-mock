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
      groupOpenStates: [],
    }
  }

  onMockDelete = (e, groupId, mockId) => {
    e.preventDefault()
    e.stopPropagation()
    this.props.onMockDelete(groupId, mockId)
  }

  onMockClone = (e, groupId, mockId) => {
    e.preventDefault()
    e.stopPropagation()
    this.props.onMockClone(groupId, mockId)
  }

  toggleIsOpen = groupId => {
    this.setState(prevState => ({
      groupOpenStates: {
        ...prevState.groupOpenStates,
        [groupId]: {
          isOpen: prevState.groupOpenStates[groupId]
            ? !prevState.groupOpenStates[groupId].isOpen
            : false,
        },
      },
    }))
  }

  renderMocksCount = count => {
    if (!count) {
      return 'No mocks'
    }

    if (count === 1) {
      return '1 mock'
    }

    return `${count} mocks`
  }

  render() {
    if (!this.props.groupedMocks || this.props.groupedMocks.length === 0) {
      return null
    }

    return (
      <React.Fragment>
        <ul className="mockGroups">
          {this.props.groupedMocks.map((group, i) => (
            <li key={group.id}>
              <div
                className={classnames('mockGroupTitle', {
                  'mockGroupTitle--isClosed':
                    this.state.groupOpenStates[group.id] &&
                    !this.state.groupOpenStates[group.id].isOpen,
                  'mockGroupTitle--first': i === 0,
                })}
                onClick={() => this.toggleIsOpen(group.id)}
              >
                <i
                  className={classnames('fas', 'folderIcon', {
                    'fa-folder-open':
                      !this.state.groupOpenStates[group.id] ||
                      this.state.groupOpenStates[group.id].isOpen,
                    'fa-folder': !this.state.groupOpenStates[group.id].isOpen,
                  })}
                  title="Toggle group"
                />
                <div className="groupInfo">
                  {group.name}
                  <div className="mocksCount">{this.renderMocksCount(group.mocks.length)}</div>
                </div>
              </div>
              {this.state.groupOpenStates[group.id].isOpen && (
                <ul className="mockList">
                  {group.mocks.sort(descriptionSorter).map(mock => (
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
            list-style-type: none;
            padding-left: 0;
            font-size: 15px;
            border-left: 1px solid whitesmoke;
          }
          .mockGroupTitle {
            cursor: pointer;
            width: 100%;
            padding: 10px 0 10px 10px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            user-select: none;
            display: flex;
            align-items: center;
          }
          .mockGroupTitle--first {
            border-top: 0;
            border-bottom: 0;
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
            padding-left: 0;
            box-shadow: inset 0 20px 10px -20px rgba(0, 0, 0, 0.17);
          }
          .mockItem {
            height: 30px;
            display: flex;
            align-items: center;
            padding: 5px 5px 5px 10px;
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
