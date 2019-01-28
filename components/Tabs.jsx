class Tabs extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      selectedTab: props.children[0].props.name,
    }
  }

  onTabClick = selectedTab => {
    this.setState({ selectedTab })
  }

  render() {
    const selectedTab = this.state.selectedTab
    const { children } = this.props
    return (
      <React.Fragment>
        <div className="tabs">
          <ul className="tabList">
            {children.map(child =>
              React.cloneElement(child, {
                selectedTab,
                onTabClick: () => this.onTabClick(child.props.name),
                key: child.props.name,
              })
            )}
          </ul>
          <hr className="thinLine" />
          <div className="tabContent">
            {
              children.find(child => child.props.name === selectedTab).props
                .children
            }
          </div>
        </div>
        <style jsx>{`
          .tabs {
            width: 100%;
          }
          .thinLine {
            margin: 0 0 10px 0;
          }
          .tabList {
            list-style: none;
            padding-left: 0;
            margin-bottom: 0;
            display: flex;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default Tabs
