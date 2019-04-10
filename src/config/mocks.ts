export const fakeEvent = () => ({
  name: 'Event',
  url: '/event',
  bannerUrl: 'http://event-banner-url',
  date: '2020-10-10 00:00:00',
  location: 'Russia, Saint-Petersburg',
  description: 'Test Description',
  tickets: [],
});

export const fakeTickets = () => [
  {id: 1, name: 'VIP', available: 10},
  {id: 2, name: 'Standard', available: null},
  {id: 3, name: 'Alumnus', available: null},
];
