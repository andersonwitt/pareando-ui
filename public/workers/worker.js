function compareArrays(a1, a2) {
  return a1.length === a2.length && a1.every((value) => a2.includes(value));
}

const createGroupShuffled = (items = []) => {
  let results = [];

  for (let i = 0; i < items.length - 1; i++) {
    for (let j = i + 1; j < items.length; j++) {
      results.push(items[i] + " " + items[j]);
    }
  }

  results = results
    .sort(() => Math.random() - 0.5)
    .map((item) => item.split(" "));

  const n = items.length;
  const result = [...new Array(items.length)].map(() => []);

  const wordsPerLine = Math.ceil(results.length / items.length);

  for (let line = 0; line < n; line++) {
    for (let i = 0; i < wordsPerLine; i++) {
      const value = results[i + line * wordsPerLine];
      if (!value) continue;
      result[line].push(value);
    }
  }

  return result.filter(array => array?.length);
};

self.onmessage = (e) => {
  const { data } = e;

  const returned = () =>
    new Promise((resolve) => {
      const result = createGroupShuffled(data);
      resolve(result);
    });

  (async () => {
    const result = await returned();
    self.postMessage(result);
  })();
};
