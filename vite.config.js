import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";

// tailwind.config.js
import debugScreens from 'tailwindcss-debug-screens'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(), 
    react(),
     flowbiteReact(),
    require['tailwind-scrollbar-hide']
    ],
    theme: {
      extend: {
        fontFamily: {
          serif: ["'DM Serif Text'", "serif"],
          roboto: ["'Roboto'", "sans-serif"],
        },

         debugScreens: {
        position: ['bottom', 'left'],
        prefix: 'screen: ',
        style: {
          backgroundColor: '#000',
          color: '#fff',
          fontSize: '12px',
        },
      },
        //  debugScreens: {
        // position: ['bottom', 'left'],
        // prefix: 'screen: ',
        // style: {
        //   backgroundColor: '#000',
        //   color: '#fff',
        //   fontSize: '12px',
        // },
      },
    },
})

// // vite.config.js
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import flowbiteReact from 'flowbite-react/plugin/vite'

// export default defineConfig({
//   plugins: [
//     react(),
//     flowbiteReact()
//   ]
// })


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from 'tailwindcss'
// // import autoprefixer from 'autoprefixer'
// import flowbiteReact from "flowbite-react/plugin/vite"

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     flowbiteReact(),
//   ],
//   css: {
//     postcss: {
//       plugins: [
//         tailwindcss,
//         // autoprefixer,
//       ],
//     },
//   },
// })