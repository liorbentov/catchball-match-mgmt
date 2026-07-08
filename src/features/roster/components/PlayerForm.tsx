import { useState } from 'react';
import { Player, PlayerPosition } from '../../../shared/types';
import { Button } from '../../../shared/components';

const positions: PlayerPosition[] = ['attacker', 'defender', 'catcher', 'center', 'bench'];

interface PlayerFormProps {
  initial?: Partial<Player>;
  onSubmit: (data: Omit<Player, 'id'>) => void;
  onCancel: () => void;
}

export function PlayerForm({ initial, onSubmit, onCancel }: PlayerFormProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [number, setNumber] = useState(String(initial?.number ?? ''));
  const [position, setPosition] = useState<PlayerPosition>(initial?.position ?? 'defender');
  const [isActive, setIsActive] = useState(initial?.isActive ?? true);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !number) return;
    onSubmit({ name: name.trim(), number: Number(number), position, isActive });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Player name"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Jersey Number
        </label>
        <input
          type="number"
          required
          min={1}
          max={99}
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="1–99"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Position
        </label>
        <select
          value={position}
          onChange={(e) => setPosition(e.target.value as PlayerPosition)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {positions.map((p) => (
            <option key={p} value={p}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isActive"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="rounded"
        />
        <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
          Active player
        </label>
      </div>
      <div className="flex gap-2 justify-end pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Player</Button>
      </div>
    </form>
  );
}
