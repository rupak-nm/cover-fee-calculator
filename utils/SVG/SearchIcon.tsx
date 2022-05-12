import * as React from "react";

const SearchIcon = ({...props}) => (
  <svg
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.222 13.444A6.222 6.222 0 1 0 7.222 1a6.222 6.222 0 0 0 0 12.444ZM15 15l-3.383-3.383"
      stroke="#9B9B9B"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SearchIcon;
