const Expand = (props) => (
  <React.Fragment>
    <div className="expand">
      <div className={`text text${props.isOpen ? '' : '--closed' }`}>
        { props.isOpen && props.children}
      </div>
    </div>
    <style jsx>{`
      .text {
        margin-top: 10px
      }
      .text--closed {
        height: 0;
        overflow: hidden;
      }
  `}</style>
  </React.Fragment>
);

export default Expand;