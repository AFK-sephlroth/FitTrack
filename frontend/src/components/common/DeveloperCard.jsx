const DeveloperCard = ({ initials, name, avatarColor }) => {
  return (
    <article className="bg-orange-50 rounded-2xl p-5 text-center border border-orange-100 hover:-translate-y-1 hover:shadow-lg transition-all">
      <div className={`w-13 h-13 rounded-full ${avatarColor} flex items-center justify-center text-white font-black text-base mx-auto mb-3 shadow-md`}>
        {initials}
      </div>
      <p className="text-xs font-bold text-gray-800 leading-snug">{name}</p>
      <p className="text-xs text-orange-500 font-semibold mt-0.5">{role}</p>
    </article>
  );
};

export default DeveloperCard;