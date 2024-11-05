export const truncateMessage = (message: string, maxLength: number = 15): string => {
  return message.length > maxLength
    ? message.slice(0, maxLength) + "..."
    : message;
};

export const getDropdownStyles = (
  mobileLeft: string,
  mobileTop: string,
  desktopLeft: string,
  desktopTop: string,
  isMobile: boolean
) =>
  isMobile
    ? { left: mobileLeft, top: mobileTop } // Mobile styles
    : { left: desktopLeft, top: desktopTop }; // Desktop styles

// Percentage calculation utility
export const calculatePercentage = (total: number, item: number) => {
  if (total === 0) return '0'; // Prevent division by zero
  const percentage = (item / total) * 100;
  return percentage.toFixed(0); // Return the percentage as a whole number
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const groupFieldConfigs = (fields: _ICommonFieldProps[]) => {
  return fields.reduce((groups, field) => {
    const group = field.group || "default"; // Use 'default' if no group is specified
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(field);
    return groups;
  }, {} as Record<string, _ICommonFieldProps[]>);
};


export function formatKey(key: string) {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export const extractImagesFromData = <T= string>(data: Record<string, T>): string[] => {
  for (const key in data) {
    if (Object.hasOwn(data, key) && key.toLowerCase().includes("image")) {
      const value = data[key];
      if (typeof value === "string") {
        return [value];
      }
      if (Array.isArray(value)) {
        return value;
      }
    }
  }
  return [];
};


export const getKeysExcludingField = <T extends object>(
  array: T[],
  trimField: keyof T
): Array<Exclude<keyof T, typeof trimField>> => {
  // Check if the array is not empty
  if (array.length === 0) {
    return []; // Return an empty array if the input array is empty
  }

  // Get keys from the first object and exclude the trimField
  const keys = Object.keys(array[0]).filter((key) => key !== trimField);

  return keys as Array<Exclude<keyof T, typeof trimField>>;
};

export function addSpaceBeforeCapitalLetters(input: string): string {
  // Use regex to match uppercase letters and prepend them with a space
  return input.replace(/([A-Z])/g, " $1").trim();
}