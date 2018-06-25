import fetch from 'isomorphic-unfetch';
import Layout from '../components/MyLayout';
import MockList from '../components/MockList';
import Link from 'next/link'

const Index = (props) => (
  <Layout>
    <Link as="ui/edit-mock" href="edit-mock">
      <button className="btn btn-default">New mock</button>
    </Link>
    <h2>Mocked requests</h2>
    <MockList mocks={props.mocks}></MockList>
  </Layout>
);

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/mocks');
  const data = await res.json();

  return {
    mocks: data
  }
}

export default Index;