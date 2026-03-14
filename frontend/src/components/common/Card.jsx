const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-orange-50 ${className}`}>
      {children}
    </div>
  );
};

export default Card;