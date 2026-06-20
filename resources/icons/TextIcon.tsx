const TextIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="4 7 4 4 20 4 20 7" />
    <line x1="9" y1="20" x2="15" y2="20" />
    <line x1="12" y1="4" x2="12" y2="20" />
    {/* 텍스트 옵션 드롭다운을 암시하는 작은 화살표 */}
    {/* <polyline points="17 17 20 20 23 17" /> */}
  </svg>
);

export default TextIcon;
