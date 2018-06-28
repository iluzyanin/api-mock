import React from 'react';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

class MockForm extends React.PureComponent {
  constructor(props) {
    super(props);
    const defaultMock = {
      url: '',
      method: 'GET',
      data: undefined,
      status: 200
    };
    let state = { mock: defaultMock };
    if (typeof props.mock !== 'undefined') {
      state = Object.assign(state, { mock: props.mock });
    }
    this.state = state;
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleMethodChange = this.handleMethodChange.bind(this);
    this.handleJsonChange = this.handleJsonChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUrlChange(event) {
    const url = event.target.value;
    this.setState(prevState => ({
      mock: {
        ...prevState.mock,
        url
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

  handleJsonChange(event) {
    const data = event.target.value;
    this.setState(prevState => ({
      mock: {
        ...prevState.mock,
        data
      }
    }));
  }

  handleStatusChange(event) {
    const status = event.target.value;
    this.setState(prevState => ({
      mock: {
        ...prevState.mock,
        status: parseInt(status)
      }
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const mock = this.state.mock;
    const hasId = typeof mock.id !== 'undefined';
    const data = mock.data ? JSON.parse(mock.data) : mock.data;
    fetch(`/mocks${hasId ? `/${mock.id}` : ''}`, {
      body: JSON.stringify({ ...mock, data }),
      headers: {
        'content-type': 'application/json'
      },
      method: hasId ? 'PUT' : 'POST'
    });
    Router.push('/', '/ui');
  }

  render() {
    const jsonStyle = {
      height: 200
    };
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
          <label className="col-sm-2" htmlFor="json">Return Json</label>
          <div className="col-sm-10">
            <textarea id="json" className="form-control" style={ jsonStyle } value={this.state.mock.data} onChange={this.handleJsonChange} />
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
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    );
  }
}

export default MockForm;