export default function (plop) {
  plop.setGenerator("feature", {
    description: "Create a new feature module",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Feature name (e.g. patient):",
      },
    ],
    actions: [
      // API
      {
        type: "add",
        path: "src/features/{{camelCase name}}/api/getAll{{pascalCase name}}s.ts",
        templateFile: "plopTemplates/feature/api/getAll.hbs",
      },
      {
        type: "add",
        path: "src/features/{{camelCase name}}/api/get{{pascalCase name}}ById.ts",
        templateFile: "plopTemplates/feature/api/getById.hbs",
      },
      {
        type: "add",
        path: "src/features/{{camelCase name}}/api/create{{pascalCase name}}.ts",
        templateFile: "plopTemplates/feature/api/create.hbs",
      },

      {
        type: "add",
        path: "src/features/{{camelCase name}}/api/update{{pascalCase name}}.ts",
        templateFile: "plopTemplates/feature/api/update.hbs",
      },
      {
        type: "add",
        path: "src/features/{{camelCase name}}/api/delete{{pascalCase name}}.ts",
        templateFile: "plopTemplates/feature/api/delete.hbs",
      },

      // HOOKS
      {
        type: "add",
        path: "src/features/{{camelCase name}}/hooks/useGet{{pascalCase name}}s.ts",
        templateFile: "plopTemplates/feature/hooks/useGetAll.hbs",
      },
      {
        type: "add",
        path: "src/features/{{camelCase name}}/hooks/useGet{{pascalCase name}}ById.ts",
        templateFile: "plopTemplates/feature/hooks/useGetById.hbs",
      },
      {
        type: "add",
        path: "src/features/{{camelCase name}}/hooks/useCreate{{pascalCase name}}.ts",
        templateFile: "plopTemplates/feature/hooks/useCreate.hbs",
      },
      {
        type: "add",
        path: "src/features/{{camelCase name}}/hooks/useUpdate{{pascalCase name}}.ts",
        templateFile: "plopTemplates/feature/hooks/useUpdate.hbs",
      },
      {
        type: "add",
        path: "src/features/{{camelCase name}}/hooks/useDelete{{pascalCase name}}.ts",
        templateFile: "plopTemplates/feature/hooks/useDelete.hbs",
      },

      // TYPES
      {
        type: "add",
        path: "src/features/{{camelCase name}}/types/{{camelCase name}}.types.ts",
        templateFile: "plopTemplates/feature/types/types.hbs",
      },

      // STATES
      {
        type: "add",
        path: "src/features/{{camelCase name}}/states/use{{pascalCase name}}State.ts",
        templateFile: "plopTemplates/feature/states/states.hbs",
      },

      // ROUTES
      {
        type: "add",
        path: "src/features/{{camelCase name}}/routes/{{camelCase name}}MainPage.tsx",
        templateFile: "plopTemplates/feature/routes/mainPage.hbs",
      },
      {
        type: "add",
        path: "src/features/{{camelCase name}}/routes/{{camelCase name}}DetailPage.tsx",
        templateFile: "plopTemplates/feature/routes/detailPage.hbs",
      },
    ],
  });

  plop.setGenerator("init", {
    description: "Initialize core library files (Run once per project)",
    prompts: [],
    actions: [
      {
        type: "addMany",
        destination: "src/lib",
        base: "plopTemplates/lib",
        templateFiles: "plopTemplates/lib/**/*",
      },
    ],
  });
}