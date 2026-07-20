import logo from '@/assets/images/logo/logo-f11.png';
export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md text-sidebar-primary-foreground">
                <img src={logo} alt="" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Biro Teknik Informatika
                </span>
            </div>
        </>
    );
}
