import classnames from 'classnames'
import HttpMethod from './HttpMethod'

const MockListItem = ({ method, description, isSelected, onClick, onClone, onDelete }) => {
  const withPreventDefault = handle => e => {
    e.preventDefault()
    e.stopPropagation()
    handle()
  }

  return (
    <React.Fragment>
      <li
        className={classnames('mockItem', {
          'mockItem--selected': isSelected,
        })}
        onClick={() => withPreventDefault(onClick)}
      >
        <span className="method">
          <HttpMethod name={method} />
        </span>
        <span className="description" title={description}>
          {description}
        </span>
        <span className="controls">
          <i
            className="far fa-copy cloneButton"
            title="Clone mock"
            onClick={withPreventDefault(onClone)}
          />
          <i
            className="far fa-trash-alt deleteButton"
            title="Delete mock"
            onClick={withPreventDefault(onDelete)}
          />
        </span>
      </li>
      <style jsx>{`
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

export default MockListItem
