import fetch from 'isomorphic-unfetch';
import Link from 'next/link'
import Layout from '../components/MyLayout';
import MockList from '../components/MockList';

class Index extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { mocks: [] };
    this.onMocksChange = this.onMocksChange.bind(this);
  }

  async componentDidMount() {
    await this.fetchMocks();
  }

  async fetchMocks() {
    const res = await fetch('http://localhost:3000/mocks');
    const data = await res.json();
  
    this.setState({ mocks: data });
  }

  async onMocksChange() {
    await this.fetchMocks();
  }

  render() {
    return (
      <Layout>
        <Link as="ui/edit-mock" href="edit-mock">
          <button className="btn btn-default">New mock</button>
        </Link>
        <h2>Mocked requests</h2>
        <MockList mocks={this.state.mocks} onMocksChange={this.onMocksChange}></MockList>
      </Layout>
    );
  }
}

export default Index;