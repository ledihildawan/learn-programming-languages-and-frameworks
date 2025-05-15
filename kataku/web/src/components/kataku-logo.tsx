export const KataKuLogo = ({ width = 200, height = 200 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle representing safe space */}
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="#f5f5f5"
        stroke="#3498db"
        stroke-width="4"
      />

      {/* Speech bubble representing expression */}
      <path
        d="M60 80 C60 70 70 60 90 60 L130 60 C150 60 160 70 160 80 L160 120 C160 130 150 140 130 140 L110 140 L90 160 L90 140 L70 140 C50 140 40 130 40 120 Z"
        fill="#3498db"
        stroke="#2980b9"
        stroke-width="2"
      />

      {/* Text "KataKu" */}
      <text
        x="100"
        y="110"
        fontFamily="Arial, sans-serif"
        fontSize="24"
        fontWeight="bold"
        textAnchor="middle"
        fill="#ffffff"
      >
        KataKu
      </text>

      {/* Small pen icon representing writing */}
      <path
        d="M150 170 L140 160 L145 155 L155 165 Z M138 158 L125 175 L120 165 Z"
        fill="#2980b9"
      />
    </svg>
  );
};
