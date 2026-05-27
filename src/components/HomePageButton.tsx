import { Link } from "react-router-dom";
import { motion } from "motion/react";

interface Props {
  link: string;
  children: React.ReactNode;
}

const MotionLink = motion(Link);

const HomePageButton = ({ link, children }: Props) => {
  return (
    <MotionLink
      to={link}
      className="btn btn-lg btn-light btn-outline-dark"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0, transition: { ease: "easeOut" } }}
      whileHover={{ scale: 1.2 }}
      transition={{ type: "spring", stiffness: 500 }}
    >
      {children}
    </MotionLink>
  );
};

export default HomePageButton;
