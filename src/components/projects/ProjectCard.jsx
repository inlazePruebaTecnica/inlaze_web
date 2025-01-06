import { useRouter } from "next/router";

export default function ProjectCard({ data }) {
  const router = useRouter();
  const date = new Date(data.creationDate);
  return (
    <div
      onClick={() => {
        router.push("/project/" + data.id);
      }}
      className="hover:cursor-pointer hover:text-black hover:transition-transform hover:bg-[#bbb] min-w-[240px]  rounded-xl p-5 flex flex-col bg-[--background] text-white"
    >
      <h2 className="font-bold text-xl">{data.title}</h2>
      <p className="mt-3">{data.description}</p>
      <span className="mt-5 text-[0.7rem] text-gray-400">
        fecha de creación {date.toLocaleDateString()}
      </span>
    </div>
  );
}
