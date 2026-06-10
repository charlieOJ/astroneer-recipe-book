import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import TierButton from "./TierButton";
import HazardButton from "./HazardButton";
import ListElement from "./ListElement";

interface Props {
  elements: any[];
  elementPath: string;
  searchParams?: ("search" | "tiers" | "hazardTypes")[];
  elementKeyFn: (element: any) => string;
}

const SearchableList = ({
  elements,
  searchParams = ["search"],
  elementPath,
  elementKeyFn,
}: Props): React.JSX.Element => {
  const { t } = useTranslation();
  const lastChange = useRef<any>(0);

  const [immediateSearch, setImmediateSearch] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [tiers, setTiers] = useState<number[]>([]);
  const [hazards, setHazards] = useState<("defensive" | "aggressive" | "other")[]>([]);

  const searchResults = elements.filter((element: any) => {
    const isValid = JSON.stringify(element.name).includes(search.toLowerCase());

    if (searchParams.length > 1) {
      let elemIsInTiersSearch = false;
      if (searchParams.includes("tiers") && tiers.length > 0) {
        elemIsInTiersSearch =
          element.tier.filter((item: number) => tiers.includes(item)).length > 0;
        return isValid && elemIsInTiersSearch;
      }

      let elemIsInHazardsSearch = false;

      if (searchParams.includes("hazardTypes") && hazards.length > 0) {
        elemIsInHazardsSearch = hazards.includes(element.type);

        return isValid && elemIsInHazardsSearch;
      }
    }

    return isValid;
  });

  const clearSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearch("");
    setImmediateSearch("");
    setTiers([]);
    setHazards([]);
  };

  const renderClearFilters = (): React.JSX.Element => {
    if (search === "" && tiers.length === 0 && hazards.length === 0) return <></>;

    return (
      <button
        onClick={clearSearch}
        className="btn btn-sm link-underline-opacity-0 link-underline-opacity-100-hover text-muted text-small"
      >
        <i className="fa-regular fa-circle-xmark"></i> {t("searchable_list.filters.clear")}
      </button>
    );
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImmediateSearch(e.target.value);
    if (lastChange.current > 0) {
      clearTimeout(lastChange.current);
    }

    lastChange.current = setTimeout(() => {
      lastChange.current = 0;
      setSearch(e.target.value);
    }, 500);
  };

  const onChangeTiers = (id: number, prevState: boolean) => {
    setTiers((prevTiers: (number | "other")[]): any =>
      prevState ? prevTiers.filter(prevT => prevT !== id) : [...prevTiers, id],
    );
  };

  const onChangeHazards = (type: string, prevState: boolean) => {
    setHazards((prevHazards: ("defensive" | "aggressive" | "other")[]): any => {
      return prevState ? prevHazards.filter(prevH => prevH !== type) : [...prevHazards, type];
    });
  };

  return (
    <div className="searchable-list">
      <div className="my-3">
        <h4 className="text-capitalize">
          {t("searchable_list.filters.title")} {renderClearFilters()}
        </h4>

        <div className="input-group my-3">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            type="search"
            className="form-control"
            placeholder={`${t(`searchable_list.filters.search_placeholder.${elements[0].kind}`)}`}
            aria-label="Search item"
            aria-describedby="basic-addon1"
            onChange={onChange}
            value={immediateSearch}
          />
        </div>

        {searchParams.includes("tiers") && (
          <div>
            <h5 className="text-capitalize">{t("searchable_list.filters.tiers.title")}</h5>

            <div className="my-3">
              {[1, 2, 3, 4, 0].map((printer: number) => {
                return (
                  <TierButton
                    key={printer}
                    id={printer}
                    onChange={onChangeTiers}
                    isChecked={tiers.includes(printer)}
                  >
                    {t(`printers.${printer}`)}
                  </TierButton>
                );
              })}
            </div>
          </div>
        )}

        {searchParams.includes("hazardTypes") && (
          <div>
            <h5 className="text-capitalize">{t("searchable_list.filters.hazards_type.title")}</h5>

            <div className="my-3">
              {[
                { name: "defensive", icon: "leaf" },
                { name: "aggressive", icon: "biohazard" },
                { name: "other", icon: "skull" },
              ].map((type: any) => {
                const hazardType = type.name;

                return (
                  <HazardButton
                    key={hazardType}
                    type={hazardType}
                    onChange={onChangeHazards}
                    isChecked={hazards.includes(hazardType)}
                    icon={type.icon}
                  >
                    {t(`searchable_list.filters.hazards_type.${hazardType}`)}
                  </HazardButton>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="row">
        {searchResults.map((element: any) => (
          <div className="col-xs-12 col-md-3 my-3" key={elementKeyFn(element)}>
            <ListElement element={element} path={elementPath} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchableList;
