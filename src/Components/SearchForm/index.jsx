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

    function handleSubmit(event) {
        event.preventDefault();
        const languageQueryText = createLanguageString();
        handleRepositorySearch(languageQueryText);
    }

    function createLanguageString() {
        if (languageList.length === 0) {
            return "";
        }

        var languageQueryText = "";

        languageList.forEach((lang) => {
            languageQueryText = languageQueryText + "+language%3A" + lang;
        });

        return languageQueryText;
    }

    function handleRepositorySearch(languageQueryText) {
        axios
            .get(
                `https://api.github.com/search/repositories?q=${queryText}${languageQueryText}&per_page=50`
                //"https://api.github.com/search/repositories?q=rails+language%3Ajavascript+language%3ACSS&per_page=50"
                ////%3A
            )
            .then((response) => {
                const auxRepList = response.data.items;
                updateRepositories(auxRepList);
            });
    }

    function updateRepositories(repList) {
        setRepositoryList(repList);
    }

    return (
        <div className={"searchForm"}>
            <Form>
                <Form.Group className="mb-3" controlId="form__textInput">
                    <Form.Label>Text Input</Form.Label>
                    <Form.Control
                        placeholder="What do you want to find?"
                        value={queryText}
                        onChange={(e) => setQueryText(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="form__languageSelection">
                    <Form.Label>Language</Form.Label>
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
