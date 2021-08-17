import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

import "./GetRankings.css";
import getRankings from "../../logic/getRankings";

const GetRankings = (): JSX.Element => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [selector, setSelector] = useState("");
  const [items, setItems] = useState([]);

  const validateForm = () => {
    return url.length > 0 && selector.length > 0;
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await getRankings(url, selector);
      setItems(res.data);
    } catch (error) {
      console.error(error.response.data);
      setMessage(JSON.stringify(error.response.data));
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async () => {
    setUrl("https://webscraper.io/test-sites/e-commerce/allinone/phones/touch");
    setSelector(
      "html>body>div>div>div>div>div>div>div>div>h4>a:nth-of-type(1)"
    );
  };

  return (
    <div className="GetRankings" data-testid="GetRankings">
      <p>
        Provide url link to a website and selector targeting relevant items. It
        access the webpage, get the list of items and display the rankings list.
        It renders a full web page within a browser so the whole process might
        take a while.
      </p>
      <Button variant="secondary" size="sm" onClick={handleClick}>
        Set default test data
      </Button>
      <Form>
        <Form.Group controlId="url">
          <Form.Label>Url</Form.Label>
          <Form.Control
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="selector">
          <Form.Label>Selector</Form.Label>
          <Form.Control
            type="text"
            value={selector}
            onChange={(e) => setSelector(e.target.value)}
          />
        </Form.Group>
        {!loading && (
          <Button
            type="submit"
            disabled={!validateForm()}
            onClick={handleSubmit}
          >
            Get Rankings
          </Button>
        )}
        {loading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {message && <Alert variant="danger">{message}</Alert>}
      </Form>
      {items.length > 0 ? (
        <Alert variant="success">
          <p>Rankings:</p>
          <ol>
            {items.map((el, i) => (
              <li key={i}>{el}</li>
            ))}
          </ol>
        </Alert>
      ) : (
        ""
      )}
    </div>
  );
};

export default GetRankings;
