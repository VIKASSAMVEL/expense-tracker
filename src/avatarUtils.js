// Simple avatar color generator based on name
export function getAvatarColor(name) {
  const colors = [
    '#6366f1', '#06b6d4', '#f59e42', '#f43f5e', '#10b981', '#eab308', '#a21caf', '#2563eb', '#db2777', '#059669'
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

export function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase();
}
