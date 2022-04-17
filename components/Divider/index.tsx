const Divider = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`border-0 border-t border-divider-gray ${className}`}></div>
  );
};

export default Divider;
