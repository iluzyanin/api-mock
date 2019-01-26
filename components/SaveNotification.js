import classnames from 'classnames'

const SaveNotification = React.memo(({ visible }) => (
  <React.Fragment>
    <span
      className={classnames('saveStatus', { 'saveStatus--visible': visible })}
    >
      <i className="far fa-save" /> Saved
    </span>
    <style jsx>{`
      .saveStatus {
        position: fixed;
        left: calc(50% - 20px);
        top: 10px;
        color: mediumseagreen;
        z-index: 5;
        background-color: white;
        padding: 10px;
        border-radius: 3px;
        font-size: 24px;
        line-height: 24px;
        opacity: 0;
        transition: opacity 0.4s ease-in;
      }
      .saveStatus--visible {
        opacity: 0.7;
      }
    `}</style>
  </React.Fragment>
))

export default SaveNotification
