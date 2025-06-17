import Skeleton from "@mui/material/Skeleton";

export default function ProjectCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 3 })
        .fill(1)
        .map((_, i) => (
          <div
            className="max-w-sm p-3 pb-2 gap-1 flex flex-col rounded-lg bg-white border shadow-md border-gray-200"
            key={i}
          >
            <div className="flex justify-between items-start">
              <Skeleton
                animation="wave"
                sx={{ bgcolor: "grey.300" }}
                variant="text"
              >
                <h2 className="text-xl">loading project card</h2>
              </Skeleton>
              <Skeleton
                animation="wave"
                sx={{ bgcolor: "grey.300" }}
                variant="text"
              >
                <h2 className="text-sm">priority</h2>
              </Skeleton>
            </div>

            <Skeleton
              animation="wave"
              sx={{ bgcolor: "grey.300" }}
              variant="text"
              width={"100%"}
            />

            <div className="flex flex-col mt-2">
              <Skeleton
                animation="wave"
                sx={{ bgcolor: "grey.300" }}
                variant="text"
              >
                <p className="text-sm">Deadline</p>
              </Skeleton>
              <Skeleton
                animation="wave"
                sx={{ bgcolor: "grey.300" }}
                variant="text"
                width={"50%"}
              />
            </div>

            <div className="flex flex-col mt-2">
              <Skeleton
                animation="wave"
                sx={{ bgcolor: "grey.300" }}
                variant="text"
              >
                <p className="text-sm">Deadline</p>
              </Skeleton>
              <Skeleton
                animation="wave"
                sx={{ bgcolor: "grey.300" }}
                variant="text"
                width={"50%"}
              />
            </div>

            <Skeleton
              animation="wave"
              sx={{ bgcolor: "grey.300", marginLeft: "auto" }}
              variant="rounded"
              width={"30%"}
              height={40}
            />
          </div>
        ))}
    </div>
  );
}
