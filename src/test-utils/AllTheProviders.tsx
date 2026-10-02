import type { PropsWithChildren } from "react";
import { MemoryRouter } from "react-router";

interface AllTheProvidersProps extends PropsWithChildren {
  route: string;
}

function AllTheProviders({ children, route }: AllTheProvidersProps) {
  return <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>;
}

export default AllTheProviders;
