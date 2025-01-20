import { useMediaQuery } from "react-responsive";

export const useBreakpointValue = (breakpoints) => {
  const matchingBreakpoint = breakpoints
    .map((breakpoint) => ({
      ...breakpoint,
      matches: useMediaQuery({ minWidth: breakpoint.minWidth }),
    }))
    .filter((b) => b.matches)
    .pop(); // Get the last matching breakpoint

  return matchingBreakpoint?.value;
};
