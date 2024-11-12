export type Validator = {
  regExp: RegExp;
  prettifyResult: (str: string) => string;
  validate: (str: string) => boolean;
};

const Validators = {
  name: {
    regExp: /^(([а-я]+-)*[a-я]+) +(([а-я]+-)*[a-я]+)( +(([а-я]+-)*[a-я]+))?$/i,
    prettifyResult: (str: string): string => str.replaceAll(/ {2,}/g, ' '),
  },
  group: {
    regExp:
      /(^(иу|ибм|мт|см|бмт|рл|э|рк|фн|л|сгн|вуц|гуимц|уц|фмоп|фоф|исот|ркт|ак|пс|рт|лт|оэ|оэп)\d\d?и?-1\d[АМБамб]?$)|(^юр-1\d$)/i,
    prettifyResult: (str: string): string => str.toUpperCase(),
  },
  tg: {
    regExp: /^((https:\/\/)?(t\.me\/)|@)?\w{5,}$/i,
    prettifyResult: (str: string): string =>
      str
        .replace(/https:\/\//i, '')
        .replace(/t\.me\//i, '')
        .replace('@', ''),
  },
  vk: {
    regExp: /^(https:\/\/)?(vk\.com\/|@)?(\w+\.)*\w+$/i,
    prettifyResult: (str: string): string =>
      str
        .replace(/https:\/\//i, '')
        .replace(/vk\.com\//i, '')
        .replace('@', ''),
  },
  email: {
    regExp:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
    prettifyResult: (str: string): string => str.toLowerCase(),
  },
  phone: {
    regExp: /^((\+7)|8)[-\s.]?((\(\d\d\d\))|(\d\d\d))[-\s.]?\d\d\d[-\s.]?\d\d[-\s.]?\d\d$/,
    prettifyResult: (str: string): string => str.replace('+7', '8').replace('-', '').replace('(', '').replace(')', ''),
  },
  password: {
    regExp: /^.{6,}$/i,
  },
  id: {
    regExp: /^#?[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i,
    prettifyResult: (str: string): string => str.replace('#', '').toLowerCase(),
  },
} as unknown as { [key: string]: Validator };
Object.entries(Validators).forEach(([, validator]) => {
  validator.validate = str => !validator.regExp || validator.regExp.test(str.trim());
});

export function getValidatedAndPrettified(field: Validator, str: string) {
  if (!field.validate || field.validate(str)) {
    return field.prettifyResult ? field.prettifyResult(str) : str;
  }
  return null;
}

export default Validators;
