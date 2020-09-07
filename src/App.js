import React, { useState, useEffect } from 'react';
import {
  Card,
  Col,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  Row
} from 'react-bootstrap'
import logo from './img/logo.png';
import './App.scss';
const newsPerPage = 6;
let arrayForHoldingPosts = [];

function App() {
  const news = require('./text/news.json').news;

  const [newsToShow, setNewsToShow] = useState([]);
  const [next, setNext] = useState(6);

  const loopWithSlice = (start, end) => {
    const slicedNews = news.slice(start, end);
    arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedNews];
    setNewsToShow(arrayForHoldingPosts);
  };

  useEffect(() => {
    loopWithSlice(0, newsPerPage);
  }, []);

  const handleShowMoreNews = () => {
    loopWithSlice(next, next + newsPerPage);
    setNext(next + newsPerPage);
  };

  return (
    <div className="app">
      <header id="header">
        <Navbar collapseOnSelect expand="md">
          <Navbar.Brand className="navbar-brand" href="#home"><img className="logo" src={logo} /></Navbar.Brand>
          <h3 className="title-mobile">News</h3>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            <Nav>
              <Nav.Link href="#news">News</Nav.Link>
              <Nav.Link href="#pricing">Regions</Nav.Link>
              <Nav.Link href="#video">Video</Nav.Link>
              <Nav.Link href="#tv">TV</Nav.Link>
            </Nav>
            
          <Form className="search" inline>
            <FormControl type="text" placeholder="Search" className="input" />
          </Form>
          </Navbar.Collapse>
        </Navbar>
            
        <Form className="search-mobile">
          <FormControl type="text" placeholder="Search" className="input" />
        </Form>
      </header>
      <Container fluid>
        <Row>
          {
            newsToShow.map((n, i) => 
              <Col md={4} key={i}>
                <Card>
                  <Card.Body>
                    <Card.Title>{n.title}</Card.Title>
                    <Card.Img src={n.image} />
                    <div className="card-text">
                      <h4 className="title-mobile">
                        {n.title}<br />
                      </h4>
                      
                      <p>{n.description}</p>
                      <p className="date">{n.date}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            )
          }
        </Row>
        <button className="loadmore" onClick={handleShowMoreNews}>Load more</button>
      </Container>
      <footer id="footer">
        <Navbar expand="md">
          <Nav>
            <Nav.Link href="#news">News</Nav.Link>
            <Nav.Link href="#pricing">Regions</Nav.Link>
            <Nav.Link href="#video">Video</Nav.Link>
            <Nav.Link href="#tv">TV</Nav.Link>
          </Nav>
          <p className="copyright" inline>Copyright @ AMIPOS</p>
        </Navbar>
      </footer>
    </div>
  );
}

export default App;
