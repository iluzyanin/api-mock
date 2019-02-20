import { useState } from 'react'
import MockListItem from './MockListItem'
import CollectionTitle from './CollectionTitle'

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
    const toggleOpenState = () => setIsOpen(!isOpen)

    return (
      <React.Fragment>
        <li className="collectionListItem">
          <CollectionTitle
            isOpen={isOpen}
            name={name}
            mocks={mocks}
            onClick={toggleOpenState}
            onEdit={onCollectionEdit}
            onDelete={onCollectionDelete}
            onMockCreate={onMockCreate}
          />
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
