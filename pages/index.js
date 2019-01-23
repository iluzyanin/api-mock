import fetch from 'isomorphic-unfetch'
import SplitPane from 'react-split-pane'
import Pane from 'react-split-pane/lib/Pane'

import Layout from '../components/MyLayout'
import MockList from '../components/MockList'
import MockForm from '../components/MockForm'

class Index extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      mocks: [],
      selectedMock: null,
    }
  }

  async componentDidMount() {
    await this.fetchMocks()
  }

  async fetchMocks() {
    const res = await fetch(`/mocks`)
    const data = await res.json()

    this.setState({ mocks: data })
  }

  onMocksChange = async () => {
    await this.fetchMocks()
  }

  handleOnMockClick = selectedMock => {
    this.setState(state => ({
      ...state,
      selectedMock,
    }))
  }

  render() {
    return (
      <Layout>
        <SplitPane split="vertical">
          <Pane minSize="150px" maxSize="300px">
            <MockList
              mocks={this.state.mocks}
              onMocksChange={this.onMocksChange}
              onMockClick={this.handleOnMockClick}
            />
          </Pane>
          <Pane>
            {this.state.selectedMock && (
              <MockForm
                key={this.state.selectedMock.id}
                mock={this.state.selectedMock}
              />
            )}
          </Pane>
        </SplitPane>
      </Layout>
    )
  }
}

export default Index
