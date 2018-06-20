import React from 'react';
import fetch from 'isomorphic-unfetch';

class MockForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      mock: {
        url: '',
        method: 'GET',
        data: '',
        status: 200
      }
    }
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
    fetch('/mocks', {
      body: JSON.stringify({ ...this.state.mock, data: JSON.parse(this.state.mock.data) }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-horizontal">
        <div className="form-group">
          <label className="col-sm-2" for="method">Method</label>
          <div className="col-sm-10">
            <select id="method" className="form-control" value={this.state.mock.method} onChange={this.handleMethodChange}>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2" for="url">Url</label>
          <div className="col-sm-10">
            <input id="url" className="form-control" type="text" value={this.state.mock.url} onChange={this.handleUrlChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2" for="json">Return Json</label>
          <div className="col-sm-10">
            <textarea id="json" className="form-control" value={this.state.mock.data} onChange={this.handleJsonChange} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2" for="status">Status</label>
          <div className="col-sm-10">
            <select id="status" className="form-control" value={this.state.mock.status} onChange={this.handleStatusChange}>
              <option value="200">200 OK</option>
              <option value="201">201 Created</option>
            </select>
          </div>
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    );
  }
}

export default MockForm;