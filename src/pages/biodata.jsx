import { useEffect, useRef, useState } from "react";

export default function Biodata({ userBiodata, userData }) {
  const cardRef = useRef([]);
  const [isVisible, setIsVisible] = useState([]);
  const [selectedUser, setSelectedUser] = useState("001");

  const props = {
    userBiodata,
    cardRef,
    isVisible,
    userData,
    setSelectedUser,
    selectedUser,
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const inView = entries.map((entry) =>
        entry.isIntersecting
          ? entry.target.classList[2]
          : null
      );

      inView.forEach((element) =>
        toggleVisibility(element)
      );
    });

    cardRef.current.forEach((current) =>
      observer.observe(current)
    );

    return () =>
      cardRef.current.forEach((current) =>
        observer.unobserve(current)
      );
  }, []);

  const toggleVisibility = (element) => {
    setIsVisible((current) =>
      current.some((x) => x === element)
        ? [...current]
        : [...current, element]
    );
  };

  return (
    <main className="page__biodata">
      <TitleQnA {...props} />
      <div className="content-container">
        <NavQnA {...props} />
        <CardQnA {...props} />
      </div>
    </main>
  );
}

function NavQnA({
  userData,
  setSelectedUser,
  selectedUser,
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <ul className="biodata-nav">
      <h2 onClick={() => setIsOpen((cur) => !cur)}>
        <p>NAVIGATION</p>
        <i
          className={`bx bx-chevron-up ${
            isOpen ? "open" : ""
          }`}
        ></i>
      </h2>
      <div
        className={`accordion-container ${
          isOpen ? "open" : ""
        }`}
      >
        <div>
          {userData.map((user, i) => (
            <li
              className={`nav-user ${
                selectedUser === user.id ? "selected" : ""
              }`}
              key={`key-${i}`}
              onClick={() => {
                setSelectedUser(user.id);
              }}
            >
              {user.name}
            </li>
          ))}
        </div>
      </div>
    </ul>
  );
}

function TitleQnA({ userBiodata }) {
  return (
    <article
      className="biodata-heading"
      data-scroll
      data-scroll-speed="2"
    >
      <div className="biodata-container">
        <header>
          <p className="top">
            <span>Nama:</span>
            <p className="year">
              {userBiodata[0].angkatan}
            </p>
          </p>
          <h1 className="name" data-scroll>
            {userBiodata[0].nama}.
          </h1>
          <div className="bottom">
            <p className="position">
              {userBiodata[0].jabatan}
              <i className="bx bx-chevron-right"></i>
            </p>
            <p className="copyright">
              © Joseph Christian Yusmita - 2702295695
            </p>
          </div>
        </header>
        <div className="secondary"></div>
      </div>
    </article>
  );
}

function CardQnA({ userBiodata, cardRef, isVisible }) {
  return (
    <ul className="biodata__container">
      {userBiodata.map((biodata, i) =>
        i > 1 ? (
          <li
            className={`biodata ${
              isVisible.find((x) => x === `biodata-${i}`)
                ? "shown"
                : "hidden"
            } biodata-${i}`}
            key={biodata.question + i}
            ref={(element) => {
              cardRef.current[i] = element;
            }}
          >
            <div className="numbering">{`${
              i - 1 < 10 ? 0 : ""
            }${i - 1}`}</div>
            <div className="content">
              <p className="question">
                Q : {biodata.question}
              </p>
              <p className="answer">A : {biodata.answer}</p>
            </div>
          </li>
        ) : null
      )}
    </ul>
  );
}
