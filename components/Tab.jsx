import classnames from 'classnames'

const Tab = props => (
  <React.Fragment>
    <li
      className={classnames('tab', {
        'tab--selected': props.name === props.selectedTab,
      })}
      onClick={props.onTabClick}
    >
      {props.name}
    </li>
    <style jsx>{`
      .tab {
        opacity: 0.4;
        padding: 6px 15px;
        border-bottom: 3px solid transparent;
        font-size: 13px;
      }
      .tab:hover {
        opacity: 0.7;
        cursor: pointer;
      }
      .tab--selected {
        border-bottom-color: darkorange;
        display: inline-block;
        opacity: 1;
      }
      .tab--selected:hover {
        opacity: 1;
      }
    `}</style>
  </React.Fragment>
)

export default Tab
