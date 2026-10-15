import type { ComponentProps } from "react";

function ArrowToLeftSvg({ ...rest }: ComponentProps<"svg">) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 57 54"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...rest}
    >
      <path
        d="M2 27L27 52M54.0833 27H2H54.0833ZM2 27L27 2L2 27Z"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ArrowToLeftSvg;
