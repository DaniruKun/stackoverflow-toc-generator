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
    this.state = { inputMd: '' };
  }

  logStuff(e) {
    e.preventDefault()
    console.log('button pressed')
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <h2>Stackoverflow Table of Contents generator</h2>

          <Form onSubmit={this.logStuff}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Stackoverflow Markdown</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Paste Markdown HERE" />
            </Form.Group>
            <Button variant="primary" type="submit">Generate</Button>
          </Form>

        </header>
      </div>
    )
  }
}

export default App;
