export function generateId(): string {
  return Math.random().toString(36).slice(2, 11);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getPositionLabel(position: string): string {
  const labels: Record<string, string> = {
    attacker: 'Attacker',
    defender: 'Defender',
    catcher: 'Catcher',
    center: 'Center',
    bench: 'Bench',
  };
  return labels[position] ?? position;
}

export function getPositionColor(position: string): string {
  const colors: Record<string, string> = {
    attacker: '#ef4444',
    defender: '#3b82f6',
    catcher: '#22c55e',
    center: '#f59e0b',
    bench: '#6b7280',
  };
  return colors[position] ?? '#6b7280';
}
