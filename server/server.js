import "dotenv/config"
import app from './app.js';
import connectDB from './config/db.js';
import { verifysmtpConnection } from './config/mailer.js';
import seedAdmin from './config/seedAdmin.js';
import seedContent from './config/seedContent.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await seedAdmin();
  await verifysmtpConnection()

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error('Server startup failed:', error.message);
  process.exit(1);
});
