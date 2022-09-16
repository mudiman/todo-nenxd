import { useEffect } from "react";
import { Button } from "ui";
import Login from "../components/Login";
import { useStore } from "../store/authStore";

export default function Web() {
  const { token, getToken } = useStore();
  useEffect(() => {
    getToken();
  }, []);
  if (!token) return <Login />;

  return (
    <div>
      <h1>Weclome</h1>
      <Button />
    </div>
  );
}
