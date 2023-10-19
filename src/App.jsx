import { useEffect, useRef, useState } from "react";
import { userBiodata } from "./data/data";
import Biodata from "./pages/biodata";
import {
  LocomotiveScrollProvider,
  useLocomotiveScroll,
} from "react-locomotive-scroll";

import { userData } from "./data/navData";

function App() {
  const containerRef = useRef(null);
  const [selectedUser, setSelectedUser] = useState("001");

  const props = {
    selectedUser,
    setSelectedUser,
    userBiodata,
    userData,
  };

  return (
    <LocomotiveScrollProvider
      options={{ smooth: true }}
      watch={[selectedUser]}
      containerRef={containerRef}
      reloadOnContextChange={true}
      repeat={true}
    >
      <div data-scroll-container>
        <Biodata {...props} />;
      </div>
    </LocomotiveScrollProvider>
  );
}

export default App;
