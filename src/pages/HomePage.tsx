import { AnimatePresence, motion } from "motion/react";
import HomePageButton from "../components/HomePageButton";

const HomePage = (): React.JSX.Element => {
  return (
    <div className="p-5 bg-body-tertiary main-bg">
      <AnimatePresence mode="sync">
        <motion.div
          className="container-fluid py-5 bg-opacity-75 rounded-3 bg-light mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { ease: "easeOut" } }}
        >
          <h1 className="display-5 fw-bold">Welcome to the Astroneer recipe book</h1>
          <div className="row">
            <p className="col-md-12 fs-4">
              Looking for a specific item, but you don't know who to craft it ? Annoy to look where
              you can find this resource or if you need to craft it ? Finally a place to know it all
              in one click !
            </p>
          </div>

          <div className="row">
            <div className="align-items-center d-flex flex-wrap justify-content-evenly">
              <HomePageButton link="resources">Resources</HomePageButton>
              <HomePageButton link="items">Items</HomePageButton>
              <HomePageButton link="planets">Planets</HomePageButton>
              <HomePageButton link="hazards">Hazards</HomePageButton>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
