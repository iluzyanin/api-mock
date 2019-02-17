import { useState } from 'react'
import classnames from 'classnames'
import { withPreventDefault } from '../utils/utils'
import MockListItem from './MockListItem'
import ContentEditable from 'react-contenteditable'

const CollectionListItem = React.memo(
  ({
    name,
    mocks,
    selectedMockId,
    onMockClick,
    onMockCreate,
    onMockClone,
    onMockDelete,
    onCollectionEdit,
    onCollectionDelete,
  }) => {
    const [isOpen, setIsOpen] = useState(true)
    const [isEditable, setIsEditable] = useState(false)
    const [nameRef, setNameRef] = useState(React.createRef())
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

    const onEditCollectionClick = () => {
      setIsEditable(!isEditable)
      setTimeout(() => {
        if (!isEditable) {
          nameRef.current.focus()
        }
      })
    }

    const handleCollectionNameChange = e => {
      onCollectionEdit(e.target.innerText)
      setTimeout(() => setIsEditable(false), 100)
    }

    const handleKeyDown = e => {
      if (e.key === 'Enter') {
        nameRef.current.blur()
      }
    }

    return (
      <React.Fragment>
        <li className="collectionListItem">
          <div className="collectionTitle" onClick={toggleOpenState}>
            <i
              className={classnames('fas', 'folderIcon', {
                'fa-folder': !isOpen,
                'fa-folder-open': isOpen,
              })}
              title="Toggle group"
            />
            <div className="collectionInfo">
              {!isEditable && name}
              {isEditable && (
                <div onClick={withPreventDefault(() => {})}>
                  <ContentEditable
                    innerRef={nameRef}
                    html={name}
                    onBlur={handleCollectionNameChange}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              )}
              <div className="mocksCount">{renderMocksCount()}</div>
            </div>
            <span className="controls">
              <i
                className="far fa-edit controlButton"
                title="Edit collection name"
                onClick={withPreventDefault(onEditCollectionClick)}
              />
              <i
                className="far fa-file controlButton"
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
          .collectionListItem {
            border-top: 1px solid rgba(0, 0, 0, 0.1);
          }
          .collectionListItem:last-of-type {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          }
          .collectionTitle {
            cursor: pointer;
            width: 100%;
            padding: 10px 0 10px 10px;
            user-select: none;
            display: flex;
            align-items: center;
            position: relative;
          }
          .collectionTitle:hover .controls {
            visibility: visible;
          }
          .collectionInfo {
            padding-left: 5px;
            padding-right: 75px;
            width: 100%;
          }
          .controls {
            position: absolute;
            right: 10px;
            display: flex;
            visibility: hidden;
            z-index: 1;
          }
          .deleteButton {
            color: tomato;
            opacity: 0.5;
          }
          .deleteButton:hover {
            opacity: 1;
          }
          .controlButton {
            margin-right: 8px;
            opacity: 0.5;
          }
          .controlButton:hover {
            opacity: 1;
          }
          .mocksCount {
            font-size: 12px;
            color: dimgray;
          }
          .folderIcon {
            width: 22px;
            color: dimgray;
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
