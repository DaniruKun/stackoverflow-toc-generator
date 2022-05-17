import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button, Form } from 'react-bootstrap'

function App() {
  return (
    <MarkdownGenerator></MarkdownGenerator>
  );
}

class MarkdownGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputMd: '', outputMd: '' };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({ inputMd: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({ outputMd: this.state.inputMd + 'peko' })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <h2>Stackoverflow Table of Contents generator</h2>

          <Form onSubmit={this.handleSubmit} className='w-75'>
            <Form.Group className="mb-3" controlId="markdownForm.ControlTextarea1">
              <Form.Label>Markdown</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Paste Markdown HERE" onChange={this.handleChange} />
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
  return <textarea value={props.text} readOnly className='mt-4 w-50'></textarea>
}

export default App;
