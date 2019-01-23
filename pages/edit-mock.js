import Layout from '../components/MyLayout'
import MockForm from '../components/MockForm'

const EditMock = props => (
  <Layout>
    <h2>Edit request mock</h2>
    <MockForm mock={props.mock} />
  </Layout>
)

EditMock.getInitialProps = async ({ req, query }) => {
  const mockId = query.id
  const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : ''
  if (typeof mockId !== 'undefined') {
    const res = await fetch(`${baseUrl}/mocks/${mockId}`)
    const mock = await res.json()
    mock.data = JSON.stringify(mock.data, null, 2)
    return {
      mock,
    }
  }
  return {}
}

export default EditMock
