export const generateTimeOptionList = (): string[] => {
  const timeList: string[] = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute++) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      const timeString = `${formattedHour}:${formattedMinute}`;

      timeList.push(timeString);
    }
  }

  return timeList;
};

export const formatDuration = (minutes: number): string => {
  if (minutes >= 1440) {
    const days = Math.floor(minutes / 1440);
    const remainderMinutes = minutes % 1440;    
    return `${days}${remainderMinutes > 0 ? "+" : ""} day${
      days > 1 ? "s" : ""
    }`;
  } else if (minutes >= 60) {
    const hours = minutes / 60;
    const roundedHours = Math.floor(hours);
    const isDecimal = hours % 1 !== 0;
    const displayHours = isDecimal
      ? `${roundedHours}+`
      : roundedHours.toString();
    return `${displayHours} hour${roundedHours > 1 ? "s" : ""}`;
  } else if (minutes > 0) {
    return `${minutes} min${minutes > 1 ? "s" : ""}`;
  } else {
    return "0 min";
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
  };
  return date.toLocaleDateString('en-US', options);
}
