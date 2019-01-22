import React from 'react'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'
import JSONInput from 'react-json-editor-ajrm'
import locale from 'react-json-editor-ajrm/locale/en'

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
      enabled: true,
    }
    // let state = { mock: defaultMock }
    // if (typeof props.mock !== 'undefined') {
    //   Object.assign(state, { mock: props.mock })
    // }
    this.state = {
      mock: typeof props.mock !== 'undefined' ? props.mock : defaultMock,
    }
    this.dataJs = JSON.parse(JSON.stringify(this.state.mock.data)) // TODO: deep clone
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

  handleJsonChange = ({ jsObject, error }) => {
    if (!error) {
      this.setState(
        prevState => ({
          mock: {
            ...prevState.mock,
            data: jsObject,
          },
        }),
        this.saveChanges
      )
    }
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
    const enabled = event.target.checked
    this.setState(prevState => ({
      mock: {
        ...prevState.mock,
        enabled,
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
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <select
                className="form-control"
                value={this.state.mock.method}
                onChange={this.handleMethodChange}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
              <span className="input-group-text">http://localhost:3030</span>
            </div>
            <input
              className="form-control"
              type="text"
              value={this.state.mock.url}
              onChange={this.handleUrlChange}
            />
          </div>
          <div className="form-group">
            <label className="col-sm-2" htmlFor="description">
              Description
            </label>
            <div className="col-sm-10">
              <input
                id="description"
                className="form-control"
                type="text"
                value={this.state.mock.description}
                onChange={this.handleDescriptionChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2" htmlFor="status">
              Status
            </label>
            <div className="col-sm-10">
              <select
                id="status"
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
          </div>
          <div className="form-group">
            <label className="col-sm-2" htmlFor="delay">
              Delay, ms
            </label>
            <div className="col-sm-10">
              <input
                id="delay"
                className="form-control"
                type="text"
                value={this.state.mock.delay}
                onChange={this.handleDelayChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2" htmlFor="enabled">
              Enabled
            </label>
            <div className="col-sm-10">
              <input
                id="enabled"
                type="checkbox"
                value=""
                checked={this.state.mock.enabled}
                onChange={this.handleEnabledChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2" htmlFor="proxy">
              Proxy url
            </label>
            <div className="col-sm-10">
              <input
                id="proxy"
                className="form-control"
                type="text"
                value={this.state.mock.proxyUrl}
                onChange={this.handleProxyUrlChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2" htmlFor="json">
              Return Json
            </label>
            <div className="col-sm-10">
              <JSONInput
                locale={locale}
                placeholder={this.dataJs}
                theme="light_mitsuketa_tribute"
                width="100%"
                reset={false}
                confirmGood={false}
                onChange={this.handleJsonChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-1">
              <button
                className="btn btn-default"
                type="button"
                onClick={this.handleGoToMain}
              >
                Back
              </button>
            </div>
          </div>
        </form>
        <style jsx>{`
          .mockForm {
            margin: 10px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default MockForm
