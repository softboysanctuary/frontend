export default {
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSameLine: true,
  importOrder: [
    'solid-js',
    'classnames',
    './index.css', 
    '^@/', 
    '/(components|lib)/',
    '^[./]',
  ],
  importOrderSeparation: true,
  plugins: ['prettier-plugin-tailwindcss'],
};