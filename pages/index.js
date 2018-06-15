import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch from 'node-fetch'

const Index = (props) => (
  <Layout>
    <h1>Mocked requests</h1>
    <ul>
      {props.mocks.map((mock) => (
        <li key={mock.id}>
            {mock.method} {mock.url}
            <pre>
                {JSON.stringify(mock.data, null, 2)}
            </pre>
        </li>
      ))}
    </ul>
  </Layout>
)

Index.getInitialProps = async function(context) {
  const res = await fetch('http://localhost:3000/mocks');
  const data = await res.json();

  console.dir(data);

  return {
    mocks: data
  }
}

export default Index