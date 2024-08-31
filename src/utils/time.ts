import { TimeOption } from "@/components/common/Booking";

export const generateTimeOptionList = (duration: number): TimeOption[] => {
  const durationList: TimeOption[] = [];

  if (duration >= 1440) {
    // Tratamento para dias (1440 minutos = 1 dia)
    const days = Math.floor(duration / 1440);
    const remainderMinutes = duration % 1440;

    for (let i = days; i >= 1; i--) {
      durationList.push({
        value: i * 1440,
        label: `${i} day${i > 1 ? "s" : ""}`,
      });
    }

    if (remainderMinutes > 0) {
      durationList.push({
        value: remainderMinutes,
        label: `${Math.floor(remainderMinutes / 60)} hour${
          remainderMinutes >= 120 ? "s" : ""
        } ${
          remainderMinutes % 60 > 0
            ? `and ${remainderMinutes % 60} min${
                remainderMinutes % 60 > 1 ? "s" : ""
              }`
            : ""
        }`,
      });
    }
  } else if (duration >= 60) {
    // Tratamento para horas
    const hours = Math.floor(duration / 60);
    const remainderMinutes = duration % 60;

    for (let i = hours; i >= 1; i--) {
      durationList.push({
        value: i * 60,
        label: `${i} hour${i > 1 ? "s" : ""}`,
      });
    }

    if (remainderMinutes > 0) {
      durationList.push({
        value: remainderMinutes,
        label: `${remainderMinutes} min${remainderMinutes > 1 ? "s" : ""}`,
      });
    }
  } else {
    // Tratamento para minutos
    let step: number = 1;
    if (duration >= 30) {
      step = 10;
    } else if (duration >= 20) {
      step = 5;
    }

    for (let i = duration; i >= step; i -= step) {
      durationList.push({
        value: i,
        label: `${i} min${i > 1 ? "s" : ""}`,
      });
    }
  }

  console.log("List", durationList);
  console.log("Duration", duration);

  return durationList;
};

export const formatDuration = (minutes: number): string => {
  if (minutes >= 1440) {
    // Tratamento para dias (1440 minutos = 1 dia)
    const days = Math.floor(minutes / 1440);
    const remainderMinutes = minutes % 1440;
    return `${days}${remainderMinutes > 0 ? "+" : ""} day${
      days > 1 ? "s" : ""
    }`;
  } else if (minutes >= 60) {
    // Tratamento para horas (60 minutos = 1 hora)
    const hours = minutes / 60;
    const roundedHours = Math.floor(hours);
    const isDecimal = hours % 1 !== 0;
    const displayHours = isDecimal
      ? `${roundedHours}+`
      : roundedHours.toString();
    return `${displayHours} hour${roundedHours > 1 ? "s" : ""}`;
  } else if (minutes > 0) {
    // Tratamento para minutos
    return `${minutes} min${minutes > 1 ? "s" : ""}`;
  } else {
    return "0 min";
  }
};
