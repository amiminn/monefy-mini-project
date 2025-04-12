/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_NAME: string;
    // Add other environment variables here if needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare module "*.lottie" {
    const content: string;
    export default content;
}
