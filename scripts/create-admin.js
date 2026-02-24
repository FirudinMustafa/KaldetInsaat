const sqlite3 = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const { randomBytes } = require('crypto');

// Generate a CUID-like ID
function generateId() {
  const timestamp = Date.now().toString(36);
  const randomPart = randomBytes(12).toString('base64').replace(/[+/=]/g, '').substring(0, 12);
  return `c${timestamp}${randomPart}`;
}

const db = sqlite3('./dev.db');

try {
  // Hash the password
  const hashedPassword = bcrypt.hashSync('admin123', 10);

  // Generate ID
  const userId = generateId();

  // Insert admin user
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO users (id, name, email, password, role, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const now = new Date().toISOString();
  stmt.run(
    userId,
    'Admin',
    'admin@kaldetinsaat.com',
    hashedPassword,
    'ADMIN',
    now,
    now
  );

  console.log('✅ Admin user created successfully!');
  console.log('   Email: admin@kaldetinsaat.com');
  console.log('   Password: admin123');
} catch (error) {
  console.error('❌ Error creating admin user:', error.message);
  process.exit(1);
} finally {
  db.close();
}
