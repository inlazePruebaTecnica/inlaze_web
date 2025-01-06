import useToken from "@/hooks/useToken";
import request from "@/utils/request";
import { useEffect, useState } from "react";

export default function Comment({ data }) {
  const { getToken } = useToken();
  const [user, setUser] = useState({});
  const date = new Date(data.date.split("T")[0]);

  useEffect(() => {
    (async () => {
      let res = await request("users/" + data.user_id, getToken());
      if (res.username) setUser(res);
    })();
  }, []);
  return (
    <div className="mt-3 py-2 px-5 border-[#ccc] border-2 rounded-lg">
      <div className="flex gap-2">
        <div className="flex justify-center items-center text-white uppercase w-[32px] h-[32px] rounded-full bg-[#000]">
          {user.username ? user.username[0] : "u"}
        </div>
        <span className=" text-[#aaa] font-bold text-[11px]">
          {date.toLocaleDateString()}
        </span>
      </div>
      <span className="ml-3">{data.comment}</span>
    </div>
  );
}
