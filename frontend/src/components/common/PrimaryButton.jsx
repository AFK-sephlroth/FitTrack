const PrimaryButton = ({ children, onClick, disabled = false, fullWidth = true }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${fullWidth ? "w-full" : ""} bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold py-3 px-6 rounded-xl text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-200 active:translate-y-0 disabled:opacity-60`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;