import request from "@/utils/request";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import useToken from "@/hooks/useToken";

export default function Comments({ updateComment, currentTask }) {
    const { getToken } = useToken();
    const [comments, setComments] = useState([]);
    useEffect(() => {
        (async () => {
            let res = await request("comments/task/" + currentTask, getToken());
            if(res.length > 0) setComments(res.reverse());
        })();
    }, [updateComment]);
    return <div className="max-h-[350px] overflow-y-auto">
        {comments.map(comment => <Comment data={comment}/>)}
    </div>;
  }
  