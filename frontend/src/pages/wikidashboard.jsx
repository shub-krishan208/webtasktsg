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
// import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register the necessary components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler, // to fill the area under the curve, looks cool 0o0 ;
  Tooltip,
  Legend
);

// //setting defaults for line chart
// defaults.plugins.title.display = true;
// defaults.plugins.title.align = start;
// defaults.plugins.title.font.size = 28;
// defaults.plugins.title.color = "white";

// custom hook to get window width
function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup: Remove event listener when the component unmounts
    // This is crucial to prevent memory leaks
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowWidth;
}

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
        let pageViewUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${formattedTitle}&prop=pageviews&pvipdays=30&format=json&formatversion=2${CORS_HELPER}`;
        // Handle the search results here
        setSearchData(data);
        setPageTitle(title);
        fetchPageData(pageUrl);
        fetchCreationData(creationUrl);
        fetchContributorsData(contributorsUrl);
        fetchLinksData(linksUrl);
        fetchBacklinksData(backlinksUrl);
        fetchPageviewData(pageViewUrl);
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
  const [pageViewData, setPageViewData] = useState(null);

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
  const fetchPageviewData = (pageViewUrl) => {
    console.log(`Fetching pageview data from: ${pageViewUrl}`);
    fetch(pageViewUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(" pageview data:", data);
        // Handle the search results here
        setPageViewData(data);
      })
      .catch((error) => {
        console.error("Error pageview data:", error);
      });
  };

  const totalViews = pageViewData
    ? Object.values(pageViewData?.query?.pages[0]?.pageviews).reduce(
        (sum, current) => sum + (current || 0),
        0
      )
    : undefined; //calculate total views by adding all entries in past 30 days
  const timeStamp = creationData?.query?.pages[0]?.revisions[0]?.timestamp;
  const fetchExtract = () => {
    const width = useWindowWidth();
    const getMaxLength = () => {
      if (width < 768) {
        return 300;
      } else if (width < 992) {
        return 700;
      } else {
        return 1200;
      }
    };
    const MAX_EXTRACT_LENGTH = getMaxLength();
    let extract =
      pageData?.query?.pages[0]?.extract ||
      "No summary provided on the page. Please visit the page for more details.";
    if (extract.length > MAX_EXTRACT_LENGTH) {
      return (
        extract.substring(0, MAX_EXTRACT_LENGTH) +
        "..." +
        " \n Check page for more details."
      );
    }
    return extract;
  };
  const lastEditedTimestamp =
    pageData?.query?.pages[0]?.revisions[0]?.timestamp;
  // the list of links is an array of 500 objects having a title which can be used to make pagelinks using makeLink function
  const listLinks = linksData?.query?.pages[0]?.links || [];
  const listBackLinks = backlinksData?.query?.backlinks || [];

  // arrow function to make a line chart using pageview data
  const PageViewsChart = ({ pageViewsData }) => {
    // 1. Check if data exists, otherwise show a message or a loading state.
    if (!pageViewsData || Object.keys(pageViewsData).length === 0) {
      return <p className="text-muted">No page view data available.</p>;
    }

    // 2. Process the data into the format Chart.js needs
    const labels = Object.keys(pageViewsData); // Dates for the X-axis
    const dataPoints = Object.values(pageViewsData); // View counts for the Y-axis

    // 3. Define the data structure for the chart
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Daily Page Views",
          data: dataPoints,
          fill: true, // Fill the area under the line
          backgroundColor: "rgba(75,192,192,0.2)", // Light teal fill
          borderColor: "rgba(75,192,192,1)", // Solid teal line
          tension: 0.4, // Makes the line slightly curved
        },
      ],
    };

    // 4. Configure the chart's appearance and behavior
    const options = {
      responsive: true, // Makes the chart responsive to container size
      maintainAspectRatio: false, // Allows us to control height
      plugins: {
        legend: {
          position: "top", // Position the legend at the top
        },
        title: {
          display: true,
          align: "start",
          text: "Page Views Over the Last Month",
          font: {
            size: 28,
          },
          color: "white",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              // Custom tooltip to show "Views: 1234"
              return `Views: ${context.parsed.y}`;
            },
          },
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Dates",
          },
          grid: {
            color: "rgba(193, 255, 236, 0.17)",
          },
        },
        y: {
          title: {
            display: true,
            text: "Number of Views",
          },
          grid: {
            color: "rgba(193, 255, 236, 0.17)",
          },
          beginAtZero: true, // Start the Y-axis at 0
        },
      },
    };

    // for custom chart height for responsiveness
    const customChartHeight = useWindowWidth() < 768 ? "30vh" : "50vh";

    // 5. Render the component
    return (
      <>
        {/* Set a container with a defined aspect ratio or height for the chart */}
        <div
          className="shadow-sm"
          style={{ position: "relative", height: customChartHeight }}
        >
          <Line options={options} data={data} />
        </div>
      </>
    );
  };
  return (
    <>
      <div className="text-center">
        <h1>Wikipedia Dashboard</h1>
        <p>This page is under construction. (adding more features)</p>
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
            <Card.Header as="h4" className="text-center">
              {pageTitle || "Title"}{" "}
              <span className="text-muted">
                {"#" + (pageData?.query?.pages[0]?.pageid || "pageid")}
              </span>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
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
                </Col>
                <Col md={8} className="mb-3">
                  <Card className="w-100 h-100 text-newspaper">
                    {fetchExtract()}
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={4} className="">
                  <ListGroup flush className="mt-3">
                    <ListGroup.Item>
                      <Button
                        variant="primary"
                        className="w-100"
                        href={`https://en.wikipedia.org/wiki/${
                          pageData ? pageData?.query?.pages[0]?.title : ""
                        }`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Open original page
                      </Button>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Created on:{" "}
                      {timeStamp ? (
                        <strong>
                          {new Date(timeStamp).toLocaleDateString()}
                        </strong>
                      ) : (
                        <span className={!timeStamp ? "text-muted" : ""}>
                          undefined
                        </span>
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Page size:{" "}
                      {pageData ? (
                        <strong>
                          {pageData?.query?.pages[0]?.length + " bytes"}
                        </strong>
                      ) : (
                        <span className="text-muted">undefined</span>
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Last Edited on:{" "}
                      {timeStamp ? (
                        <strong>
                          {new Date(lastEditedTimestamp).toLocaleDateString()}
                        </strong>
                      ) : (
                        <span
                          className={!lastEditedTimestamp ? "text-muted" : ""}
                        >
                          undefined
                        </span>
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Last edited by:{" "}
                      {pageData ? (
                        <strong>
                          {pageData?.query?.pages[0]?.revisions[0]?.user}
                        </strong>
                      ) : (
                        <span className="text-muted">undefined</span>
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Current Revision ID:{" "}
                      {pageData ? (
                        <strong>{pageData?.query?.pages[0]?.lastrevid}</strong>
                      ) : (
                        <span className="text-muted">undefined</span>
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Views in last 30 days:{" "}
                      {totalViews ? (
                        <strong>{totalViews}</strong>
                      ) : (
                        <span className="text-muted">undefined</span>
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Total Contributors:{" "}
                      {pageData ? (
                        <strong>
                          {contributorsData?.query?.pages[0]?.contributors
                            ?.length +
                            contributorsData?.query?.pages[0]?.anoncontributors}
                        </strong>
                      ) : (
                        <span className="text-muted">undefined</span>
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Total links:{" "}
                      {linksData ? (
                        <strong>{listLinks.length}</strong>
                      ) : (
                        <span className="text-muted">undefined</span>
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Backlinks:{" "}
                      {backlinksData ? (
                        <strong>{listBackLinks.length}</strong>
                      ) : (
                        <span className="text-muted">undefined</span>
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Languages supported:{" "}
                      {pageData ? (
                        <strong>
                          {pageData?.query?.pages[0]?.langlinks?.length}
                        </strong>
                      ) : (
                        <span className="text-muted">undefined</span>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={4} className="mt-3">
                  <Card className="h-100">
                    <Card.Header as="h6">List of all links</Card.Header>
                    <ListGroup
                      style={{ maxHeight: "360px", overflowY: "auto" }}
                    >
                      {listLinks.map((link, index) => (
                        <ListGroup.Item key={index}>
                          <a
                            href={`https://en.wikipedia.org/wiki/${link.title}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.title}
                          </a>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                </Col>
                <Col md={4} className="mt-3">
                  <Card className="h-100 ">
                    <Card.Header as="h6">List of all backlinks</Card.Header>
                    <ListGroup
                      style={{ maxHeight: "360px", overflowY: "auto" }}
                    >
                      {listBackLinks.map((link, index) => (
                        <ListGroup.Item key={index}>
                          <a
                            href={`https://en.wikipedia.org/wiki/${link.title}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.title}
                          </a>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Card
                    className="mt-3 pb-3"
                    style={{ height: useWindowWidth() < 768 ? "40vh" : "60vh" }}
                  >
                    <PageViewsChart
                      pageViewsData={pageViewData?.query?.pages[0]?.pageviews}
                    />
                    <span className="text-muted">
                      Wiki api has limited it to 60 days.
                    </span>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </main>
      </Container>
    </>
  );
}

export default WikiDashboard;
