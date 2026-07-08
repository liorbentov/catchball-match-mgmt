import type { Move, MoveCategory } from '../types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';

const CATEGORY_COLORS: Record<MoveCategory, { bg: string; color: string }> = {
  serve: { bg: '#f3e8ff', color: '#7e22ce' },
  catch: { bg: '#dcfce7', color: '#15803d' },
  attack: { bg: '#fee2e2', color: '#b91c1c' },
  defense: { bg: '#dbeafe', color: '#1d4ed8' },
  transition: { bg: '#ffedd5', color: '#c2410c' },
  'set-play': { bg: '#e0e7ff', color: '#4338ca' },
};

const CATEGORY_ICONS: Record<MoveCategory, string> = {
  serve: '🎯',
  catch: '🤝',
  attack: '⚡',
  defense: '🛡️',
  transition: '🔄',
  'set-play': '📌',
};

interface MoveListProps {
  moves: Move[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  filterCategory: MoveCategory | 'all';
  onFilterChange: (cat: MoveCategory | 'all') => void;
}

const CATEGORIES: (MoveCategory | 'all')[] = [
  'all', 'serve', 'catch', 'attack', 'defense', 'transition', 'set-play',
];

export function MoveList({
  moves,
  selectedId,
  onSelect,
  onDelete,
  filterCategory,
  onFilterChange,
}: MoveListProps) {
  const filtered = filterCategory === 'all'
    ? moves
    : moves.filter((m) => m.category === filterCategory);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Category filter */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
        {CATEGORIES.map((cat) => (
          <Chip
            key={cat}
            label={cat === 'all' ? 'All' : `${CATEGORY_ICONS[cat as MoveCategory]} ${cat}`}
            size="small"
            onClick={() => onFilterChange(cat)}
            color={filterCategory === cat ? 'primary' : 'default'}
            variant={filterCategory === cat ? 'filled' : 'outlined'}
            clickable
          />
        ))}
      </Box>

      {/* Move cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {filtered.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
            No moves in this category.
          </Typography>
        )}
        {filtered.map((m) => {
          const catStyle = CATEGORY_COLORS[m.category];
          return (
            <Paper
              key={m.id}
              variant="outlined"
              onClick={() => onSelect(m.id)}
              sx={{
                p: 1.5,
                cursor: 'pointer',
                borderRadius: 2,
                borderColor: selectedId === m.id ? 'primary.main' : 'divider',
                bgcolor: selectedId === m.id ? '#eef2ff' : 'background.paper',
                transition: 'box-shadow 0.15s, border-color 0.15s',
                '&:hover': { boxShadow: 2 },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{m.name}</Typography>
                    <Chip
                      label={`${CATEGORY_ICONS[m.category]} ${m.category}`}
                      size="small"
                      sx={{ bgcolor: catStyle.bg, color: catStyle.color, fontWeight: 500, height: 20, fontSize: '0.7rem' }}
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary"
                    sx={{ display: 'block', mt: 0.5, overflow: 'hidden', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                  >
                    {m.description}
                  </Typography>
                  {m.tags.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.75 }}>
                      {m.tags.map((tag) => (
                        <Typography
                          key={tag}
                          variant="caption"
                          sx={{ px: 0.75, py: 0.25, bgcolor: 'grey.100', borderRadius: 1, color: 'text.secondary' }}
                        >
                          #{tag}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </Box>
                <IconButton
                  size="small"
                  onClick={(e) => { e.stopPropagation(); onDelete(m.id); }}
                  sx={{ color: 'text.disabled', flexShrink: 0 }}
                >
                  🗑️
                </IconButton>
              </Box>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
}
