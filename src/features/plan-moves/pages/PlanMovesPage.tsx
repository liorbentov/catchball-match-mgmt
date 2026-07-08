import { useState } from 'react';
import { usePlanMoves } from '../hooks/usePlanMoves';
import { MoveList } from '../components/MoveList';
import { MoveCanvas } from '../components/MoveCanvas';
import { MoveForm } from '../components/MoveForm';
import { Button } from '../../../shared/components';
import type { MoveCategory, MovePath } from '../types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';

export function PlanMovesPage() {
  const {
    moves,
    selectedMove,
    selectedMoveId,
    setSelectedMoveId,
    createMove,
    deleteMove,
    savePaths,
  } = usePlanMoves();

  const [showForm, setShowForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState<MoveCategory | 'all'>('all');

  function handleCreateMove(data: {
    name: string;
    description: string;
    category: MoveCategory;
    tags: string[];
  }) {
    createMove(data);
    setShowForm(false);
  }

  function handlePathsChange(paths: MovePath[]) {
    if (!selectedMoveId) return;
    savePaths(selectedMoveId, paths);
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Plan Moves</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Create and visualize tactical plays for your team.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Moves list (left column) */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Playbook ({moves.length})</Typography>
              <Button size="sm" onClick={() => setShowForm(true)}>+ New Move</Button>
            </Box>

            {showForm && (
              <MoveForm
                onSubmit={handleCreateMove}
                onCancel={() => setShowForm(false)}
              />
            )}

            <MoveList
              moves={moves}
              selectedId={selectedMoveId}
              onSelect={setSelectedMoveId}
              onDelete={deleteMove}
              filterCategory={filterCategory}
              onFilterChange={setFilterCategory}
            />
          </Box>
        </Grid>

        {/* Canvas / detail (right column) */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {!selectedMove ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 320,
                  border: '2px dashed',
                  borderColor: 'divider',
                  borderRadius: 3,
                  bgcolor: 'grey.50',
                  color: 'text.secondary',
                }}
              >
                <Typography variant="h2" component="span" sx={{ mb: 1.5 }}>📋</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>Select a move to edit its diagram</Typography>
                <Typography variant="body2">or create a new one from the playbook</Typography>
              </Box>
            ) : (
              <>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{selectedMove.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{selectedMove.description}</Typography>
                    {selectedMove.tags.length > 0 && (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 1 }}>
                        {selectedMove.tags.map((t) => (
                          <Chip key={t} label={`#${t}`} size="small" variant="outlined" sx={{ height: 20, fontSize: '0.7rem' }} />
                        ))}
                      </Box>
                    )}
                  </Box>
                  <Button variant="secondary" size="sm" onClick={() => setSelectedMoveId(null)}>
                    Close
                  </Button>
                </Box>

                <MoveCanvas
                  paths={selectedMove.paths}
                  onChange={handlePathsChange}
                />
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
