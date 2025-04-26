export const getInitialsFromEmail = (email: string) => {
  // Usuń wszystko po @
  const localPart = email.split('@')[0];

  // Podziel na części po kropkach i podkreśleniach
  const parts = localPart.split(/[._]/);

  // Weź pierwszą literę z każdej części i usuń cyfry
  const initials = parts
    .map((part) => part.replace(/[0-9]/g, '').charAt(0).toUpperCase())
    .filter((char) => char !== '');

  // Połącz inicjały
  return initials.join('');
};
