const app = require('./src/app');
require('dotenv').config();
const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server is shutting down');
    });
});
