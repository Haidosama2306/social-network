import React, { useCallback, useEffect, useState } from "react";
import SideBar from "../SideBar";
import Content from "../Content";
import { Outlet, useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const [tabActive, setTabActive] = useState("");

  useEffect(() => {
    handleNavigate(tabActive);
  }, [tabActive]);

  const handleNavigate = useCallback(
    (url) => {
      navigate(url, { replace: true });
    },
    [navigate]
  );
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-1">
        <SideBar tabActive={tabActive} onClickTab={setTabActive} />
        </div>
        <div className="col-span-2 sm:col-span-3">
        <Content>
          <Outlet />
        </Content>
      </div>
    </div>
  );
}

export default Home;
