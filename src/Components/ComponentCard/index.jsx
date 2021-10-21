import "./style.css";

export default function ComponentCard({
    name,
    description,
    language,
    externalLink,
}) {
    return (
        <div className={"cardEvento"}>
            <div className={"cardEvent__conteudo"}>
                <h2 className={"cardEvent__title"}> {name} </h2>
                <h3 className={"cardEvent__language"}> {language} </h3>
                <div className={"cardEvent__info"}> {description} </div>
                <form action={externalLink} className={"cardEvent__form"}>
                    <button
                        className={"cardEvent__form__button"}
                        type={"submit"}
                    >
                        Visit the repository
                    </button>
                </form>
            </div>
        </div>
    );
}
