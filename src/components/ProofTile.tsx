interface Props {
  src: string;
  alt: string;
  caption: string;
  tag?: string;
  className?: string;
  imgClassName?: string;
}

const ProofTile = ({ src, alt, caption, tag, className = "", imgClassName = "" }: Props) => (
  <figure className={`group flex h-full flex-col ${className}`}>
    <div className="relative flex-1 overflow-hidden rounded-sm border border-stroke bg-surface-1">
      <img src={src} alt={alt} loading="lazy" decoding="async"
        className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${imgClassName}`} />
      <div aria-hidden className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.04]" />
    </div>
    <figcaption className="pt-4">
      {tag && <div className="label-amber">{tag}</div>}
      <div className="mt-2 text-[14px] leading-snug text-ivory">{caption}</div>
    </figcaption>
  </figure>
);

export default ProofTile;
