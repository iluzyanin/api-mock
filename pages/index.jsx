import fetch from 'isomorphic-unfetch'
import SplitPane from 'react-split-pane'
import Pane from 'react-split-pane/lib/Pane'

import Layout from '../components/Layout'
import MockList from '../components/MockList'
import MockForm from '../components/MockForm'
import SaveNotification from '../components/SaveNotification'

class Index extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      mocks: [],
      saveStatusVisible: false,
      selectedMockId: null,
    }
  }

  async componentDidMount() {
    await this.fetchMocks()
    this.setState({
      selectedMockId: this.state.mocks[0].id,
    })
  }

  async fetchMocks() {
    const res = await fetch(`/mocks`)
    const data = await res.json()

    this.setState({ mocks: data })
  }

  createMock = async mock => {
    const newMock = mock || {
      url: '',
      method: 'GET',
      description: 'New mock',
      data: {},
      status: 200,
      delay: 0,
      proxyUrl: '',
      proxyEnabled: false,
      headers: {},
    }

    const response = await fetch('/mocks', {
      body: JSON.stringify(newMock),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    })
    const newMockId = response.headers.get('Location')

    await this.fetchMocks()
    this.setState({
      selectedMockId: newMockId,
    })
  }

  onMocksChange = async () => {
    await this.fetchMocks()
    this.setState({
      saveStatusVisible: true,
    })
    setTimeout(() => {
      this.setState({
        saveStatusVisible: false,
      })
    }, 500)
  }

  handleOnMockClone = async mockId => {
    const mock = this.state.mocks.find(m => m.id === mockId)
    const clonedMock = {
      ...mock,
      id: undefined,
      description: `${mock.description} COPY`,
    }
    await this.createMock(clonedMock)
  }

  handleOnMockDelete = async mockId => {
    await fetch(`/mocks/${mockId}`, { method: 'DELETE' })
    await this.fetchMocks()
    if (this.state.selectedMockId === mockId) {
      this.setState({
        selectedMockId: this.state.mocks[0].id,
      })
    }
  }

  handleOnMockClick = selectedMock => {
    this.setState({
      selectedMockId: selectedMock.id,
    })
  }

  getSelectedMock = () => this.state.mocks.find(mock => mock.id === this.state.selectedMockId)

  render() {
    return (
      <Layout>
        <SplitPane split="vertical">
          <Pane maxSize="300px">
            <span className="newMock" onClick={() => this.createMock()}>
              <i className="far fa-plus-square" /> New mock
            </span>
            <hr className="splitLine" />
            <MockList
              mocks={this.state.mocks}
              onMockClick={this.handleOnMockClick}
              onMockClone={this.handleOnMockClone}
              onMockDelete={this.handleOnMockDelete}
              selectedMockId={this.state.selectedMockId}
            />
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
        `}</style>
      </Layout>
    )
  }
}

export default Index
