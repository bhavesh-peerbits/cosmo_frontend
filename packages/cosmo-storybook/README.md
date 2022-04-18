## Cosmo Storybook

### Requirements

This package requires to use `node-modules` as nodeLinker. Ensure to set the correct nodeLinker in your `.yarnrc.yml` file.

`pnp` and `pnpm` mode causes incompatibility with `@storybook/cli` and `@storybook/react`.

### Installation and Usage
You can install the dependencies in the correct way with
```shell
LINKER=node-modules yarn
```
to override the default `nodeLinker` and prepend every yarn script command with 
```shell
LINKER=node-modules yarn <script> 
```
