// Массив разешённых доменов
const allowedCors = [
  'http://localhost:3005',
  'https://theAshbringer.github.io',
];

module.exports.corsOptions = {
  origin: allowedCors,
  allowedHeaders: ['Origin', 'Content-Type'],
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'HEAD'],
  credentials: true,
};
