import { useEffect, useState } from "react";
import { getDay, getHour, getMinute, getSecond } from "utils";

const TimeShow = (props: any) => {
  const [content, setConent] = useState<string>("");
  const [type, setType] = useState<string>("");

  useEffect(() => {
    setType(props.type);
    switch (type) {
      case "day":
        setConent(getDay(props.time));
        break;
      case "hour":
        setConent(getHour(props.time));
        break;
      case "minute":
        setConent(getMinute(props.time));
        break;
      case "second":
        setConent(getSecond(props.time));
        break;
    }
  }, [props.time, props.type, type]);

  return (
    <div>
      <div className="w-12 h-6 md:w-24 md:h-12 bg-gradient-to-r from-[#64B999] to-[#25A9E0] m-0 mb-[2px]"></div>
      <div className="w-12 h-6 md:w-24 md:h-12 bg-gradient-to-r from-[#64B999] to-[#25A9E0]"></div>
      <div className="relative font-Conthrax text-white text-center text-xl md:text-4xl bottom-[38px] md:bottom-[68px]">{content}</div>
      <div className="font-Conthrax text-white text-center hidden md:block md:text-sm uppercase -mt-5">{type + "s"}</div>
    </div>
  )
}

export default TimeShow;
