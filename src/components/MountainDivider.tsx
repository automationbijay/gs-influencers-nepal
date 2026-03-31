const MountainDivider = () => {
  return (
    <div className="relative h-24 w-full overflow-hidden bg-white">
      <svg 
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        {/* Layered Mountains */}
        <path
          d="M0 120 L0 80 L150 40 L300 90 L450 20 L600 70 L750 30 L900 80 L1050 40 L1200 80 L1200 120 Z"
          className="fill-blue-50/50"
        />
        <path
          d="M0 120 L0 100 L200 60 L400 110 L600 40 L800 90 L1000 50 L1200 100 L1200 120 Z"
          className="fill-indigo-50/30"
        />
        {/* Bottom border line */}
        <path
          d="M0 118 Q 300 110 600 118 T 1200 118"
          fill="none"
          stroke="url(#grad1)"
          strokeWidth="2"
          className="opacity-20"
        />
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default MountainDivider
