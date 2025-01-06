import useToken from "@/hooks/useToken";
import request from "@/utils/request";
import { useState } from "react";
const RemoveUser = ({ assignamentId, user, setUpdateAssignament }) => {
  const { getToken } = useToken();
  const [hovered, setHovered] = useState(false);

  const removeAssigment = async e => {
    e.stopPropagation();
    const res = await request("tasks/assignament/user", getToken(), {
      method: "POST",
      body: JSON.stringify({
        id: assignamentId,
        isRemove: true,
      }),
    });
    if (res.id) setUpdateAssignament(res.id + res.userId);
  };
  return (
    <>
      <div
        className="relative flex items-center group w-[42px] h-[42px]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex justify-center items-center text-white uppercase w-[42px] h-[42px] rounded-full bg-[#000] relative">
          {user.username ? user.username[0] : "U"}

          {hovered && (
            <div
              onClick={removeAssigment}
              className="absolute cursor-pointer flex justify-center items-center bg-black/70 rounded-full w-full h-full"
            >
              <i className="pi pi-trash text-white text-xl"></i>
            </div>
          )}
        </div>
      </div>
      {hovered && (
        <div className="absolute z-[1000] top-50 translate-x-12  p-2 bg-black text-white text-sm rounded shadow-lg">
          {user.username || "Usuario desconocido"}
        </div>
      )}
    </>
  );
};

export default RemoveUser;
