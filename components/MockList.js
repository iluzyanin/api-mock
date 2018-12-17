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

  async cloneMock(mock) {
    const clonedMock = {
      ...mock,
      id: undefined,
      description: `${mock.description} COPY`
    }
    await fetch('/mocks', {
      body: JSON.stringify(clonedMock),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    });
    await this.props.onMocksChange();
  }

  async deleteMock(mockId) {
    await fetch(`/mocks/${mockId}`, { method: 'DELETE' });
    await this.props.onMocksChange();
  }

  descriptionSorter(mockA, mockB) {
    return mockA.description.localeCompare(mockB.description);
  }

  render() {
    return (
      <ul className="list-unstyled">
        {this.props.mocks.sort(this.descriptionSorter).map((mock) => (
          <Mock
            mock={mock}
            key={mock.id}
            onEdit={() => this.editMock(mock.id) }
            onDelete={() => this.deleteMock(mock.id)}
            onClone={() => this.cloneMock(mock)} />
        ))}
      </ul>
    );
  }
}

export default MockList;