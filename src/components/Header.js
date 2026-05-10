const Header = () => {
  return (
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
        <img
          src="https://static.wikia.nocookie.net/astroneer_gamepedia/images/7/74/Icon_Astroneer.png/revision/latest"
          alt="Astroneer logo"
          width="40"
        />
        <span className="ms-2">Astroneer Recipe Book</span>
      </a>
    </header>
  );
};

export default Header;
