import RemoveUser from "./RemoveUser";

export default function Task({ data, showDetails, setCurrentTask, setUpdateTask }) {
  return (
    <div
      onClick={() => {
        setCurrentTask(data.id);
        showDetails(true);
      }}
      className="rounded-lg bg-[#ddd] m-3 p-2 hover:cursor-pointer"
    >
      <span>{data.title}</span>
      <div className="flex gap-5 mt-3" >
        {data.assignedUsers.map((assignament) => (
          <RemoveUser assignamentId={assignament.id} user={assignament.user} setUpdateAssignament={setUpdateTask} />
        ))}
      </div>
    </div>
  );
}
