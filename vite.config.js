import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    publicDir: 'public',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js'),
        },
    },
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
        {
            name: 'inertia-mock-server',
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    const url = req.url.split('?')[0];

                    const articles = [
                        { id: 4, category: 'information', title: 'Tim Mindstream Bawa Pulang Juara 1 Nasional di Ajang Code the Future AI Summit 2026', date: '23 May 2026', image_url: '/images/5.webp', image_alt: 'Mindstream', excerpt: 'Mahasiswa Informatika UMN kembali menorehkan prestasi di ranah teknologi.', content: 'Mahasiswa Program Studi Informatika Universitas Multimedia Nusantara (UMN) kembali menorehkan prestasi membanggakan di ranah teknologi.\n\nKeberhasilan ini membuktikan bahwa mahasiswa Informatika UMN sangat adaptif dan siap bersaing di era kecerdasan buatan.' },
                        { id: 1, category: 'beasiswa', title: 'DUKUNGAN BIAYA PENDIDIKAN & PENGEMBANGAN DIRI BUAT KAMU!', date: '16 August 2026', image_url: '/images/1.webp', image_alt: 'Beasiswa CIMB', excerpt: 'Pantau website beasiswa CIMB Niaga dan jadilah bagian dari generasi yang terus #KejarMimpi.', content: 'Beneran, kamu gak salah baca. Kesempatan emas ini siap membantu kelancaran kuliah dan membuka jalan karier kamu lebih lebar!' },
                        { id: 2, category: 'information', title: 'Tim "Kasih Tau Mama" Bawa Pulang Juara 1 Web Development di Ajang I/O Festival UNTAR', date: '07 July 2026', image_url: '/images/2.webp', image_alt: 'Awarding', excerpt: 'Mahasiswa Program Studi Informatika Universitas Multimedia Nusantara (UMN) kembali menorehkan prestasi membanggakan di tingkat nasional.', content: 'Mahasiswa Program Studi Informatika Universitas Multimedia Nusantara (UMN) kembali menorehkan prestasi membanggakan di tingkat nasional.' },
                        { id: 3, category: 'employment', title: 'HACKATHON ADA DI UMN?? Yuk, ikutan Garuda Hacks 7.0 - Hackathon Terbesar di Indonesia', date: '23 June 2026', image_url: '/images/3.webp', image_alt: 'Hackathon', excerpt: 'Garuda Hacks 7.0 resmi hadir langsung di Universitas Multimedia Nusantara dengan total hadiah IDR 42M+.', content: 'Garuda Hacks 7.0 resmi hadir langsung di Universitas Multimedia Nusantara dengan total hadiah IDR 42M+.' },
                        { id: 5, category: 'information', title: 'Berita Tambahan untuk Information', date: '01 May 2026', image_url: '/images/4.webp', image_alt: 'Berita', excerpt: 'Ini adalah deskripsi singkat untuk berita tambahan agar ada 5 artikel.', content: 'Ini adalah berita kelima yang ditambahkan untuk melengkapi jumlah gambar webp yang diminta.' }
                    ];

                    if (url === '/api/information/articles') {
                        res.setHeader('Content-Type', 'application/json');
                        res.end(JSON.stringify({ data: articles }));
                        return;
                    }

                    if (url.startsWith('/api/information/articles/')) {
                        const id = parseInt(url.split('/').pop(), 10);
                        const article = articles.find(a => a.id === id);
                        res.setHeader('Content-Type', 'application/json');
                        if (article) res.end(JSON.stringify({ data: article }));
                        else { res.statusCode = 404; res.end(JSON.stringify({ error: 'Not found' })); }
                        return;
                    }

                    if (url.startsWith('/@') || url.startsWith('/node_modules') || url.startsWith('/resources') || url.startsWith('/public') || url.includes('.')) {
                        return next();
                    }

                    let component = 'Error';
                    let props = {};

                    if (url === '/') component = 'Home';
                    else if (url === '/aboutUs') component = 'AboutUs';
                    else if (url === '/workProgram') component = 'WorkProgram';
                    else if (url === '/gallery') component = 'Gallery';
                    else if (url === '/information') component = 'Information';
                    else if (url === '/aspirationForm') component = 'AspirationForm';
                    else if (url === '/profile') component = 'LinkPage';
                    else if (url.startsWith('/information/detail/')) {
                        component = 'InformationDetail';
                        props = { id: parseInt(url.split('/').pop(), 10) };
                    }

                    if (component === 'Error') {
                        props = { status: 404 };
                    } else if (component === 'AboutUs') {
                        props = { kpiData: { "Member 1": { overall: 85, history: { "Period 1": 80, "Period 2": 90 } } } };
                    } else if (component === 'Gallery') {
                        props = { photos: [
                            { id: 1, image_url: '/images/1.webp', title: 'Gallery Photo 1' },
                            { id: 2, image_url: '/images/2.webp', title: 'Gallery Photo 2' },
                            { id: 3, image_url: '/images/3.webp', title: 'Gallery Photo 3' },
                            { id: 4, image_url: '/images/4.webp', title: 'Gallery Photo 4' },
                            { id: 5, image_url: '/images/5.webp', title: 'Gallery Photo 5' },
                            { id: 6, image_url: '/images/6.webp', title: 'Gallery Photo 6' },
                            { id: 7, image_url: '/images/7.webp', title: 'Gallery Photo 7' },
                            { id: 8, image_url: '/images/8.webp', title: 'Gallery Photo 8' }
                        ] };
                    } else if (component === 'Information') {
                        props = { articles: { data: [], current_page: 1, last_page: 1, links: [] }, filters: { search: "", category: "all" }, categories: [] };
                    }

                    const pageData = {
                        component,
                        props,
                        url,
                        version: "1.0"
                    };

                    if (req.headers['x-inertia']) {
                        res.setHeader('Content-Type', 'application/json');
                        res.setHeader('X-Inertia', 'true');
                        res.end(JSON.stringify(pageData));
                        return;
                    }

                    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HMIF UMN 2026 (Local Dev)</title>
    <script type="module" src="/@vite/client"></script>
    <link rel="stylesheet" href="/resources/css/app.css">
</head>
<body class="font-sans antialiased bg-gray-50 text-gray-900">
    <div id="app" data-page='${JSON.stringify(pageData).replace(/'/g, "&#39;")}'></div>
    <script type="module" src="/resources/js/app.tsx"></script>
</body>
</html>
                    `;

                    server.transformIndexHtml(url, html).then(transformedHtml => {
                        res.setHeader('Content-Type', 'text/html');
                        res.end(transformedHtml);
                    }).catch(next);
                });
            }
        }
    ],
});
