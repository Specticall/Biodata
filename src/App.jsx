import { useRef } from "react";
import { userBiodata } from "./data/data";
import Biodata from "./pages/biodata";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { userData } from "./data/navData";

function App() {
  const containerRef = useRef(null);

  return (
    <LocomotiveScrollProvider
      options={{ smooth: true }}
      watch={[]}
      containerRef={containerRef}
    >
      <div data-scroll-container>
        <Biodata
          userBiodata={userBiodata}
          userData={userData}
        />
        ;
      </div>
    </LocomotiveScrollProvider>
  );
}

export default App;
