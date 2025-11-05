interface ICheckProps {
  w?: number;
  h?: number;
  className?: string;
}

const Check = (props: ICheckProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={props.w || 24}
    height={props.h || 24}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`lucide lucide-check-icon lucide-check ${props.className}`}
    {...props}
  >
    <path d="M20 6 9 17l-5-5" stroke="#e8f9ff" strokeWidth={8} />

    <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth={2} />
  </svg>
);
export default Check;
