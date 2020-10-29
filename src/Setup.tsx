import * as React from "react";
import useAuthToken from "./useAuthToken";

export default function Setup() {
  const [isAuth, token] = useAuthToken();
  if (!isAuth) return <></>;
  return <>Logged in! {token}</>;
}
