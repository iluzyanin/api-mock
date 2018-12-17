import React from 'react';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import dynamic from 'next/dynamic';

const ReactJson = dynamic(
  import('react-json-view'),
  { ssr: false }
);

class MockForm extends React.PureComponent {
  constructor(props) {
    super(props);
    const defaultMock = {
      url: '',
      method: 'GET',
      data: undefined,
      status: 200,
      delay: 0,
      enabled: true
    };
    let state = { mock: defaultMock };
    if (typeof props.mock !== 'undefined') {
      state = Object.assign(state, { mock: props.mock });
    }
    this.state = state;
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleMethodChange = this.handleMethodChange.bind(this);
    this.handleJsonChange = this.handleJsonChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleDelayChange = this.handleDelayChange.bind(this);
    this.handleEnabledChange = this.handleEnabledChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUrlChange(event) {
    const url = event.target.value.trim();
    this.setState(prevState => ({
      mock: {
        ...prevState.mock,
        url
      }
    }));
  }

  handleDescriptionChange(event) {
    const description = event.target.value;
    this.setState(prevState => ({
      mock: {
        ...prevState.mock,
        description
      }
    }));
  }

  handleMethodChange(event) {
    const method = event.target.value;
    this.setState(prevState => ({
      mock: {
        ...prevState.mock,
        method
      }
    }));
  }

  handleJsonChange({updated_src}) {
    console.log(updated_src);
    this.setState(prevState => ({
      mock: {
        ...prevState.mock,
        data: JSON.stringify(updated_src)
      }
    }));
  }

  handleStatusChange(event) {
    const status = event.target.value;
    this.setState(prevState => ({
      mock: {
        ...prevState.mock,
        status: status
      }
    }));
  }

  handleDelayChange(event) {
    const delay = event.target.value.trim();
    this.setState(prevState => ({
      mock: {
        ...prevState.mock,
        delay
      }
    }));
  }

  handleEnabledChange(event) {
    const enabled = event.target.checked;
    this.setState(prevState => ({
      mock: {
        ...prevState.mock,
        enabled
      }
    }));
  }

  handleProxyUrlChange(event) {
    const proxyUrl = event.target.value.trim();
    this.setState(prevState => ({
      mock: {
        ...prevState.mock,
        proxyUrl
      }
    }));
  }

  handleGoToMain() {
    Router.push('/', '/ui');
  }

  async handleSubmit(event) {
    event.preventDefault();
    const mock = this.state.mock;
    const hasId = typeof mock.id !== 'undefined';
    const data = mock.data ? JSON.parse(mock.data) : mock.data;
    const delay = mock.delay ? parseInt(mock.delay) : 0;
    const status = parseInt(mock.status);
    await fetch(`/mocks${hasId ? `/${mock.id}` : ''}`, {
      body: JSON.stringify({ ...mock, data, delay, status }),
      headers: {
        'content-type': 'application/json'
      },
      method: hasId ? 'PUT' : 'POST'
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-horizontal">
        <div className="form-group">
          <label className="col-sm-2" htmlFor="method">Method</label>
          <div className="col-sm-10">
            <select id="method" className="form-control" value={this.state.mock.method} onChange={this.handleMethodChange}>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2" htmlFor="url">Url</label>
          <div className="col-sm-10">
            <input id="url" className="form-control" type="text" value={this.state.mock.url} onChange={this.handleUrlChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2" htmlFor="description">Description</label>
          <div className="col-sm-10">
            <input id="description" className="form-control" type="text" value={this.state.mock.description} onChange={this.handleDescriptionChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2" htmlFor="status">Status</label>
          <div className="col-sm-10">
            <select id="status" className="form-control" value={this.state.mock.status} onChange={this.handleStatusChange}>
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
          <label className="col-sm-2" htmlFor="delay">Delay, ms</label>
          <div className="col-sm-10">
            <input id="delay" className="form-control" type="text" value={this.state.mock.delay} onChange={this.handleDelayChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2" htmlFor="enabled">Enabled</label>
          <div className="col-sm-10">
            <input id="enabled" type="checkbox" value="" checked={this.state.mock.enabled} onChange={this.handleEnabledChange}/>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2" htmlFor="proxy">Proxy url</label>
          <div className="col-sm-10">
            <input id="proxy" className="form-control" type="text" value={this.state.mock.proxyUrl} onChange={this.handleProxyUrlChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2" htmlFor="json">Return Json</label>
          <div className="col-sm-10">
            <ReactJson
              src={JSON.parse(this.state.mock.data)}
              collapsed={true}
              onAdd={this.handleJsonChange}
              onDelete={this.handleJsonChange}
              onEdit={this.handleJsonChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-1 justify-content-start">
            <button className="btn btn-default" type="button" onClick={this.handleGoToMain}>Back</button>
          </div>
          <div className="col-sm-1">
            <button className="btn btn-primary" type="submit">Save</button>
          </div>
        </div>
      </form>
    );
  }
}

export default MockForm;