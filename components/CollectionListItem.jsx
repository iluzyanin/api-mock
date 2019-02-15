import { useState } from 'react'
import classnames from 'classnames'
import { withPreventDefault } from '../utils/utils'
import MockListItem from './MockListItem'

const CollectionListItem = React.memo(
  ({
    name,
    mocks,
    selectedMockId,
    onMockClick,
    onMockCreate,
    onMockClone,
    onMockDelete,
    onCollectionDelete,
  }) => {
    const [isOpen, setIsOpen] = useState(true)
    const toggleOpenState = () => setIsOpen(!isOpen)
    const renderMocksCount = () => {
      const count = mocks.length
      if (!count) {
        return 'No mocks'
      }

      if (count === 1) {
        return '1 mock'
      }

      return `${count} mocks`
    }

    return (
      <React.Fragment>
        <li>
          <div className="collectionTitle" onClick={toggleOpenState}>
            <i
              className={classnames('fas', 'folderIcon', {
                'fa-folder': !isOpen,
                'fa-folder-open': isOpen,
              })}
              title="Toggle group"
            />
            <div className="collectionInfo">
              {name}
              <div className="mocksCount">{renderMocksCount()}</div>
            </div>
            <span className="controls">
              <i
                className="far fa-file createButton"
                title="Add mock"
                onClick={withPreventDefault(onMockCreate)}
              />
              <i
                className="far fa-trash-alt deleteButton"
                title="Add mock"
                onClick={withPreventDefault(onCollectionDelete)}
              />
            </span>
          </div>
          {isOpen && (
            <ul className="mockList">
              {mocks.map(mock => (
                <MockListItem
                  key={mock.id}
                  method={mock.method}
                  description={mock.description}
                  isSelected={mock.id === selectedMockId}
                  onClick={() => onMockClick(mock.id)}
                  onClone={() => onMockClone(mock.id)}
                  onDelete={() => onMockDelete(mock.id)}
                />
              ))}
            </ul>
          )}
        </li>
        <style jsx>{`
          .collectionTitle {
            cursor: pointer;
            width: 100%;
            padding: 10px 0 10px 10px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            user-select: none;
            display: flex;
            align-items: center;
            position: relative;
          }
          .collectionTitle--first {
            border-top: 0;
            border-bottom: 0;
          }
          .collectionInfo {
            padding-left: 5px;
            padding-right: 45px;
            width: 100%;
          }
          .controls {
            position: absolute;
            right: 10px;
            display: flex;
          }
          .deleteButton {
            color: tomato;
            opacity: 0.5;
          }
          .deleteButton:hover {
            opacity: 1;
          }
          .createButton {
            margin-right: 8px;
            opacity: 0.5;
          }
          .createButton:hover {
            opacity: 1;
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
        `}</style>
      </React.Fragment>
    )
  }
)

export default CollectionListItem
