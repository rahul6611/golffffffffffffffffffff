import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function AuthLayout() {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("access")) {
      navigate("/home");
    }
  }, [history]);

  return (
    <>
      {/* <Outlet /> */}
    </>
  );
}
