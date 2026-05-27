import "./outstatic-overrides.css";

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return <div id="outstatic">{children}</div>;
}
