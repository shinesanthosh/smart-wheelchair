const validate = (password) => {
  const valid = {
    len: false,
    lower: false,
    upper: false,
    num: false,
    ch: false,
  }

  const len = new RegExp('^(?=.{8,})')
  const lower = new RegExp('^(?=.*[a-z])')
  const upper = new RegExp('^(?=.*[A-Z])')
  const num = new RegExp('(?=.*[0-9])')
  const ch = new RegExp('(?=.[!@#$%^&*])')

  if (len.test(password)) valid.len = true
  if (lower.test(password)) valid.lower = true
  if (upper.test(password)) valid.upper = true
  if (num.test(password)) valid.num = true
  if (ch.test(password)) valid.ch = true

  return valid
}

export default validate
