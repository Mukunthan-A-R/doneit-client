import Skeleton from "@mui/material/Skeleton";

export default function SkeletonCard() {
  return (
    <div className="w-full sm:w-96 md:w-[400px]">
      <Skeleton
        variant="rectangular"
        width="100%"
        height={200}
        className="rounded-xl"
      />
    </div>
  );
}
