export const delay = (ms: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(null), ms);
  });
};
