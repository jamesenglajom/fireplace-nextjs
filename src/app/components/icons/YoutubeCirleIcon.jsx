export default function YoutubeCircleIcon({ color, width, height }) {
  return (
    <svg
      className="mt-[3px]"
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? "48"}
      height={height ?? "48"}
      viewBox="0 0 23 23">
      <path
        fill={color ?? "#fff"}
        d="M11.603 9.833L9.357 8.785C9.161 8.694 9 8.796 9 9.013v1.974c0 .217.161.319.357.228l2.245-1.048c.197-.092.197-.242.001-.334M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m0 13.5c-4.914 0-5-.443-5-3.9s.086-3.9 5-3.9s5 .443 5 3.9s-.086 3.9-5 3.9"
      />
    </svg>
  );
}
