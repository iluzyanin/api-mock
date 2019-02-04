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

  render() {
    if (Object.keys(this.state.groupedMocks).length === 0) {
      return null
    }

    return (
      <React.Fragment>
        <ul className="mockGroups">
          {Object.keys(this.state.groupedMocks).map(groupName => (
            <li key={groupName}>
              <i
                className={classnames('far', 'folderIcon', {
                  'fa-folder-open': this.state.groupedMocks[groupName].isOpen,
                  'fa-folder': !this.state.groupedMocks[groupName].isOpen,
                })}
                title="Toggle group"
                onClick={() => this.toggleIsOpen(groupName)}
              />
              {groupName}
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
            margin: 10px;
            list-style-type: none;
            padding-left: 0;
            font-size: 15px;
          }
          .folderIcon {
            margin-right: 5px;
            color: dimgray;
            cursor: pointer;
          }
          .folderIcon.fa-folder {
            margin-right: 7px;
          }
          .mockList {
            margin: 10px;
            padding-left: 10px;
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
