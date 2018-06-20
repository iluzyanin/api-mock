import fetch from 'isomorphic-unfetch';
import Layout from '../components/MyLayout';
import MockList from '../components/MockList';
import MockForm from '../components/MockForm';

const Index = (props) => (
  <Layout>
    <h2>Mocked requests</h2>
    <MockList mocks={props.mocks}></MockList>
    <h2>New request mock</h2>
    <MockForm></MockForm>
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