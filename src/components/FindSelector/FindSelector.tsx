import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Form, Button, Alert, Spinner } from "react-bootstrap";

import "./FindSelector.css";
import getSelector from "../../logic/getSelector";
import GetRankings from "../GetRankings/GetRankings";

const FindSelector = (): JSX.Element => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [textArea, setTextArea] = useState("");
  const [selector, setSelector] = useState("");

  const validateForm = () => {
    return url.length > 0 && textArea.length > 0;
  };

  const handleSubmit = async () => {
    const textArray = textArea.replace(/\r\n/g, "\n").split("\n");
    setLoading(true);
    setMessage("");
    setSelector("");

    try {
      const res = await getSelector(url, textArray);
      setSelector(res.data);
    } catch (error) {
      console.error(error.response.data);
      setMessage(JSON.stringify(error.response.data));
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefault = () => {
    setUrl("https://webscraper.io/test-sites/e-commerce/allinone/phones/touch");
    setTextArea("Nokia 123" + "\n" + "LG Optimus" + "\n" + "Samsung Galaxy");
  };

  return (
    <div className="FindSelector" data-testid="FindSelector">
      <p>
        Provide url link to a website and list of relevant items. It will search
        through the website and return the most statistically relevant selector
        which can be then used in Get Rankings.
      </p>
      <Button variant="secondary" size="sm" onClick={handleSetDefault}>
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
        <Form.Group controlId="items">
          <Form.Label>Relevant items </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
          />
          <Form.Text className="text-muted">
            Separate by new line. Case insensitive.
          </Form.Text>
        </Form.Group>
        {!loading && (
          <div>
            <Button
              type="submit"
              disabled={!validateForm()}
              onClick={handleSubmit}
            >
              Find Selector
            </Button>
          </div>
        )}
        {loading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {message && <Alert variant="danger">{message}</Alert>}
      </Form>

      {selector && (
        <div>
          <Alert variant="success">
            <p>
              <strong>
                Selector found! <br />
              </strong>
              Url: <a href={url}>{url}</a> <br />
              Selector: {selector}
            </p>
          </Alert>

          <h4>Get Rankings:</h4>
          <GetRankings url={url} selector={selector} />
        </div>
      )}
    </div>
  );
};

export default FindSelector;
