export function Logo({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13.9999 25.6667L3.6665 19.8333V8.16667L13.9999 2.33334L24.3332 8.16667V19.8333L13.9999 25.6667Z"
        fill="url(#paint0_linear_1_2)"
      />
      <path
        d="M14 5.25L16.205 9.895L21.5 10.5L17.5 14.125L18.63 19.25L14 16.6625L9.37 19.25L10.5 14.125L6.5 10.5L11.795 9.895L14 5.25Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1_2"
          x1="3.6665"
          y1="2.33334"
          x2="24.3332"
          y2="25.6667"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#78BE20" />
          <stop offset="1" stopColor="#00A9CE" />
        </linearGradient>
      </defs>
    </svg>
  );
}
