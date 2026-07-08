import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './shared/components';
import { DashboardPage } from './pages/DashboardPage';
import { RosterPage } from './features/roster';
import { GameAlignmentPage } from './features/game-alignment';
import { PlanMovesPage } from './features/plan-moves';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/roster" element={<RosterPage />} />
          <Route path="/game-alignment" element={<GameAlignmentPage />} />
          <Route path="/plan-moves" element={<PlanMovesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
