import './bootstrap';
import '../css/app.css';
import 'aos/dist/aos.css'; // Import AOS CSS

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import React, { useEffect } from 'react';
import AOS from 'aos'; // Import AOS

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${appName} | ${title}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        const ApplicationWrapper = () => {
            useEffect(() => {
                AOS.init({

                    duration: 1000,

                });
            }, []);

            return (
                <div className="font-poppins">
                    <App {...props} />
                </div>
            );
        };

        root.render(<ApplicationWrapper />);
    },
    progress: {
        color: '#de5828',
    },
});
