const GlyphButton = ({ onClick, title, icon, text }) => (
  <React.Fragment>
    <button
      className="btn btn-default btn-xs edit-btn"
      onClick={onClick}
      title={title}
    >
      <span className={`glyphicon glyphicon-${icon}`} /> {text}
    </button>
    <style jsx>{`
      .edit-btn {
        margin-left: 10px;
      }
    `}</style>
  </React.Fragment>
)

export default GlyphButton
