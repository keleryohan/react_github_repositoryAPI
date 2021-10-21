import "./style.css";

export default function ComponentCard({
  name,
  description,
  language,
  externalLink,
}) {
  return (
    <div className={"cardEvent"}>
      <div className={"cardEvent__content"}>
        <h2 className={"cardEvent__title"}> {name} </h2>
        <h3 className={"cardEvent__language"}> {language} </h3>
        <div className={"cardEvent__info"}> {description} </div>
        <form action={externalLink}>
          <button className={"cardEvent__form__button"} type={"submit"}>
            Visit the repository
          </button>
        </form>
      </div>
    </div>
  );
}
