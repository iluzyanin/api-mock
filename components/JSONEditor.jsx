import brace from 'brace'
import 'brace/mode/json'
import 'brace/theme/eclipse'
import AceEditor from 'react-ace'

const JSONEditor = React.memo(props => (
  <AceEditor
    mode="json"
    theme="eclipse"
    name={props.id}
    onChange={props.onChange}
    onValidate={props.onValidate}
    fontSize={13}
    showPrintMargin={false}
    showGutter={true}
    highlightActiveLine={true}
    editorProps={{
      $blockScrolling: Infinity,
    }}
    setOptions={{
      showLineNumbers: true,
      tabSize: 2,
    }}
    value={props.value}
    width="100%"
    height="calc(100vh - 280px)"
  />
))

export default JSONEditor
