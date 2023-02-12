import bcrypt from "bcryptjs";
/**
 * @returns if both passwords match returns true otherwise false
 * @param p the plain password
 * @param hashedP the hashed password
 */
export const passwordCompareSync = (p: string, hashedP: string) => bcrypt.compareSync(p, hashedP);

/**
 * @returns a hashed password with 12 rounds of salt
 * @param p the plain password to hash
 */
export const hashPassword = (p: string) => bcrypt.hashSync(p, bcrypt.genSaltSync(12));
