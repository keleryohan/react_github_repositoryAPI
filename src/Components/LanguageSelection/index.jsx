import { useEffect, useState } from "react";
import SelectSearch, { fuzzySearch } from "react-select-search";
import raw from "../../language_data/available_languages_list.txt";
import "./style.css";

export default function LanguageSelection({ setLanguageList }) {
  const [langListObj, setLangListObj] = useState([]);

  //fetching the language list (of languages github accepts as main languages of repositories) from the local file avaliable_languages_list.txt
  //then turning it into the object format that the <SelectSearch/> component needs to use it as selection options
  useEffect(() => {
    fetch(raw)
      .then((r) => r.text())
      .then((text) => text.split("\n"))
      .then((langList) => {
        langList = langList.map((language) => {
          return { name: language, value: language };
        });
        setLangListObj(langList);
      });
  }, []);

  return (
    <div>
      {langListObj && (
        <SelectSearch
          className="select-search select-search--multiple selectLang"
          options={langListObj}
          multiple
          search
          filterOptions={fuzzySearch}
          placeholder="Select the languages of your choice"
          printOptions="on-focus"
          closeOnSelect={true}
          onChange={(e) => setLanguageList(e)}
        />
      )}
    </div>
  );
}
