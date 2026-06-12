import { Link, useHref, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Dropdown } from "react-bootstrap";
import { motion } from "motion/react";

import ThemeSwitch from "./ThemeSwitch";

const Header = (): React.JSX.Element => {
  const { lng } = useParams();
  const { t, i18n } = useTranslation();
  const basename = useHref("/");

  let languages = ["en"];
  if (i18n.options.supportedLngs) {
    languages = i18n.options.supportedLngs.filter(
      (lng: string) => lng !== "cimode" && lng !== i18n.language,
    );
  }

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    const regex = new RegExp(
      `(${basename}\/fr\/)|(${basename}\/en\/)|(${basename}\/)|(${basename})`,
      "gi",
    );

    window.location.href =
      window.origin + window.location.pathname.replace(regex, `${basename}/${lang}/`);
  };

  return (
    <header className="d-flex flex-wrap justify-content-center pt-3 mb-4 border-bottom pb-1">
      <Link
        to={`/${lng ? lng + "/" : ""}`}
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
        <motion.img
          src="https://static.wikia.nocookie.net/astroneer_gamepedia/images/7/74/Icon_Astroneer.png/revision/latest"
          alt="Astroneer logo"
          width="40"
          whileHover={{
            scale: 1.2,
            rotate: [-30, -50, -30, 0, 30, 50, 30, 0],
            transition: { type: "spring", stiffness: 500, duration: 0.8 },
          }}
        />
        <span className="ms-2">{t("navbar.name")}</span>
      </Link>

      <div className="text-end d-flex align-items-center">
        <ThemeSwitch />

        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-lang" size="sm">
            {i18n.language.toUpperCase()}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {languages.map((locale: string) => (
              <Dropdown.Item key={locale} as="button" onClick={() => changeLang(locale)}>
                {locale.toUpperCase()}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
