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
    }
  }

  async componentDidMount() {
    await this.fetchCollections()
    if (this.state.collections.length > 0 && this.state.collections[0].mocks.length > 0) {
      this.setState({
        selectedMockId: this.state.collections[0].mocks[0].id,
      })
    }
  }

  async fetchCollections() {
    const res = await fetch(`/collections`)
    const collections = await res.json()

    this.setState({ collections })
  }

  createMock = async mock => {
    // const newMock = mock || {
    //   url: '',
    //   method: 'GET',
    //   description: 'New mock',
    //   data: {},
    //   status: 200,
    //   delay: 0,
    //   proxyUrl: '',
    //   proxyEnabled: false,
    //   headers: {},
    // }
    // const response = await fetch('/mocks', {
    //   body: JSON.stringify(newMock),
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    //   method: 'POST',
    // })
    // const newMockId = response.headers.get('Location')
    // await this.fetchCollections()
    // this.setState({
    //   selectedMockId: newMockId,
    // })
  }

  onMocksChange = async () => {
    await this.fetchCollections()

    this.setState({
      saveStatusVisible: true,
    })
    setTimeout(() => {
      this.setState({
        saveStatusVisible: false,
      })
    }, 500)
  }

  handleOnMockClone = async (collectionId, mockId) => {
    const response = await fetch(`/collections/${collectionId}/mocks/${mockId}`, {
      method: 'POST',
    })
    const newMockId = response.headers.get('Location')
    if (newMockId) {
      await this.fetchCollections()
      this.setState({
        selectedMockId: newMockId,
      })
    }
  }

  handleOnMockDelete = async (collectionId, mockId) => {
    await fetch(`/collections/${collectionId}/mocks/${mockId}`, { method: 'DELETE' })
    await this.fetchCollections()
    if (this.state.selectedMockId === mockId) {
      if (this.state.collections.length > 0 && this.state.collections[0].mocks.length > 0) {
        this.setState({
          selectedMockId: this.state.collections[0].mocks[0].id,
        })
      } else {
        this.setState({
          selectedMockId: null,
        })
      }
    }
  }

  handleOnMockClick = mockId => {
    this.setState({ selectedMockId: mockId })
  }

  getSelectedMock = () =>
    [].concat
      .apply([], this.state.collections.map(c => c.mocks))
      .find(mock => mock.id === this.state.selectedMockId)

  render() {
    return (
      <Layout>
        <SplitPane split="vertical">
          <Pane maxSize="300px">
            <span className="newMock" onClick={() => this.createMock()}>
              <i className="fas fa-folder-plus" /> New collection
            </span>
            <hr className="splitLine" />
            {this.state.collections && this.state.collections.length > 0 && (
              <ul className="collections">
                {this.state.collections.map(collection => (
                  <CollectionListItem
                    key={collection.id}
                    name={collection.name}
                    mocks={collection.mocks}
                    selectedMockId={this.state.selectedMockId}
                    onMockClick={this.handleOnMockClick}
                    onMockClone={mockId => this.handleOnMockClone(collection.id, mockId)}
                    onMockDelete={mockId => this.handleOnMockDelete(collection.id, mockId)}
                  />
                ))}
              </ul>
            )}
          </Pane>
          <Pane>
            {this.state.selectedMockId && (
              <MockForm
                key={this.state.selectedMockId}
                mock={this.getSelectedMock()}
                onChange={this.onMocksChange}
              />
            )}
          </Pane>
        </SplitPane>
        <SaveNotification visible={this.state.saveStatusVisible} />
        <style jsx>{`
          .splitLine {
            margin-bottom: 0;
          }
          .newMock {
            color: cornflowerblue;
            margin-left: 10px;
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
