import { useLocation } from "react-router";

export default function LocationDisplay() {
  const location = useLocation();

  return <div data-testid="location">{location.pathname}</div>;
}
