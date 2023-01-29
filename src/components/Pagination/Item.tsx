type ItemProps = {
  content: string;
  label?: string;
};

export function Item({ content, label }: ItemProps) {
  return (
    <li className="page-item">
      <button className="page-link" aria-label={label || 'page-number'}>
        {content}
      </button>
    </li>
  );
}
