import { Rule } from 'antd/lib/form'

export const nameRules : Rule[] = [
    { 
      required: true,
      message: 'required'
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