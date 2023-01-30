type ItemProps = {
  content: string;
  label?: string;
  disabled?: boolean;
  active?: boolean;
};

export function Item({ content, label, disabled, active }: ItemProps) {
  return (
    <li
      className={`page-item ${disabled ? 'disabled' : ''} ${
        active ? 'active' : ''
      }`}
    >
      <button className="page-link" aria-label={label || 'page-number'}>
        {content}
      </button>
    </li>
  );
}
