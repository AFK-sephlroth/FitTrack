const InputField = ({ label, type = "text", placeholder, value, onChange, onKeyDown }) => {
  return (
    <div className="mb-3.5">
      {label && (
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-800 bg-white outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-100 placeholder-gray-400"
      />
    </div>
  );
};

export default InputField;