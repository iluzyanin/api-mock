import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import Mock from './Mock';

class MockList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.deleteMock = this.deleteMock.bind(this);
  }

  editMock(mockId) {
    Router.push(`/edit-mock?id=${mockId}`, `/ui/edit-mock?id=${mockId}`);
  }

  async deleteMock(mockId) {
    await fetch(`/mocks/${mockId}`, { method: 'DELETE' });
    await this.props.onMocksChange();
  }

  render() {
    return (
      <ul className="list-unstyled">
        {this.props.mocks.map((mock) => (
          <Mock
            mock={mock}
            key={mock.id}
            onEdit={() => this.editMock(mock.id) }
            onDelete={() => this.deleteMock(mock.id)} />
        ))}
      </ul>
    );
  }
}

export default MockList;