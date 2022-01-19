# cra template customization

This folder provides customizations files to apply on cra (create-react-app) template.

Any files put here will erase files in CRA template.


## Instructions

- Create new project using [`cra-template-pwa-ts`](https://github.com/cra-template/pwa) template like this:

`yarn create react-app web-app --template cra-template-pwa-typescript`

- Copy customization files to the folder created previously (`web-app`)


## Customizations

Most customization should be scripted directly in `.gitpod.yml` deployment file.

For any changes requiring more complex patching, include modified files here.

List of customizations:
- replace `src/App.tsx`
- add .gitmodules
- add custom `tsconfig.json` file
- include `src/modules/appRouting.tsx`
- create `src/modules` directory with modules index file `index.tsx`
