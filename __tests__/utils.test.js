const { convertStrValueToNum } = require('../utils')

describe('convertStrToNum function', () => {
  test('returns an object', () => {
    expect(typeof convertStrValueToNum()).toBe('object')
  })
  const input = {
    title: 'Ultimate Werewolf',
    designer: 'Akihisa Okui',
    owner: 'bainesface',
    review_body: "We couldn't find the werewolf!",
    category: 'social deduction',
    votes: '5',
  }
  const output = {
    title: 'Ultimate Werewolf',
    designer: 'Akihisa Okui',
    owner: 'bainesface',
    review_body: "We couldn't find the werewolf!",
    category: 'social deduction',
    votes: 5,
  }
  test('returned object has its key (passed as arg) value converted to number', () => {
    expect(convertStrValueToNum(input, 'votes')).toEqual(output)
  })
  test('returned object has different reference to input object', () => {
    expect(convertStrValueToNum(input)).not.toBe(input)
  })
  test('does not mutate input', () => {
    expect(input).toEqual({
      title: 'Ultimate Werewolf',
      designer: 'Akihisa Okui',
      owner: 'bainesface',
      review_body: "We couldn't find the werewolf!",
      category: 'social deduction',
      votes: '5',
    })
  })
})
