import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

/** Shared chrome: sticky header + footer cap. Pages own the <main> body. */

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
