import React from "react";
import { format } from "date-fns";

const Time = ({ date, timestamp, className }) => (
    <span className={className}>
      {timestamp ?
        format(new Date(date.seconds * 1000), "HH:mm")
        :
        format(new Date(date), "HH:mm")
      }
    </span>
);


export default Time;