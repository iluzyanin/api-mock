import fetch from 'isomorphic-unfetch'
import SplitPane from 'react-split-pane'
import Pane from 'react-split-pane/lib/Pane'

import Layout from '../components/Layout'
import CollectionListItem from '../components/CollectionListItem'
import MockForm from '../components/MockForm'
import SaveNotification from '../components/SaveNotification'

class Index extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      collections: [],
      saveStatusVisible: false,
      selectedMockId: null,
      selectedCollectionId: null,
    }
  }

  async componentDidMount() {
    await this.fetchCollections()
    this.setSelectedMock()
  }

  setSelectedMock() {
    return this.state.collections.some(collection => {
      if (collection.mocks.length > 0) {
        this.setState({
          selectedCollectionId: collection.id,
          selectedMockId: collection.mocks[0].id,
        })
        return true
      }
      return false
    })
  }

  async fetchCollections() {
    const res = await fetch(`/collections`)
    const collections = await res.json()

    this.setState({ collections })
  }

  showSaveStatus = () => {
    this.setState({
      saveStatusVisible: true,
    })
    setTimeout(() => {
      this.setState({
        saveStatusVisible: false,
      })
    }, 500)
  }

  onMocksChange = async (collectionId, mock) => {
    await fetch(`/collections/${collectionId}/mocks/${mock.id}`, {
      body: JSON.stringify(mock),
      headers: {
        'content-type': 'application/json',
      },
      method: 'PUT',
    })
    await this.fetchCollections()
    this.showSaveStatus()
  }

  handleOnCollectionCreate = async () => {
    await fetch('/collections', { method: 'POST' })
    await this.fetchCollections()
  }

  handleOnCollectionEdit = async (collectionId, newName) => {
    await fetch(`/collections/${collectionId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ name: newName }),
    })
    await this.fetchCollections()
  }

  handleOnCollectionDelete = async collectionId => {
    await fetch(`/collections/${collectionId}`, { method: 'DELETE' })
    await this.fetchCollections()
  }

  handleOnMockCreate = async collectionId => {
    const response = await fetch(`/collections/${collectionId}/mocks`, {
      method: 'POST',
    })
    const newMockId = response.headers.get('Location')
    if (newMockId) {
      await this.fetchCollections()
      this.setState({
        selectedCollectionId: collectionId,
        selectedMockId: newMockId,
      })
    }
  }

  handleOnMockClone = async (collectionId, mockId) => {
    const response = await fetch(`/collections/${collectionId}/mocks/${mockId}`, {
      method: 'POST',
    })
    const newMockId = response.headers.get('Location')
    if (newMockId) {
      await this.fetchCollections()
      this.setState({
        selectedCollectionId: collectionId,
        selectedMockId: newMockId,
      })
    }
  }

  handleOnMockDelete = async (collectionId, mockId) => {
    await fetch(`/collections/${collectionId}/mocks/${mockId}`, { method: 'DELETE' })
    await this.fetchCollections()
    if (this.state.selectedMockId === mockId) {
      if (this.state.collections.length > 0) {
        const currentCollection = this.state.collections.find(
          c => c.id === this.state.selectedCollectionId
        )
        if (currentCollection.mocks.length > 0) {
          this.setState({
            selectedMockId: currentCollection.mocks[0].id,
          })
          return
        }
        if (this.setSelectedMock()) {
          return
        }
      }
      this.setState({
        selectedCollectionId: null,
        selectedMockId: null,
      })
    }
  }

  handleOnMockClick = (collectionId, mockId) => {
    this.setState({ selectedMockId: mockId, selectedCollectionId: collectionId })
  }

  handleOnMockMove = async (mockId, oldCollectionId, newCollectionId) => {
    await fetch(`/collections/${oldCollectionId}/mocks/${mockId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ newCollectionId }),
    })

    this.showSaveStatus()
    await this.fetchCollections()
    this.setState({ selectedCollectionId: newCollectionId })
  }

  getSelectedMock = () =>
    [].concat
      .apply([], this.state.collections.map(c => c.mocks))
      .find(mock => mock.id === this.state.selectedMockId)

  getCollections = () =>
    this.state.collections.map(({ id, name }) => ({
      id,
      name,
    }))

  render() {
    return (
      <Layout>
        <SplitPane split="vertical">
          <Pane maxSize="300px">
            <div className="newMock" onClick={this.handleOnCollectionCreate}>
              <i className="fas fa-folder-plus" /> New collection
            </div>
            {this.state.collections && this.state.collections.length > 0 && (
              <ul className="collections">
                {this.state.collections.map(collection => (
                  <CollectionListItem
                    key={collection.id}
                    name={collection.name}
                    mocks={collection.mocks}
                    selectedMockId={this.state.selectedMockId}
                    onMockClick={mockId => this.handleOnMockClick(collection.id, mockId)}
                    onMockCreate={() => this.handleOnMockCreate(collection.id)}
                    onMockClone={mockId => this.handleOnMockClone(collection.id, mockId)}
                    onMockDelete={mockId => this.handleOnMockDelete(collection.id, mockId)}
                    onCollectionEdit={newName =>
                      this.handleOnCollectionEdit(collection.id, newName)
                    }
                    onCollectionDelete={() => this.handleOnCollectionDelete(collection.id)}
                  />
                ))}
              </ul>
            )}
          </Pane>
          <Pane>
            {this.state.selectedMockId && (
              <MockForm
                key={this.state.selectedMockId}
                collectionId={this.state.selectedCollectionId}
                collections={this.getCollections()}
                mock={this.getSelectedMock()}
                onChange={mock => this.onMocksChange(this.state.selectedCollectionId, mock)}
                onMockMove={newCollectionId =>
                  this.handleOnMockMove(
                    this.state.selectedMockId,
                    this.state.selectedCollectionId,
                    newCollectionId
                  )
                }
              />
            )}
          </Pane>
        </SplitPane>
        <SaveNotification visible={this.state.saveStatusVisible} />
        <style jsx>{`
          .newMock {
            color: cornflowerblue;
            margin-left: 10px;
            margin-bottom: 10px;
          }
          .newMock:hover {
            cursor: pointer;
          }
          .collections {
            list-style-type: none;
            padding-left: 0;
            font-size: 15px;
            border-left: 1px solid whitesmoke;
          }
        `}</style>
      </Layout>
    )
  }
}

export default Index
