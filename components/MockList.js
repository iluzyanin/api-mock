import fetch from 'isomorphic-unfetch'
import SplitPane from 'react-split-pane'
import Pane from 'react-split-pane/lib/Pane'

import MockForm from './MockForm'
import HttpMethod from './HttpMethod'

class MockList extends React.PureComponent {
  constructor(props) {
    super(props)

    this.deleteMock = this.deleteMock.bind(this)
    this.state = {
      selectedMockId: null,
      selectedMock: null,
    }
  }

  handleOnMockClick = selectedMock => {
    this.setState(state => ({
      ...state,
      selectedMock,
    }))
  }

  async cloneMock(mock) {
    const clonedMock = {
      ...mock,
      id: undefined,
      description: `${mock.description} COPY`,
    }
    await fetch('/mocks', {
      body: JSON.stringify(clonedMock),
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
    })
    await this.props.onMocksChange()
  }

  async deleteMock(mockId) {
    await fetch(`/mocks/${mockId}`, { method: 'DELETE' })
    await this.props.onMocksChange()
  }

  descriptionSorter(mockA, mockB) {
    if (!mockA.description) {
      return 1
    }
    return mockA.description.localeCompare(mockB.description)
  }

  render() {
    return (
      <React.Fragment>
        <SplitPane split="vertical">
          <Pane minSize="150px" maxSize="300px">
            <table className="mockTable">
              <tbody>
                {this.props.mocks.sort(this.descriptionSorter).map(mock => (
                  <tr
                    key={mock.id}
                    className="mockRow"
                    onClick={() => this.handleOnMockClick(mock)}
                  >
                    <td width="70">
                      <HttpMethod
                        name={mock.method}
                        isDisabled={!mock.enabled}
                      />
                    </td>
                    <td>
                      <span className="description">{mock.description}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Pane>
          <Pane className="pane">
            {this.state.selectedMock && (
              <MockForm
                key={this.state.selectedMock.id}
                mock={this.state.selectedMock}
              />
            )}
          </Pane>
        </SplitPane>
        <style jsx>{`
          .mockTable {
            margin: 10px;
          }
          .mockRow {
            height: 30px;
          }
          .description {
            font-family: Geneva, Verdana, sans-serif;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default MockList
