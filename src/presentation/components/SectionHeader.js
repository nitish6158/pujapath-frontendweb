function SectionHeader({ eyebrow, title, children }) {
  return (
    <div className="section-header">
      {eyebrow ? <p>{eyebrow}</p> : null}
      <h2>{title}</h2>
      {children ? <span>{children}</span> : null}
    </div>
  );
}

export default SectionHeader;
