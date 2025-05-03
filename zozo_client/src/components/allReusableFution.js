const truncateText = (text, limit) =>
  text.length > limit ? `${text.substring(0, limit)}...` : text;

const toggleExpand = (index) => {
  setExpandedCards((prev) => ({
    ...prev,
    [index]: !prev[index],
  }));
};