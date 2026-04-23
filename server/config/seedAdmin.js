import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config({ path: new URL('../../.env', import.meta.url).pathname });

const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    return;
  }

  const existingAdmin = await Admin.findOne({ email });

  if (!existingAdmin) {
    await Admin.create({
      email,
      password,
      name: 'Portfolio Admin',
    });
  }
};

export default seedAdmin;

if (process.argv[1] && process.argv[1].endsWith('seedAdmin.js')) {
  const { default: connectDB } = await import('./db.js');

  try {
    await connectDB();
    await seedAdmin();
    console.log('Admin seed completed');
    process.exit(0);
  } catch (error) {
    console.error('Admin seed failed:', error.message);
    process.exit(1);
  }
}
