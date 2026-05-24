interface Props { n: string; title: string; desc: string; isLast?: boolean; }

const StepCard = ({ n, title, desc }: Props) => (
  <li className="card-surface group p-7">
    <div className="flex items-baseline gap-4">
      <span className="font-display text-[28px] font-bold tnum text-accent leading-none">{n}</span>
      <span className="h-px flex-1 bg-stroke" />
    </div>
    <h3 className="mt-6 h-card text-ivory text-base">{title}</h3>
    <p className="mt-2 text-[13.5px] leading-relaxed text-muted-2">{desc}</p>
  </li>
);

export default StepCard;
