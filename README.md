# Project Setup

```bash
npx create-next-app@latest
```

## Developer Experience for clean codes (optional)

```bash
npm install --save-dev prettier-eslint
npm install --save-dev prettier prettier-plugin-tailwindcss
```

Create a '.prettierrc' file in the root folder

```json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

## State Management Libraries

The Jotai library works as an alternative to React-Context which allows us to manage states globally (unless scoped)

```bash
npm i jotai
```
