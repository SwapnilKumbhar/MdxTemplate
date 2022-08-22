/*
 * Paragraph.tsx
 * ---
 *
 * Contains the styling for p tags
 *
 */

import { ReactNode } from 'react';

type DefaultProps = {
  children?: ReactNode
};

export default function Paragraph({ children }: DefaultProps) {
  return (
    <div className="pt-8">
      {children}
    </div>
  );
}
