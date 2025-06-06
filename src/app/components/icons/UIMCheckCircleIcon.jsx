export default function BXCartIcon({ color, width, height }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    width={width ?? "24"}
    height={height ?? "24"}
    viewBox="0 0 24 24">
      <path fill={color ?? "#2cd028"} d="M10.313 16.094a1 1 0 0 1-.708-.293l-2.812-2.813a1 1 0 0 1 1.414-1.414l2.105 2.106l5.481-5.48a1 1 0 0 1 1.414 1.413l-6.188 6.188a1 1 0 0 1-.707.293Z" opacity="0.99"/><path fill={color ?? "#2cd028"} d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2m5.207 7.613l-6.188 6.188a1 1 0 0 1-1.414 0l-2.812-2.813a1 1 0 0 1 1.414-1.414l2.105 2.106l5.481-5.48a1 1 0 0 1 1.414 1.413" opacity="0.5"/></svg>
  );
}
