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
    minLines={20}
    maxLines={60}
    width="100%"
  />
))

export default JSONEditor
