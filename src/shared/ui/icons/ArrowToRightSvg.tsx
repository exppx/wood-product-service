import type { ComponentProps } from "react";

function ArrowToRightSvg({ ...rest }: ComponentProps<"svg">) {
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
        d="M54.0833 27L29.0833 52M2 27H54.0833H2ZM54.0833 27L29.0833 2L54.0833 27Z"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ArrowToRightSvg;
