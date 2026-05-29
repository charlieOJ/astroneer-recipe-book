import { useRef, useState } from "react";

import TierButton from "./TierButton";

interface Props {
  elements: any[];
  searchParams?: ("search" | "tiers")[];
  elementKeyFn: (element: any) => string;
  children: (element: any) => React.ReactNode;
}

const SearchableList = ({
  elements,
  searchParams = ["search"],
  elementKeyFn,
  children,
}: Props): React.JSX.Element => {
  const [search, setSearch] = useState<string>("");
  const [tiers, setTiers] = useState<number[]>([]);

  const lastChange = useRef<any>(0);

  const searchResults = elements.filter((element: any) => {
    if (!searchParams.includes("tiers") || tiers.length === 0)
      return JSON.stringify(element.name).includes(search.toLowerCase());

    return (
      tiers.length > 0 &&
      tiers.includes(element.tier) &&
      JSON.stringify(element.name).includes(search.toLowerCase())
    );
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className="searchable-list">
      <div className="input-group my-4">
        <span className="input-group-text" id="basic-addon1">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
        <input
          type="search"
          className="form-control"
          placeholder="Search item"
          aria-label="Search item"
          aria-describedby="basic-addon1"
          onChange={onChange}
        />
      </div>

      {searchParams.includes("tiers") && (
        <div>
          <h5>Tiers</h5>

          <div>
            <TierButton id={1} onChange={onChangeTiers}>
              Tier 1
            </TierButton>

            <TierButton id={2} onChange={onChangeTiers}>
              Tier 2
            </TierButton>

            <TierButton id={3} onChange={onChangeTiers}>
              Tier 3
            </TierButton>

            <TierButton id={4} onChange={onChangeTiers}>
              Tier 4
            </TierButton>

            <TierButton id={0} onChange={onChangeTiers}>
              Other
            </TierButton>
          </div>
        </div>
      )}

      <div className="row">
        {searchResults.map((element: any) => (
          <div className="col-xs-12 col-md-3 my-3" key={elementKeyFn(element)}>
            {children(element)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchableList;
