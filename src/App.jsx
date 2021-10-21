import SearchForm from "./Components/SearchForm";

//https://api.github.com/search/repositories?q=rails+language%3Ajavascript+language%3ACSS

function App() {
    return (
        <div className="main">
            <SearchForm />
        </div>
    );
}

export default App;
