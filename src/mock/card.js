const generateCard = () => {
  return {};
};

const generateCards = (amount) => {
  return new Array(amount)
    .fill(``)
    .map(generateCard);
};

export {generateCards};
