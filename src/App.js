import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button, Form} from 'react-bootstrap'
import { buildTOCMarkdown, headerListFromMarkdown } from './md'

function App() {
  return (
    <MarkdownGenerator></MarkdownGenerator>
  );
}

class MarkdownGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputMd: '', outputMd: '', articleURL: ''};

    this.handleChangeMd = this.handleChangeMd.bind(this)
    this.handleChangeURL = this.handleChangeURL.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeMd(e) {
    this.setState({ inputMd: e.target.value })
  }

  handleChangeURL(e) {
    this.setState({ articleURL: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    const headerList = headerListFromMarkdown(this.state.inputMd)
    this.setState({ outputMd: buildTOCMarkdown(headerList, '  ', false, this.state.articleURL) })
  }

  render() {
    return (
      <div className="App m-3">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h2>Stackoverflow Table of Contents generator</h2>

          <Form onSubmit={this.handleSubmit} className='w-75'>
            <Form.Group className="mb-3" controlId="markdownForm.ControlTextarea1">
              <Form.Control as="textarea" rows={3} className="my-3 form-control-lg" placeholder="Paste Markdown HERE" onChange={this.handleChangeMd} />
              <Form.Control type="url" placeholder='Paste Stackoverflow article URL' onChange={this.handleChangeURL}></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">Generate</Button>

          </Form>

          <Result text={this.state.outputMd}></Result>



        </header>
      </div>
    )
  }
}

function Result(props) {
  return <textarea value={props.text} readOnly className='mt-4 w-50 py-5'></textarea>
}

export default App;
