import fetch from 'isomorphic-unfetch';
import Link from 'next/link'
import GlyphButton from '../components/GlyphButton';
import MockList from '../components/MockList';
import Layout from '../components/MyLayout';

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
    const res = await fetch(`/mocks`);
    const data = await res.json();
  
    this.setState({ mocks: data });
  }

  async onMocksChange() {
    await this.fetchMocks();
  }

  render() {
    return (
      <Layout>
        <h2>
          Mocked requests
          <Link as="ui/edit-mock" href="edit-mock">
            <GlyphButton icon="plus" title="Create new mock"></GlyphButton>
          </Link>
        </h2>
        <MockList mocks={this.state.mocks} onMocksChange={this.onMocksChange}></MockList>
        <style jsx>{`
          h2 {
            margin: 20px 0;
          }
        `}
        </style>
      </Layout>
    );
  }
}

export default Index;