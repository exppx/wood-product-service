import type { PropsWithChildren } from "react";
import { MemoryRouter } from "react-router";

function AllTheProviders({ children }: PropsWithChildren) {
  return <MemoryRouter>{children}</MemoryRouter>;
}

export default AllTheProviders;
