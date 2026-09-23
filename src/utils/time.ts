export interface ISTTimeInfo {
  timeStr: string;
  dateStr: string;
  timeZoneStr: string;
  greeting: string;
}

export function getISTDateTime(): ISTTimeInfo {
  const now = new Date();

  // Format time in Asia/Kolkata
  const timeFormatter = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  // Format date in Asia/Kolkata
  const dateFormatter = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Hour in Asia/Kolkata for greeting
  const hourFormatter = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    hour12: false,
  });

  const hour = parseInt(hourFormatter.format(now), 10);
  let greeting = "Good evening";
  if (hour >= 5 && hour < 12) {
    greeting = "Good morning";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good afternoon";
  }

  return {
    timeStr: timeFormatter.format(now),
    dateStr: dateFormatter.format(now),
    timeZoneStr: "IST (GMT+5:30)",
    greeting,
  };
}
