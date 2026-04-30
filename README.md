# @centricare/plop-feature-generator

A standardized Plop generator for creating Centricare Cloud HIS feature modules and core libraries.

## Installation

You can install this package as a development dependency in your project:

```bash
npm install -D @centricare/plop-feature-generator
```

## Usage

This package provides a CLI executable. You can use it via `npx` or by adding a script to your `package.json`.

### 1. Initializing Core Libraries

To initialize the core library files (`src/lib`) in a new project, run:

```bash
npx cloud-his-gen init
```
*(This command should only be run **once** per project)*

### 2. Generating a Feature Module

To generate a new feature module (API, Hooks, States, Types, and Routes), run:

```bash
npx cloud-his-gen feature
```
You will be prompted to enter the feature name (e.g., `patient`). The generator will automatically scaffold the files inside `src/features/[feature-name]`.

## Local Script Setup (Optional)

For convenience, you can add a script to your project's `package.json`:

```json
"scripts": {
  "plop": "cloud-his-gen"
}
```

Then you can simply run:
```bash
npm run plop
```
