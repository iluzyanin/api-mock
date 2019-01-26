import classnames from 'classnames'
import HttpMethod from './HttpMethod'

const descriptionSorter = (mockA, mockB) => {
  if (!mockA.description) {
    return 1
  }

  return mockA.description.localeCompare(mockB.description)
}

const MockList = React.memo(props => {
  const onMockDelete = (e, mockId) => {
    e.preventDefault()
    e.stopPropagation()
    props.onMockDelete(mockId)
  }

  const onMockClone = (e, mockId) => {
    e.preventDefault()
    e.stopPropagation()
    props.onMockClone(mockId)
  }

  return (
    <React.Fragment>
      <ul className="mockList">
        {props.mocks.sort(descriptionSorter).map(mock => (
          <li
            key={mock.id}
            className={classnames('mockItem', {
              'mockItem--selected': mock.id === props.selectedMockId,
            })}
            onClick={() => props.onMockClick(mock)}
          >
            <span className="method">
              <HttpMethod name={mock.method} />
            </span>
            <span className="description" title={mock.description}>
              {mock.description}
            </span>
            <span className="controls">
              <span
                className="cloneButton"
                onClick={e => onMockClone(e, mock.id)}
              >
                <i className="far fa-copy" title="Clone mock" />
              </span>
              <span
                className="deleteButton"
                onClick={e => onMockDelete(e, mock.id)}
              >
                <i className="far fa-trash-alt" title="Delete mock" />
              </span>
            </span>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .mockList {
          margin: 10px;
          list-style-type: none;
          padding-left: 0;
        }
        .mockItem {
          height: 30px;
          display: flex;
          align-items: center;
          padding: 5px;
          position: relative;
        }
        .mockItem:hover {
          background-color: whitesmoke;
          cursor: pointer;
        }
        .mockItem:hover .controls {
          visibility: visible;
        }
        .mockItem--selected {
          background-color: gainsboro;
          border-radius: 3px;
        }
        .mockItem--selected:hover {
          background-color: gainsboro;
        }
        .mockItem--selected .controls {
          visibility: visible;
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
})

export default MockList
