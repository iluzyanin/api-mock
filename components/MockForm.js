import React from 'react'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import dynamic from 'next/dynamic'

const JSONEditor = dynamic(import('./JSONEditor'), {
  ssr: false,
})

class MockForm extends React.PureComponent {
  constructor(props) {
    super(props)
    const defaultMock = {
      url: '',
      method: 'GET',
      description: '',
      data: {},
      status: 200,
      delay: 0,
      proxyUrl: '',
      proxyEnabled: false,
    }

    this.state = {
      mock: props.mock || defaultMock,
      isJsonValid: true,
    }
    this.state.dataJson = JSON.stringify(this.state.mock.data, null, 2)
    this.debounceTimeout = null
  }

  debouncedUpdate() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout)
    }

    this.debounceTimeout = setTimeout(() => {
      this.saveChanges()
    }, 500)
  }

  handleUrlChange = event => {
    const url = event.target.value.trim()
    this.setState(
      prevState => ({
        mock: {
          ...prevState.mock,
          url,
        },
      }),
      this.debouncedUpdate
    )
  }

  handleDescriptionChange = event => {
    const description = event.target.value
    this.setState(
      prevState => ({
        mock: {
          ...prevState.mock,
          description,
        },
      }),
      this.debouncedUpdate
    )
  }

  handleMethodChange = event => {
    const method = event.target.value
    this.setState(
      prevState => ({
        mock: {
          ...prevState.mock,
          method,
        },
      }),
      this.saveChanges
    )
  }

  handleJsonChange = dataJson => {
    this.setState({
      dataJson,
    })
  }

  handleJsonValidate = annotations => {
    this.setState({ isJsonValid: annotations.length === 0 })
  }

  handleStatusChange = event => {
    const status = event.target.value
    this.setState(
      prevState => ({
        mock: {
          ...prevState.mock,
          status: status,
        },
      }),
      this.saveChanges
    )
  }

  handleDelayChange = event => {
    const delay = event.target.value.trim()
    this.setState(
      prevState => ({
        mock: {
          ...prevState.mock,
          delay,
        },
      }),
      this.debouncedUpdate
    )
  }

  handleEnabledChange = event => {
    const proxyEnabled = event.target.checked
    this.setState(prevState => ({
      mock: {
        ...prevState.mock,
        proxyEnabled,
      },
    }))
  }

  handleProxyUrlChange = event => {
    const proxyUrl = event.target.value.trim()
    this.setState(prevState => ({
      mock: {
        ...prevState.mock,
        proxyUrl,
      },
    }))
  }

  handleGoToMain() {
    Router.push('/', '/ui')
  }

  saveChanges() {
    const mock = this.state.mock
    const hasId = typeof mock.id !== 'undefined'
    const delay = mock.delay ? parseInt(mock.delay) : 0
    const status = parseInt(mock.status)
    return fetch(`/mocks${hasId ? `/${mock.id}` : ''}`, {
      body: JSON.stringify({ ...mock, delay, status }),
      headers: {
        'content-type': 'application/json',
      },
      method: hasId ? 'PUT' : 'POST',
    }).then(response => {
      if (hasId) {
        return
      }

      this.setState(state => ({
        mock: {
          ...state.mock,
          id: response.headers.get('Location'),
        },
      }))
    })
  }

  render() {
    return (
      <React.Fragment>
        <form className="form-horizontal mockForm">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Description</span>
            </div>
            <input
              className="form-control"
              type="text"
              value={this.state.mock.description}
              onChange={this.handleDescriptionChange}
            />
          </div>
          <div className="input-group">
            <div className="input-group-prepend">
              <select
                className="form-control httpMethod"
                value={this.state.mock.method}
                onChange={this.handleMethodChange}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
              <span className="input-group-text fixedInput">
                http://localhost:3030
              </span>
            </div>
            <input
              className="form-control urlInput"
              type="text"
              value={this.state.mock.url}
              onChange={this.handleUrlChange}
            />
          </div>
          <div className="input-group-container">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Status</span>
              </div>
              <select
                className="form-control"
                value={this.state.mock.status}
                onChange={this.handleStatusChange}
              >
                <option value="200">200 OK</option>
                <option value="201">201 Created</option>
                <option value="204">204 No content</option>
                <option value="400">400 Bad Request</option>
                <option value="401">401 Unauthorized</option>
                <option value="403">403 Forbidden</option>
                <option value="404">404 Not Found</option>
                <option value="500">500 Internal Server Error</option>
                <option value="504">504 Gateway Timeout</option>
              </select>
            </div>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Delay, ms</span>
              </div>
              <input
                className="form-control"
                type="text"
                value={this.state.mock.delay}
                onChange={this.handleDelayChange}
              />
            </div>
          </div>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Proxy url</span>
              <div className="input-group-text" title="Enabled">
                <input
                  type="checkbox"
                  value=""
                  checked={this.state.mock.proxyEnabled}
                  onChange={this.handleEnabledChange}
                />
              </div>
            </div>
            <input
              className="form-control urlInput"
              type="text"
              value={this.state.mock.proxyUrl}
              onChange={this.handleProxyUrlChange}
              disabled={!this.state.mock.proxyEnabled}
            />
          </div>
          <div className="input-group">
            <JSONEditor
              id="jsonEditor"
              value={this.state.dataJson}
              onChange={this.handleJsonChange}
              onValidate={this.handleJsonValidate}
            />
          </div>
        </form>
        <style jsx>{`
          .mockForm {
            margin: 10px;
          }
          .input-group {
            margin-bottom: 10px;
          }
          .urlInput {
            text-overflow: ellipsis;
          }
          .httpMethod {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          .fixedInput {
            background-color: ghostwhite;
            cursor: default;
            border-left: none;
          }
          .input-group-container .input-group {
            width: 49%;
          }
          .input-group-container {
            display: flex;
            justify-content: space-between;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default MockForm
