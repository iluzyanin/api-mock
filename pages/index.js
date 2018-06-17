import Layout from '../components/MyLayout.js';
import fetch from 'isomorphic-unfetch';
import React from 'react';

class Index extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      newMock: {
        path: '',
        method: 'GET',
      }
    }
    this.handlePathChange = this.handlePathChange.bind(this);
    this.handleMethodChange = this.handleMethodChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePathChange(event) {
    const path = event.target.value;
    this.setState(prevState => ({
      newMock: {
        ...prevState.newMock,
        path
      }
    }));
  }

  handleMethodChange(event) {
    const method = event.target.value;
    this.setState(prevState => ({
      newMock: {
        ...prevState.newMock,
        method
      }
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    console.dir(this.state.newMock);
  }

  render() {
    return (
      <Layout>
        <h1>Mocked requests</h1>
        <ul>
          {this.props.mocks.map((mock) => (
            <li key={mock.id}>
              {mock.method} {mock.url}
              <pre>
                {JSON.stringify(mock.data, null, 2)}
              </pre>
            </li>
          ))}
        </ul>
        <form onSubmit={this.handleSubmit}>
          Path: <input type="text" value={this.state.newMock.path} onChange={this.handlePathChange} />
          Method:
          <select value={this.state.newMock.method} onChange={this.handleMethodChange}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </Layout>
    );
  }
}

Index.getInitialProps = async (context) => {
  const res = await fetch('http://localhost:3000/mocks');
  const data = await res.json();

  console.dir(data);

  return {
    mocks: data
  }
}

export default Index