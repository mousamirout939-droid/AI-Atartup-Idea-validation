export default function Card({ children, className = '', ...rest }) {
  return (
    <div className={`card p-6 ${className}`} {...rest}>
      {children}
    </div>
  );
}
