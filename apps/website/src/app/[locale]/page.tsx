import { Home } from "./Home";

export type HomePageProps = {
  params: Promise<{ locale: string }>;
};

const HomePage = async ({ params }: HomePageProps) => {
  const { locale } = await params;
  return <Home locale={locale} />;
};

export default HomePage;
