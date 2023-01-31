type ItemProps = {
  content: number | string;
  label?: string;
  disabled?: boolean;
  active?: boolean;
  handleClick: () => void;
};

export function Item({
  content,
  label,
  disabled,
  active,
  handleClick,
}: ItemProps) {
  return (
    <li
      className={`page-item ${disabled ? 'disabled' : ''} ${
        active ? 'active' : ''
      }`}
    >
      <button
        onClick={handleClick}
        className="page-link"
        aria-label={label || 'page-number'}
      >
        {content}
      </button>
    </li>
  );
}
