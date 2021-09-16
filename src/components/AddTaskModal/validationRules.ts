import { Rule } from 'antd/lib/form'

export const nameRules : Rule[] = [
    { 
      required: true,
      message: 'name required'
    },
    {
      pattern: new RegExp(/^([^0-9]*)$/),
      message: 'no numbers, we\'re not in the future yet'
    },
    {
      max: 20,
      message: 'name is too long'
    },
    {
        whitespace: true,
        message: 'name must contain characters'
    }
]