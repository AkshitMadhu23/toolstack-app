import { Helmet } from "react-helmet-async";

export default function SEO({
  title = "Toolstack — Free online utilities that just work",
  description = "A modern, minimal collection of free online tools: JSON formatter, image compressor, password generator, QR code generator, SIP calculator, AI email writer and more.",
  path = "/",
  jsonLd,
  keywords = [],
}) {
  const url = `https://toolstack.app${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="robots" content="index,follow" />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
