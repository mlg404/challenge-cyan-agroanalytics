export const dateFormat = (dateString) => {
  const date = new Date(dateString);
  const formatedDate = Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "numeric",
    day: "2-digit",
    // hour: 'numeric',
    // minute: 'numeric',
  }).format(date);

  return formatedDate;
}

