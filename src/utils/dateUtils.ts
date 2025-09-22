export const formatDate = (dateString: string): string => {
  if (!dateString || dateString.length !== 10) {
    return dateString;
  }

  const [year, month, day] = dateString.split('-');
  
  return `${day}/${month}/${year}`;
};

export const formatTime = (timeString: string): string => {
  if (!timeString || timeString.length !== 5) {
    return timeString;
  }

  return timeString;
};

export const isPastDate = (dateString: string): boolean => {
  const inputDate = new Date(dateString);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return inputDate < today;
};

export const getCurrentDate = (): string => {
  const today = new Date();
  
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

export const combineDateTime = (dateString: string, timeString: string): Date => {
  const dateTimeString = `${dateString}T${timeString}:00`;
  
  return new Date(dateTimeString);
};