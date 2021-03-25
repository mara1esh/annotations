export function getPosition(coordinate: number): string {
  return `${100 * coordinate}%`;
}

export function getLetterAvatar(name: string): string {
  return name.split(" ").map(str => str[0]).join("");
}