import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";

// tailwind.config.js
import debugScreens from 'tailwindcss-debug-screens'

// https://vite.dev/config/
export default defineConfig({
   base: '/',
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
         gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
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
     build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core stuff
          'react-core': ['react', 'react-dom'],
          
          // Router if you're using it
          'react-router': ['react-router-dom'],
          
          // UI libraries (if you're using any)
          'ui-libs': [
            // Add your UI libraries here, for example:
            // '@headlessui/react',
            // '@heroicons/react',
            // 'framer-motion'
          ],
          
          // Utility libraries
          'utils': [
            // Add utility libraries you might be using:
            // 'lodash',
            // 'date-fns',
            // 'axios',
            // 'clsx'
          ]
        },
        
        // Alternative: Function-based chunking for more control
        /*
        manualChunks(id) {
          // Vendor chunks
          if (id.includes('node_modules')) {
            // React ecosystem
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            
            // Router
            if (id.includes('react-router')) {
              return 'router'
            }
            
            // Large libraries
            if (id.includes('framer-motion')) {
              return 'animations'
            }
            
            // Everything else from node_modules
            return 'vendor'
          }
          
          // Your app code chunks by directory
          if (id.includes('/src/components/')) {
            return 'components'
          }
          if (id.includes('/src/pages/')) {
            return 'pages'
          }
          if (id.includes('/src/utils/')) {
            return 'utils'
          }
        }
        */
      }
    },
    
    // Increase chunk size warning limit if needed
    chunkSizeWarningLimit: 600
  }
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