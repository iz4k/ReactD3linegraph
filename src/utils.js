export const generateMockData = (range) => {
  const today = new Date();
  return Array.from(new Array(range), (x, i) => {
    return {
      date: new Date().setDate(today.getDate() - i),
      value: Math.random() * 10 - 5
    }
  });
}