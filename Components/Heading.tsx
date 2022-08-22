/*
 * Heading.tsx
 * ---
 *
 * Contains the styling for h1 and h2 tags
 *
 */

import { ReactNode } from 'react';

// Most tags get `children` as a prop.
type DefaultProps = {
  children?: ReactNode
};

export function Heading1({ children }: DefaultProps) {
  return (
    <div className="py-2 text-3xl italic">
      {children}
    </div>
  );
}

export function Heading2({ children }: DefaultProps) {
  return (
    <div className="py-2 italic">
      {children}
    </div>
  );
}
