import { useEffect, useRef, useState } from "react";

export default function Biodata({
  userBiodata,
  userData,
  setSelectedUser,
  selectedUser,
}) {
  const cardRef = useRef([]);
  const [isVisible, setIsVisible] = useState([]);

  // Find the biodata from the selected user ID
  const currentBiodata =
    userBiodata.find((user) => user.id === selectedUser)
      ?.data || [];

  const props = {
    userBiodata: currentBiodata,
    cardRef,
    isVisible,
    userData,
    setSelectedUser,
    selectedUser,
  };

  useEffect(() => {
    const elements = document.querySelectorAll(".biodata");

    const observer = new IntersectionObserver((entries) => {
      const inView = entries?.map((entry) =>
        entry.isIntersecting
          ? entry.target.classList[2]
          : null
      );

      inView.forEach((element) =>
        toggleVisibility(element)
      );
    });

    elements?.forEach((current) =>
      observer.observe(current)
    );

    return () => {
      observer.disconnect();
    };
  }, [selectedUser]);

  const toggleVisibility = (element) => {
    setIsVisible((current) =>
      current.some((x) => x === element)
        ? [...current]
        : [...current, element]
    );
  };

  const currentUser = userData.find(
    (data) => data.id === selectedUser
  );

  return (
    <main className="page__biodata" data-scroll-section>
      <TitleQnA {...props} />
      <div className="content-container">
        <NavQnA {...props} />
        {currentUser.signature ? (
          <div
            className="signature"
            data-scroll
            data-scroll-speed="3"
          >
            <img src={currentUser?.signature} alt="" />
          </div>
        ) : null}
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

function TitleQnA({ userBiodata = [] }) {
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
              {userBiodata[0]?.angkatan}
            </p>
          </p>
          <h1 className="name" data-scroll>
            {userBiodata[0]?.nama}.
          </h1>
          <div className="bottom">
            <p className="position">
              <div className="position-content">
                {userBiodata[0]?.jabatan}
                <i className="bx bx-chevron-right"></i>
              </div>
            </p>
            <p className="copyright">
              © Joseph Christian Yusmita - 2702295695
            </p>
          </div>
        </header>
      </div>
    </article>
  );
}

function CardQnA({ userBiodata, cardRef, isVisible }) {
  return (
    <ul className="biodata__container">
      {userBiodata.map((biodata, i) => {
        return i > 1 ? (
          <li
            className={`biodata ${
              isVisible.find((x) => x === `biodata-${i}`)
                ? "shown"
                : "hidden"
            } biodata-${i}`}
            key={biodata.question + i}
            // ref={(element) => {
            //   cardRef.current[i] = element;
            // }}
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
        ) : null;
      })}
    </ul>
  );
}
