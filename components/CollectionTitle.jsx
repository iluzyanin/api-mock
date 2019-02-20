import { useState } from 'react'
import classnames from 'classnames'
import { withPreventDefault } from '../utils/utils'

const CollectionTitle = React.memo(
  ({ isOpen, name, mocks, onClick, onEdit, onDelete, onMockCreate }) => {
    const [nameRef] = useState(React.createRef())
    const [isEditable, setIsEditable] = useState(false)
    const [collectionName, setCollectionName] = useState(name)
    const onEditCollectionClick = () => {
      setIsEditable(!isEditable)
      setTimeout(() => {
        if (!isEditable) {
          nameRef.current.focus()
        }
      })
    }

    const handleCollectionNameChange = e => {
      setCollectionName(e.target.value)
    }

    const handleKeyDown = e => {
      if (e.key === 'Enter') {
        if (!collectionName) {
          resetCollectionName()
          return
        }
        onEdit(collectionName)
        setTimeout(() => setIsEditable(false), 100)
      }
      if (e.key === 'Escape') {
        setIsEditable(false)
      }
    }

    const resetCollectionName = () => {
      setIsEditable(false)
      setCollectionName(name)
    }

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
        <div className="collectionTitle" onClick={onClick}>
          <i
            className={classnames('fas', 'folderIcon', {
              'fa-folder': !isOpen,
              'fa-folder-open': isOpen,
            })}
            title="Toggle group"
          />
          <div className="collectionInfo">
            {!isEditable && <span className="collectionName">{name}</span>}
            {isEditable && (
              <div onClick={withPreventDefault(() => {})}>
                <input
                  ref={nameRef}
                  value={collectionName}
                  onChange={handleCollectionNameChange}
                  onBlur={resetCollectionName}
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
              onClick={withPreventDefault(onDelete)}
            />
          </span>
        </div>
        <style jsx>{`
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
          .collectionName {
            border-top: 2px solid transparent;
            border-bottom: 2px solid transparent;
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
        `}</style>
      </React.Fragment>
    )
  }
)

export default CollectionTitle
