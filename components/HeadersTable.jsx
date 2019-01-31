import ContentEditable from 'react-contenteditable'

const newId = () =>
  Math.random()
    .toString(36)
    .substr(2, 5)

class HeadersTable extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      headerKeyValues: [
        ...Object.keys(props.headers).map(key => ({
          id: newId(),
          key,
          value: props.headers[key],
        })),
        {
          id: newId(),
          key: '',
          value: '',
        },
      ],
    }
  }

  getHeaders = () => {
    return this.state.headerKeyValues.reduce((headers, keyValuePair) => {
      if (keyValuePair.key !== '') {
        headers[keyValuePair.key] = keyValuePair.value
      }
      return headers
    }, {})
  }

  handleChange = (evt, id, propName) => {
    this.setState(
      prevState => {
        const header = prevState.headerKeyValues.find(h => h.id === id)
        const index = prevState.headerKeyValues.indexOf(header)
        let newHeaderKeyValues = prevState.headerKeyValues
        if (index === prevState.headerKeyValues.length - 1) {
          newHeaderKeyValues.push({
            id: newId(),
            key: '',
            value: '',
          })
        }
        header[propName] = evt.target.value
        return {
          headerKeyValues: newHeaderKeyValues,
        }
      },
      () => this.props.onChange(this.getHeaders())
    )
  }

  handleNewChange = (evt, propName) => {
    this.setState(
      prevState => {
        const header = prevState.headerKeyValues.find(h => h.id === id)
        header[propName] = evt.target.value
        return {
          headerKeyValues: prevState.headerKeyValues,
        }
      },
      () => this.props.onChange(this.getHeaders())
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.state.html}
        <table className="headersTable">
          <thead>
            <tr>
              <th className="keyHeader">KEY</th>
              <th>VALUE</th>
            </tr>
          </thead>
          <tbody>
            {this.state.headerKeyValues.map(header => (
              <tr key={header.id} className="headerRow">
                <td>
                  <ContentEditable
                    html={header.key}
                    onChange={e => this.handleChange(e, header.id, 'key')}
                  />
                </td>
                <td className="headerValue">
                  <ContentEditable
                    html={header.value}
                    onChange={e => this.handleChange(e, header.id, 'value')}
                  />
                </td>
              </tr>
            ))}
            {/* <tr className="headerRow">
              <td>
                <ContentEditable
                  html={this.state.newHeader.key}
                  onChange={() => this.handleNewChange(e, 'key')}
                />
              </td>
              <td>
                <ContentEditable
                  html={this.state.newHeader.value}
                  onChange={() => this.handleNewChange(e, 'value')}
                />
              </td>
            </tr> */}
          </tbody>
        </table>
        {JSON.stringify(this.state.headers, null, 2)}
        <style jsx>{`
          .headersTable {
            width: 100%;
            border: 1px solid #ced4da;
          }
          .headersTable th {
            font-weight: bold;
            font-family: 'Lucida console', monospace, 'Courier new';
            font-size: 12px;
            color: dimgray;
            padding: 5px 10px;
            border: 1px solid #ced4da;
          }
          .keyHeader {
            width: 30%;
          }
          .headerRow td {
            font-size: 13px;
            color: dimgray;
            border: 1px solid #ced4da;
            padding: 5px 10px;
          }
          .headerRow:hover {
            background-color: whitesmoke;
          }
          .headerRow:hover .headerValue {
            padding-right: 30px;
          }
          .headerValue {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 0;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default HeadersTable
