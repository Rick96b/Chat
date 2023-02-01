import React from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";

const Time = ({ date, className }) => (
  <div className={className}>
    {format(new Date(date), "HH:mm")}
  </div>
);


export default Time;