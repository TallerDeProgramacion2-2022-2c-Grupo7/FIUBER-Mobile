export const delay = (ms: number) => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => resolve(null), ms);
  });
};
