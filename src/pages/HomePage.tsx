import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "motion/react";

import HomePageButton from "../components/HomePageButton";

const HomePage = (): React.JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="p-5 bg-body-tertiary main-bg">
      <AnimatePresence mode="sync">
        <motion.div
          className="container-fluid py-5 bg-opacity-75 rounded-3 bg-light mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { ease: "easeOut" } }}
        >
          <h1 className="display-5 fw-bold">{t("homepage.title")}</h1>
          <div className="row">
            <p className="col-md-12 fs-4">{t("homepage.text")}</p>
          </div>

          <div className="row">
            <div className="align-items-center d-flex flex-wrap justify-content-evenly">
              <HomePageButton link="resources">{t("homepage.btn_resources")}</HomePageButton>
              <HomePageButton link="items">{t("homepage.btn_items")}</HomePageButton>
              <HomePageButton link="planets">{t("homepage.btn_planets")}</HomePageButton>
              <HomePageButton link="hazards">{t("homepage.btn_hazards")}</HomePageButton>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
