import type { ComponentProps } from "react";

function ArrowToUpThinSvg({ ...rest }: ComponentProps<"svg">) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 8 24"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      aria-hidden="true"
    >
      <g>
        <polyline
          fill="none"
          points="1 6 4 3 7 6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        ></polyline>
        <line
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          x1="4"
          x2="4"
          y1="20"
          y2="3"
        ></line>
      </g>
    </svg>
  );
}

export default ArrowToUpThinSvg;
