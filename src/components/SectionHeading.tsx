import type { ReactNode } from 'react';
import Reveal from './Reveal';

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
};

const SectionHeading = ({ eyebrow, title, description, action }: SectionHeadingProps) => (
  <Reveal className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
    <div className="max-w-2xl">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </Reveal>
);

export default SectionHeading;
