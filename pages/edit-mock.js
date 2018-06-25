import Layout from '../components/MyLayout';
import MockForm from '../components/MockForm';

const EditMock = (props) => (
  <Layout>
    <h2>New request mock</h2>
    <MockForm mock={props.mock}></MockForm>
  </Layout>
);

EditMock.getInitialProps = async (context) => {
  const mockId = context.query.id;
  if (typeof mockId !== 'undefined') {
    const res = await fetch(`http://localhost:3000/mocks/${mockId}`);
    const mock = await res.json();
    mock.data = JSON.stringify(mock.data, null, 2);
    return {
      mock
    };
  }
  return {};
}

export default EditMock;