import brace from 'brace'
import 'brace/mode/json'
import 'brace/theme/textmate'
import AceEditor from 'react-ace'

const JSONEditor = props => (
  <AceEditor
    mode="json"
    theme="textmate"
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
    height="80vh"
    height="40vh"
    width="100%"
  />
)

export default JSONEditor
