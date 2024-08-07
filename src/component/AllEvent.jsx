import { format } from "timeago.js";
import React from "react";

const AllEvent = ({ events }) => {
  return (
    <div>
      {Object.values(events)?.map((ev, i) => (
        <div key={i} className="flex gap-x-4 item-center">
          <img src={ev.actor?.avatar_url} className="w-16 rounded-full" />
          <h1 className="break-words">
            {ev?.actor?.login} {ev?.type}
            <br />
            {ev?.repo?.name}
            <br />
            <span className="text-sm">{format(ev?.created_at)}</span>
          </h1>
        </div>
      ))}
    </div>
  );
};

export default AllEvent;
