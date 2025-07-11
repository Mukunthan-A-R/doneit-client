import React from "react";

const AvatarStack = ({ users = [], size = "w-9 h-9", maxVisible = 4 }) => {
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ").filter(Boolean);
    const first = parts[0]?.[0] || "";
    const second = parts[1]?.[0] || "";
    return (first + second).toUpperCase();
  };

  const visibleCount = Math.min(users.length, maxVisible);
  const remaining = users.length - maxVisible + 1;

  return (
    <div className="flex -space-x-3">
      {users.slice(0, visibleCount).map((user, idx) => {
        const name = user.name || "";
        const profile = user.profile; // optional image

        // Show "+N" badge on the last visible slot if there are remaining users
        const isLastVisible =
          idx === maxVisible - 1 && users.length > maxVisible;

        if (isLastVisible) {
          return (
            <div
              key={`extra-${idx}`}
              className={`${size} rounded-full bg-gray-200 text-gray-600 text-xs flex items-center justify-center border-2 border-white`}
            >
              +{remaining}
            </div>
          );
        }

        return profile ? (
          <img
            key={user.user_id || idx}
            src={profile}
            alt={name}
            className={`${size} rounded-full object-cover border-2 border-white`}
          />
        ) : (
          <div
            key={user.user_id || idx}
            className={`${size} rounded-full bg-gray-100 text-blue-900 font-bold text-xs flex items-center justify-center border-2 border-white`}
          >
            {getInitials(name)}
          </div>
        );
      })}
    </div>
  );
};

export default AvatarStack;
