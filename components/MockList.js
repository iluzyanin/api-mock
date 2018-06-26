import Router from 'next/router';
import Mock from './Mock';

class MockList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  editMock(mockId) {
    Router.push(`/edit-mock?id=${mockId}`, `/ui/edit-mock?id=${mockId}`);
  }

  deleteMock(mockId) {
    Router.push(`/edit-mock?id=${mockId}`, `/ui/edit-mock?id=${mockId}`);
  }

  render() {
    return (
      <ul className="list-unstyled">
        {this.props.mocks.map((mock) => (
          <Mock
            mock={mock}
            key={mock.id}
            onEdit={() => this.editMock(mock.id)}
            onDelete={() => this.deleteMock(mock.id)} />
        ))}
      </ul>
    );
  }
}

export default MockList;