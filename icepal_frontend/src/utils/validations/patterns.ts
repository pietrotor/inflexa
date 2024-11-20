export const PATTERNS = {
  isEmail: /^\S+@\S+$/i,
  hasUpperCase: /[A-Z]/,
  hasLowerCase: /[a-z]/,
  hasNumber: /\d/,
  hasSpecialCharacter: /\W/,
  breakLinesAndPoints: /[.\n]/,
  password: /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
}
