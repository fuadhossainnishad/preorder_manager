'use client';

import { useState } from 'react';

interface StatusToggleProps {
  active: boolean;
  onToggle: () => Promise<void> | void;
  disabled?: boolean;
}

export const StatusToggle = ({
  active,
  onToggle,
  disabled = false,
}: StatusToggleProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isActive, setIsActive] = useState(active);

  const handleToggle = async () => {
    if (disabled || isUpdating) return;

    setIsUpdating(true);
    setIsActive(!isActive);

    try {
      await onToggle();
    } catch (error) {
      setIsActive(active);
      console.error('Failed to toggle status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isActive}
      aria-label={`Toggle status ${isActive ? 'on' : 'off'}`}
      onClick={handleToggle}
      disabled={disabled || isUpdating}
      className="status-toggle "
    >
      <input
        type="checkbox"
        checked={isActive}
        onChange={() => { }}
        className="status-toggle-input "
        disabled={disabled || isUpdating}
      />
    </button>
  );
};