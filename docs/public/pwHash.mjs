import bcrypt from 'bcrypt';

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function comparePasswords(plaintextPassword, hashedPassword) {
  return await bcrypt.compare(plaintextPassword, hashedPassword);
}

export {
  hashPassword,
  comparePasswords
};
