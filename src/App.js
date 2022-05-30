import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button, Form } from 'react-bootstrap'
import { Routes, Route, Link } from "react-router-dom";
import { buildTOCMarkdown, headerListFromMarkdown } from './md'

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="*" element={<MarkdownGenerator />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

function About() {
  return <div className='m-3'>
    <h1>About</h1>
    <p className='text-justify'>This is a small tool that generates a MarkDown compliant Table of Contents for <a href='https://stackoverflow.com'>Stackoverflow</a>'s flavour of MarkDown.</p>
    <p>Simply paste the MarkDown text, put in the page URL, and press <b>Generate</b>.</p>
  </div>
}

function Header() {
  return (
    <div className="App">
      <header className="d-flex justify-content-center py-3 shadow-sm">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link to="/" className='nav-link'>Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className='nav-link'>About</Link>
          </li>
        </ul>
      </header>
    </div>
  )
}

class MarkdownGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputMd: '', outputMd: '', articleURL: '' };

    this.handleChangeMd = this.handleChangeMd.bind(this)
    this.handleChangeURL = this.handleChangeURL.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeMd(e) {
    this.setState({ inputMd: e.target.value })
  }

  handleChangeURL(e) {
    this.setState({ articleURL: cleanURL(e.target.value) })
  }

  handleSubmit(e) {
    e.preventDefault()
    const headerList = headerListFromMarkdown(this.state.inputMd)
    this.setState(prevState => ({ ...prevState, outputMd: buildTOCMarkdown(headerList, '  ', false, prevState.articleURL) }))
  }

  render() {
    return (
      <div className="App m-3">
        <h2>Stackoverflow Table of Contents generator</h2>

        <Form onSubmit={this.handleSubmit} className='w-75'>
          <Form.Group className="mb-3" controlId="markdownForm.ControlTextarea1">
            <Form.Control as="textarea" rows={3} className="my-3 form-control-lg" placeholder="Paste Markdown HERE" onChange={this.handleChangeMd} autofocus="true" />
            <Form.Control type="url" placeholder='Paste Stackoverflow article URL' onChange={this.handleChangeURL}></Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">Generate</Button>
        </Form>

        <Result text={this.state.outputMd}></Result>
      </div>
    )
  }
}

function Result(props) {
  return <textarea value={props.text} readOnly className='mt-4 w-50 py-5'></textarea>
}

function cleanURL(url) {
  let rawURL = new URL(url)
  let cleanPath = rawURL.pathname
    .split('/')
    .filter(part => part !== 'edit')
    .join('/')
  rawURL.pathname = cleanPath
  return rawURL.toString()
}

export default App;
