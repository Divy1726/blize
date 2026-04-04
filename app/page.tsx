import HomePage from "./(public)/page";
import PublicLayout from "./(public)/layout";

export { metadata } from "./(public)/layout";

export default function Home() {
  return (
    <PublicLayout>
      <HomePage />
    </PublicLayout>
  );
}
