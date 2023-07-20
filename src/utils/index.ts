const estimateTimeToRead = (content: string) => {
  const wordsPerMinute = 200;
  const numberOfWords = content.split(/\s/g).length;
  const minutes = numberOfWords / wordsPerMinute;
  return Math.ceil(minutes);
};

export default estimateTimeToRead;
