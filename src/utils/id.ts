let counter = 0;

export const nextId = (): string => {
  counter += 1;
  return `task-${counter}`;
};

export const resetIdCounter = (): void => {
  counter = 0;
};
