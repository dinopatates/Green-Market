import js from "@eslint/js";

export default [
    // 1. DOSSIERS À IGNORER
    {
        ignores: [
            "node_modules/**",
            "vendor/**",
            "public/**",
            "bootstrap/cache/**",
            "storage/**"
        ]
    },
    // 2. CONFIGURATION DE BASE
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            // 💡 AJOUT : On dit à ESLint que les objets du navigateur existent
            globals: {
                window: "writable",
                document: "readonly"
            }
        },
        rules: {
            "no-unused-vars": "error"
        }
    }
];