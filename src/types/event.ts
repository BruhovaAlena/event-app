export type Event = {
  id: string;
  title: string;
  description: string;
  date: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  place: string;
  maxCapacity: number;
  numberOfAttendees: number;
};
