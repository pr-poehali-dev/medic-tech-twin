interface ThyroidPart {
  id: string;
  name: string;
  normalSize: string;
  hypothyroidSize: string;
  normalColor: string;
  hypothyroidColor: string;
  description: string;
  changes: string;
  path?: string;
  pathNormal?: string[];
  pathHypothyroid?: string[];
  circles?: Array<{ cx: number; cy: number; r: number }>;
}

interface ThyroidModelProps {
  isHypothyroid: boolean;
  rotation: { x: number; y: number; z: number };
  transparency: number;
  showLabels: boolean;
  selectedPart: string | null;
  setSelectedPart: (part: string | null) => void;
  thyroidParts: ThyroidPart[];
}

const ThyroidModel = ({
  isHypothyroid,
  rotation,
  transparency,
  showLabels,
  selectedPart,
  setSelectedPart,
  thyroidParts
}: ThyroidModelProps) => {
  const opacity = 1 - transparency / 100;

  const getTransform = () => {
    return `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`;
  };

  return (
    <svg 
      viewBox="0 0 360 400" 
      className="w-full h-full"
      style={{ transform: getTransform(), transformStyle: 'preserve-3d' }}
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="normalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E07A5F" stopOpacity={opacity} />
          <stop offset="100%" stopColor="#F4A261" stopOpacity={opacity} />
        </linearGradient>
        <linearGradient id="hypothyroidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9A6D63" stopOpacity={opacity} />
          <stop offset="100%" stopColor="#8B7355" stopOpacity={opacity} />
        </linearGradient>
        <pattern id="texture" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="1" fill="rgba(0,0,0,0.1)" />
        </pattern>
      </defs>

      {/* Trachea outline */}
      <rect 
        x="165" 
        y="240" 
        width="30" 
        height="100" 
        fill="none" 
        stroke="#94A3B8" 
        strokeWidth="2"
        strokeDasharray="4,4"
        opacity="0.3"
      />
      
      {/* Right Lobe */}
      <g
        onClick={() => setSelectedPart('right-lobe')}
        className="cursor-pointer hover:opacity-80 transition-opacity"
      >
        <path
          d={thyroidParts[0].path}
          fill={isHypothyroid ? "url(#hypothyroidGradient)" : "url(#normalGradient)"}
          stroke={selectedPart === 'right-lobe' ? '#3B82F6' : '#64748B'}
          strokeWidth={selectedPart === 'right-lobe' ? '3' : '2'}
          filter={selectedPart === 'right-lobe' ? 'url(#glow)' : ''}
        />
        {isHypothyroid && (
          <path d={thyroidParts[0].path} fill="url(#texture)" />
        )}
        {showLabels && (
          <text x="140" y="180" fontSize="12" fill="white" fontWeight="bold" textAnchor="middle">
            R
          </text>
        )}
      </g>

      {/* Left Lobe */}
      <g
        onClick={() => setSelectedPart('left-lobe')}
        className="cursor-pointer hover:opacity-80 transition-opacity"
      >
        <path
          d={thyroidParts[1].path}
          fill={isHypothyroid ? "url(#hypothyroidGradient)" : "url(#normalGradient)"}
          stroke={selectedPart === 'left-lobe' ? '#3B82F6' : '#64748B'}
          strokeWidth={selectedPart === 'left-lobe' ? '3' : '2'}
          filter={selectedPart === 'left-lobe' ? 'url(#glow)' : ''}
        />
        {isHypothyroid && (
          <path d={thyroidParts[1].path} fill="url(#texture)" />
        )}
        {showLabels && (
          <text x="220" y="180" fontSize="12" fill="white" fontWeight="bold" textAnchor="middle">
            L
          </text>
        )}
      </g>

      {/* Isthmus */}
      <g
        onClick={() => setSelectedPart('isthmus')}
        className="cursor-pointer hover:opacity-80 transition-opacity"
      >
        <path
          d={thyroidParts[2].path}
          fill={isHypothyroid ? thyroidParts[2].hypothyroidColor : thyroidParts[2].normalColor}
          fillOpacity={opacity}
          stroke={selectedPart === 'isthmus' ? '#3B82F6' : '#64748B'}
          strokeWidth={selectedPart === 'isthmus' ? '3' : '2'}
          filter={selectedPart === 'isthmus' ? 'url(#glow)' : ''}
        />
        {showLabels && (
          <text x="180" y="192" fontSize="10" fill="white" textAnchor="middle">
            Перешеек
          </text>
        )}
      </g>

      {/* Blood Vessels */}
      <g
        onClick={() => setSelectedPart('blood-vessels')}
        className="cursor-pointer"
        opacity={opacity}
      >
        {(isHypothyroid ? thyroidParts[3].pathHypothyroid : thyroidParts[3].pathNormal)?.map((path, idx) => (
          <path
            key={idx}
            d={path}
            fill="none"
            stroke={isHypothyroid ? thyroidParts[3].hypothyroidColor : thyroidParts[3].normalColor}
            strokeWidth={isHypothyroid ? '2' : '3'}
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* Follicles (microscopic representation) */}
      {transparency < 50 && (
        <g
          onClick={() => setSelectedPart('follicles')}
          className="cursor-pointer"
          opacity={opacity * 0.6}
        >
          {thyroidParts[4].circles?.map((circle, idx) => (
            <circle
              key={idx}
              cx={circle.cx}
              cy={circle.cy}
              r={isHypothyroid ? circle.r * 0.7 : circle.r}
              fill={isHypothyroid ? thyroidParts[4].hypothyroidColor : thyroidParts[4].normalColor}
              stroke="#64748B"
              strokeWidth="1"
            />
          ))}
        </g>
      )}

      {/* Pathology markers for hypothyroid */}
      {isHypothyroid && transparency < 70 && (
        <>
          {/* Fibrosis areas */}
          <ellipse cx="145" cy="160" rx="15" ry="10" fill="#6B7280" opacity="0.4" />
          <ellipse cx="215" cy="210" rx="12" ry="8" fill="#6B7280" opacity="0.4" />
          
          {/* Inflammation markers */}
          <circle cx="130" cy="190" r="4" fill="#F59E0B" opacity="0.7" />
          <circle cx="160" cy="210" r="3" fill="#F59E0B" opacity="0.7" />
          <circle cx="200" cy="170" r="3" fill="#F59E0B" opacity="0.7" />
          <circle cx="225" cy="195" r="4" fill="#F59E0B" opacity="0.7" />
        </>
      )}

      {/* Anatomical labels */}
      {showLabels && (
        <>
          <line x1="120" y1="150" x2="80" y2="120" stroke="#94A3B8" strokeWidth="1" />
          <text x="75" y="115" fontSize="10" fill="#94A3B8">Верхний полюс</text>
          
          <line x1="120" y1="220" x2="80" y2="260" stroke="#94A3B8" strokeWidth="1" />
          <text x="75" y="270" fontSize="10" fill="#94A3B8">Нижний полюс</text>
          
          <line x1="180" y1="240" x2="180" y2="290" stroke="#94A3B8" strokeWidth="1" />
          <text x="170" y="305" fontSize="10" fill="#94A3B8">Трахея</text>
        </>
      )}
    </svg>
  );
};

export default ThyroidModel;
