/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export estático: genera /out para deploy directo en Netlify
  output: 'export',
  // /ruta → /ruta/index.html (URLs limpias en Netlify sin post-procesado)
  trailingSlash: true,
  // Imágenes servidas desde Cloudinary o /public — sin optimizador de servidor
  images: { unoptimized: true },
};

export default nextConfig;
