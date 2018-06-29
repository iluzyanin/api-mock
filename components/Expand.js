const Expand = (props) => (
  <React.Fragment>
    <div className="expand">
      <div className={`text text${props.isOpen ? '' : '--closed' }`}>
        {props.children}
      </div>
    </div>
    <style jsx>{`
      .text {
        margin-top: 10px
        overflow: hidden;
      }
      .text--closed {
        height: 0;
      }
  `}</style>
  </React.Fragment>
);

export default Expand;