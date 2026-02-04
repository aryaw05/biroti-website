import FooterSection from '@/components/template/home-page/footer';
import Header from '@/components/template/home-page/header';

export default function EventLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            {children}
            <FooterSection />
        </>
    );
}
