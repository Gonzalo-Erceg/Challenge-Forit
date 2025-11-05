interface Iplus {
  w?: number;
  h?: number;
}

const Plus = (props: Iplus) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="lucide lucide-circle-plus-icon lucide-circle-plus"
    {...props}
  >
    <circle cx={12} cy={12} r={10} />
    <path d="M8 12h8M12 8v8" />
  </svg>
);
export default Plus;
