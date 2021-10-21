import { Button, Form, Row, Col } from "react-bootstrap";
import LanguageSelection from "../LanguageSelection";
import axios from "axios";
import { useState } from "react";
import "./style.css";
import ComponentCard from "../ComponentCard";

export default function SearchForm() {
  const [repositoryList, setRepositoryList] = useState([]);
  const [languageList, setLanguageList] = useState([]);
  const [queryText, setQueryText] = useState(" ");

  //once the submit is made, the languages chosen by the user will be transformed in a string and inserted into the API link together with the query text
  function handleSubmit(event) {
    event.preventDefault();
    const languageQueryText = createLanguageString();
    handleRepositorySearch(languageQueryText);
  }

  //transforming the languages chosen by the user into a string with the format used by github's API
  function createLanguageString() {
    if (languageList.length === 0) {
      return "";
    }

    var languageQueryText = "";

    //the API separates each language by an '+language%3A{language_name}'. using such format we can filter the repositories using multiple languages
    languageList.forEach((lang) => {
      languageQueryText = languageQueryText + "+language%3A" + lang;
    });

    return languageQueryText;
  }

  //auxiliary function to set the repository list once they are fetched
  function updateRepositories(repList) {
    setRepositoryList(repList);
  }

  //once the submit is made, we fetch the repositories using the API. inserting into the URL the filter options (query text and languages)
  //then we set the repositoryList and React updates the page to include the new repositories
  function handleRepositorySearch(languageQueryText) {
    axios
      .get(
        `https://api.github.com/search/repositories?q=${queryText}${languageQueryText}&per_page=50`
      )
      .then((response) => {
        const auxRepList = response.data.items;
        updateRepositories(auxRepList);
      });
  }

  return (
    <div className={"searchForm"}>
      <Form>
        <Form.Group className="mb-3" controlId="form__textInput">
          <Form.Label>Insert the repositories text</Form.Label>
          <Form.Control
            placeholder={"What do you want to find?"}
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="form__languageSelection">
          <Form.Label>Insert the repositories language(s)</Form.Label>
          <LanguageSelection setLanguageList={setLanguageList} />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="form__button"
          onClick={(event) => handleSubmit(event)}
        >
          Search
        </Button>
      </Form>
      <div className={"repositoryList__container"}>
        <Row>
          {repositoryList &&
            repositoryList.map((repository, i) => {
              return (
                <Col
                  xs={"12"}
                  md={"6"}
                  lg={"4"}
                  className={"repositoryList__column"}
                  key={i.toString()}
                >
                  <ComponentCard
                    name={repository.name}
                    description={repository.description}
                    language={repository.language}
                    externalLink={repository.html_url}
                  />
                </Col>
              );
            })}
        </Row>
      </div>
    </div>
  );
}
