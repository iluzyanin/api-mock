import JSONPretty from 'react-json-pretty';

const StyledJSON = (props) => (
  <React.Fragment>
    <JSONPretty json={props.json}></JSONPretty>
    <style jsx global>{`
      .json-pretty {
        line-height: 1.3;
        color: #66d9ef;
        background:#272822;
      }

      .json-pretty .json-key {
        color: #f92672
      }

      .json-pretty .json-value {
        color: #a6e22e
      }

      .json-pretty .json-string {
        color: #fd971f
      }

      .json-pretty .json-boolean {
        color: #ac81fe
      }
    `}</style>
  </React.Fragment>
);

export default StyledJSON;