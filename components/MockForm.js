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
      body: JSON.stringify({ ...this.state.mock, data: JSON.parse(this.state.mock.data) } ),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Method:
        <select value={this.state.mock.method} onChange={this.handleMethodChange}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
        </select><br />
        Url: <input type="text" value={this.state.mock.url} onChange={this.handleUrlChange} /><br />
        Return json: <textarea value={this.state.mock.data} onChange={this.handleJsonChange} />
        Status: 
        <select value={this.state.mock.status} onChange={this.handleStatusChange}>
          <option value="200">200 OK</option>
          <option value="201">201 Created</option>
        </select><br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default MockForm;