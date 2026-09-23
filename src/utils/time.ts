export interface ISTTimeInfo {
  timeStr: string;
  dateStr: string;
  timeZoneStr: string;
  greeting: string;
  appleDateStr: string; // e.g. "Mon Jun 23"
  hours12: string;      // e.g. "9"
  hours24: string;      // e.g. "21"
  minutes: string;      // e.g. "10"
  seconds: string;      // e.g. "37"
  ampm: string;         // e.g. "PM"
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

  // Format date in Asia/Kolkata (full)
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

  // 12-hour breakdown (Asia/Kolkata)
  const time12Parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).formatToParts(now);

  const hours12 = time12Parts.find((p) => p.type === 'hour')?.value || '12';
  const minutes = time12Parts.find((p) => p.type === 'minute')?.value || '00';
  const seconds = time12Parts.find((p) => p.type === 'second')?.value || '00';
  const ampm = (time12Parts.find((p) => p.type === 'dayPeriod')?.value || 'PM').toUpperCase();

  // 24-hour hour
  const hours24Parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    hour12: false,
  }).formatToParts(now);
  const hours24 = hours24Parts.find((p) => p.type === 'hour')?.value || '00';

  // Apple Lockscreen Date: "Mon Jun 23"
  const dateParts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).formatToParts(now);

  const weekday = dateParts.find((p) => p.type === 'weekday')?.value || '';
  const month = dateParts.find((p) => p.type === 'month')?.value || '';
  const day = dateParts.find((p) => p.type === 'day')?.value || '';
  const appleDateStr = `${weekday} ${month} ${day}`;

  return {
    timeStr: timeFormatter.format(now),
    dateStr: dateFormatter.format(now),
    timeZoneStr: "IST (GMT+5:30)",
    greeting,
    appleDateStr,
    hours12,
    hours24,
    minutes,
    seconds,
    ampm,
  };
}
