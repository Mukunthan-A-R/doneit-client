export default function UserBadge({ profile, name }) {
  return (
    <div className="flex items-center gap-2 text-blue-800">
      {profile ? (
        <img />
      ) : (
        <div className="size-7 rounded-full bg-gray-100 text-sm grid place-items-center">
          {name.split(" ")[0][0]}
        </div>
      )}
      <h4 className="text-sm">{name}</h4>
    </div>
  );
}
