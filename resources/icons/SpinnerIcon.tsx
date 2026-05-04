const SpinnerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="9" strokeOpacity="0.25" />
    <path d="M12 3a9 9 0 0 1 9 9" />
  </svg>
);

export default SpinnerIcon;
