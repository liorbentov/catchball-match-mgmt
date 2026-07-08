import { useRef, useState } from 'react';
import type { MovePath, Point } from '../types';
import { generateId } from '../../../shared/utils';
import { Button } from '../../../shared/components';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const SVG_VIEWBOX_WIDTH = 100;
const SVG_VIEWBOX_HEIGHT = 130;

const PATH_COLORS = ['#6366f1', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6', '#06b6d4'];
const PATH_TYPES: { type: MovePath['type']; label: string; dash: string }[] = [
  { type: 'run', label: '🏃 Run', dash: 'none' },
  { type: 'pass', label: '↔️ Pass', dash: '6,4' },
  { type: 'throw', label: '🎯 Throw', dash: '2,2' },
];

interface MoveCanvasProps {
  paths: MovePath[];
  onChange: (paths: MovePath[]) => void;
}

export function MoveCanvas({ paths, onChange }: MoveCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPoints, setCurrentPoints] = useState<Point[]>([]);
  const [selectedColor, setSelectedColor] = useState(PATH_COLORS[0]);
  const [selectedType, setSelectedType] = useState<MovePath['type']>('run');

  function getSVGCoords(e: React.MouseEvent<SVGSVGElement>): Point {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * SVG_VIEWBOX_WIDTH,
      y: ((e.clientY - rect.top) / rect.height) * SVG_VIEWBOX_HEIGHT,
    };
  }

  function handleMouseDown(e: React.MouseEvent<SVGSVGElement>) {
    if (e.button !== 0) return;
    setIsDrawing(true);
    setCurrentPoints([getSVGCoords(e)]);
  }

  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>) {
    if (!isDrawing) return;
    setCurrentPoints((prev) => [...prev, getSVGCoords(e)]);
  }

  function handleMouseUp() {
    if (!isDrawing || currentPoints.length < 2) {
      setIsDrawing(false);
      setCurrentPoints([]);
      return;
    }
    const newPath: MovePath = {
      id: generateId(),
      color: selectedColor,
      type: selectedType,
      points: currentPoints,
    };
    onChange([...paths, newPath]);
    setIsDrawing(false);
    setCurrentPoints([]);
  }

  function undoLast() {
    onChange(paths.slice(0, -1));
  }

  function clearAll() {
    onChange([]);
  }

  function pointsToD(points: Point[]): string {
    if (points.length < 2) return '';
    const [first, ...rest] = points;
    const move = `M ${first.x} ${first.y}`;
    const lines = rest.map((p) => `L ${p.x} ${p.y}`).join(' ');
    return `${move} ${lines}`;
  }

  const getDashArray = (type: MovePath['type']) =>
    PATH_TYPES.find((t) => t.type === type)?.dash ?? 'none';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {/* Drawing tools */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5 }}>
        {/* Color picker */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {PATH_COLORS.map((c) => (
            <Box
              key={c}
              component="button"
              onClick={() => setSelectedColor(c)}
              sx={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                bgcolor: c,
                border: selectedColor === c ? '3px solid #1a1a1a' : '3px solid transparent',
                cursor: 'pointer',
                transform: selectedColor === c ? 'scale(1.2)' : 'scale(1)',
                transition: 'transform 0.15s',
                padding: 0,
              }}
              title={c}
            />
          ))}
        </Box>

        {/* Path type */}
        <ToggleButtonGroup
          value={selectedType}
          exclusive
          onChange={(_, val) => { if (val) setSelectedType(val); }}
          size="small"
        >
          {PATH_TYPES.map(({ type, label }) => (
            <ToggleButton key={type} value={type} sx={{ fontSize: '0.75rem', px: 1.5, py: 0.5 }}>
              {label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Box sx={{ display: 'flex', gap: 0.75, ml: 'auto' }}>
          <Button variant="secondary" size="sm" onClick={undoLast} disabled={paths.length === 0}>↩ Undo</Button>
          <Button variant="danger" size="sm" onClick={clearAll} disabled={paths.length === 0}>Clear</Button>
        </Box>
      </Box>

      {/* SVG canvas */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_VIEWBOX_WIDTH} ${SVG_VIEWBOX_HEIGHT}`}
        style={{
          width: '100%',
          borderRadius: 12,
          border: '4px solid #818cf8',
          cursor: 'crosshair',
          userSelect: 'none',
          background: 'linear-gradient(180deg, #4f46e5 0%, #6366f1 50%, #4f46e5 100%)',
          touchAction: 'none',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Court lines */}
        <line x1="0" y1="65" x2="100" y2="65" stroke="white" strokeWidth="0.5" strokeOpacity="0.6" />
        <line x1="0" y1="43" x2="100" y2="43" stroke="white" strokeWidth="0.3" strokeOpacity="0.3" strokeDasharray="3,2" />
        <line x1="0" y1="87" x2="100" y2="87" stroke="white" strokeWidth="0.3" strokeOpacity="0.3" strokeDasharray="3,2" />

        {/* Saved paths */}
        {paths.map((path) => (
          <path
            key={path.id}
            d={pointsToD(path.points)}
            stroke={path.color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={getDashArray(path.type)}
            fill="none"
            opacity="0.9"
          />
        ))}

        {/* Current drawing path */}
        {isDrawing && currentPoints.length > 1 && (
          <path
            d={pointsToD(currentPoints)}
            stroke={selectedColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={getDashArray(selectedType)}
            fill="none"
            opacity="0.7"
          />
        )}

        {/* Court labels */}
        <text x="2" y="14" fill="white" fontSize="3.5" opacity="0.5">⚡ Attack</text>
        <text x="2" y="63" fill="white" fontSize="3.5" opacity="0.5">⚪ Center</text>
        <text x="2" y="96" fill="white" fontSize="3.5" opacity="0.5">🛡️ Defense</text>
      </svg>

      <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', display: 'block' }}>
        Click and drag to draw paths on the court
      </Typography>
    </Box>
  );
}
