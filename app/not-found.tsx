import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <>
      <Header />
      <Container className="flex min-h-svh flex-col items-center justify-center py-32 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand">404</p>
      <h1 className="mt-3 text-4xl font-bold">No data found</h1>
      <p className="mt-2 max-w-md text-neutral-500">
        That page isn’t in the Venuze map. Head back to the listings or the home page.
      </p>
      <div className="mt-6 flex gap-3">
        <Button href="/">Home</Button>
        <Button href="/venues" variant="outline">
          Explore venues
        </Button>
      </div>
      </Container>
      <Footer />
    </>
  );
}
