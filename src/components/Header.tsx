import { Link } from "react-router-dom";
import { motion } from "motion/react";

const Header = (): React.JSX.Element => {
  return (
    <header className="d-flex flex-wrap justify-content-center pt-3 mb-4 border-bottom">
      <Link
        to="/"
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
        <span className="ms-2">Astroneer Recipe Book</span>
      </Link>
    </header>
  );
};

export default Header;
