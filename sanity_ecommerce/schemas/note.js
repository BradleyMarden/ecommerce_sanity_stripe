// `sanity.config.ts` / `sanity.config.js`:
import { defineConfig } from 'sanity'
import { noteField } from 'sanity-plugin-note-field'

export default defineConfig({
    // ...
    plugins: [
        // ...
        noteField(),
    ],
})