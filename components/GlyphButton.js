const GlyphButton = (props) => (
  <React.Fragment>
    <button className="btn btn-default btn-xs edit-btn" onClick={props.onClick}>
      <span className={`glyphicon glyphicon-${props.icon}`}></span>
    </button>
    <style jsx>{`
          .edit-btn {
            margin-left: 10px;
          }
    `}</style>
  </React.Fragment>
);

export default GlyphButton;