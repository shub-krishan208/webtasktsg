import React from "react";
import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";

function WikiDashboard() {
  const [query, setQuery] = useState(""); //stores the user input in query variable
  const [searchData, setSearchData] = useState(null); //stores fetched json data
  const [pageTitle, setPageTitle] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    if (!query.trim()) {
      console.log("Search query is empty.");
      return;
    }

    let CORS_HELPER = "&origin=*"; //to avoid CORS issues
    let searchUrl =
      "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=";

    let url = searchUrl + query.replace(/\s+/g, "_") + CORS_HELPER;

    console.log(`Searching for: ${url}`);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Search results:", data);
        const title = data ? data[1][0] : "";

        if (!title) {
          throw new Error("No results found for that query");
        }

        const formattedTitle = title.replace(/\s+/g, "_");

        let pageUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${formattedTitle}&prop=info|revisions|pageimages|extracts|langlinks&inprop=protection|url&rvprop=timestamp|user&pithumbsize=200&exintro=true&explaintext=true&lllimit=max&format=json&formatversion=2${CORS_HELPER}`;
        let creationUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${formattedTitle}&prop=revisions&rvlimit=1&rvdir=newer&rvprop=timestamp&format=json&formatversion=2${CORS_HELPER}`;
        let contributorsUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${formattedTitle}&prop=contributors&pclimit=max&format=json&formatversion=2${CORS_HELPER}`;
        let linksUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${formattedTitle}&prop=links&pllimit=max&format=json&formatversion=2${CORS_HELPER}`;
        let backlinksUrl = `https://en.wikipedia.org/w/api.php?action=query&list=backlinks&bltitle=${formattedTitle}&bllimit=200&format=json&formatversion=2${CORS_HELPER}`;
        let pageViewUrl = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user/${formattedTitle}/daily/20250620/20250720${CORS_HELPER}`;
        // Handle the search results here
        setSearchData(data);
        setPageTitle(title);
        fetchPageData(pageUrl);
        fetchCreationData(creationUrl);
        fetchContributorsData(contributorsUrl);
        fetchLinksData(linksUrl);
        fetchBacklinksData(backlinksUrl);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);

        setPageData(null);
        setPageTitle("");
        console.log(`no results for "${query}"`);
      });
  };
  // console.log(title);

  //all the api call urls to fetch respective data
  // console.log(pageUrl);

  const [pageData, setPageData] = useState(null);
  const [creationData, setCreationData] = useState(null);
  const [contributorsData, setContributorsData] = useState(null);
  const [linksData, setLinksData] = useState(null);
  const [backlinksData, setBacklinksData] = useState(null);

  const fetchPageData = (pageUrl) => {
    console.log(`Fetching pagedata from: ${pageUrl}`);
    fetch(pageUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("page data:", data);
        // Handle the search results here
        setPageData(data);
        // console.log(data.query.pages[0].thumbnail.source);
      })
      .catch((error) => {
        console.error("Error fetching page data:", error);
      });
  };
  const fetchCreationData = (creationUrl) => {
    console.log(`Fetching creation data from: ${creationUrl}`);
    fetch(creationUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("creation data:", data);
        // Handle the search results here
        setCreationData(data);
      })
      .catch((error) => {
        console.error("Error fetching creation data:", error);
      });
  };
  const fetchContributorsData = (contributorsUrl) => {
    console.log(`Fetching contributors data from: ${contributorsUrl}`);
    fetch(contributorsUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(" contributors data:", data);
        // Handle the search results here
        setContributorsData(data);
      })
      .catch((error) => {
        console.error("Error fetching contributors data:", error);
      });
  };
  const fetchLinksData = (linksUrl) => {
    console.log(`Fetching links data from: ${linksUrl}`);
    fetch(linksUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(" links data:", data);
        // Handle the search results here
        setLinksData(data);
      })
      .catch((error) => {
        console.error("Error fetching links data:", error);
      });
  };
  const fetchBacklinksData = (backlinksUrl) => {
    console.log(`Fetching backlinks data from: ${backlinksUrl}`);
    fetch(backlinksUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(" backlinks data:", data);
        // Handle the search results here
        setBacklinksData(data);
      })
      .catch((error) => {
        console.error("Error backlinks data:", error);
      });
  };
  return (
    <>
      <div>
        <h1>Wikipedia Dashboard</h1>
        <p>This page is under construction.</p>
      </div>
      <Container fluid="lg" className="py-4">
        <header className="mb-4">
          <p className="text-muted">
            Enter a Wikipedia page title to get its stats.
          </p>
          <Form onSubmit={handleSearch}>
            <Row>
              <Col md={9}>
                <Form.Control
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter a Wikipedia Page Title (e.g., Albert Einstein)"
                />
              </Col>
              <Col md={3}>
                <Button variant="primary" type="submit" className="w-100">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </header>

        <main>
          <Card>
            <Card.Header as="h4">
              {pageTitle || "Title"}{" "}
              <span className="text-muted">
                {"#" + (pageData?.query?.pages[0]?.pageid || "pageid")}
              </span>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={3}>
                  {/*Image and MetaData*/}
                  <Card.Img
                    variant="top"
                    src={
                      pageData?.query?.pages[0]?.thumbnail?.source ||
                      "https://demofree.sirv.com/nope-not-here.jpg?w=150"
                      // adding a fallback image in case there is noimage available in the api call database
                    }
                    className="mb-3"
                    alt={"thumbnail for: " + pageTitle}
                  />
                  <Card>
                    <Card.Body>
                      <Row>
                        <p>Creation Date</p>
                        <p>Page Length</p>
                        <p>Last Edited</p>
                        <p>Current Revision ID</p>
                        <p>Page Protection Status</p>
                        <p>Total views in the last 30 days</p>
                        <p>Number of Unique Editors</p>
                        <p>Last Editor</p>
                        <p>Number of Languages Available</p>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={9}>Stats and Lists</Col>
              </Row>
            </Card.Body>
          </Card>
        </main>
      </Container>
    </>
  );
}

export default WikiDashboard;
