interface StatusEntries {
  [key: number]: string;
}

export interface EditData {
  name: string;
  description: string;
  id: number;
  status: number;
}

export const statusColors: StatusEntries = {
  0: 'bg-red-500',  // TODO
  1: 'bg-yellow-500',  // ACTIVE
  2: 'bg-blue-500',  // REVIEW
  3: 'bg-green-500',  // COMPLETE
};

export const statusTerms: StatusEntries = {
  0: 'TO DO',
  1: 'ACTIVE',
  2: 'REVIEW',
  3: 'COMPLETE',
};