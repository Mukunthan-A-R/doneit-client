import { handleError } from "../services/utils";

export default function ErrorHandler({ error }) {
  console.log("🚀 ~ ErrorHandler ~ error:", error);
  return (
    <div className="flex flex-1 w-full h-full p-8 justify-center flex-col items-center rounded-md bg-red-50">
      <h3 className="text-xl text-red-500 font-bold">
        Oops! We have run into an issue!
      </h3>
      <p className="text-red-400 font-medium">{handleError(error)}</p>
    </div>
  );
}
