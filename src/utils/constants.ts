interface StatusEntries {
  [key: number]: string;
}
export const statusColors: StatusEntries = {
  0: "bg-red-500",  // TODO
  1: "bg-yellow-500",  // ACTIVE
  2: "bg-blue-500",  // REVIEW
  3: "bg-green-500",  // COMPLETE
};