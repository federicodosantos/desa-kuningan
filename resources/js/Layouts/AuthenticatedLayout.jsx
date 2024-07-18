import { Icon } from "@iconify/react";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import Logo from "../../assets/logo-desa.png";
import Dropdown from "@/Components/Dropdown";
export default function AuthenticatedSidebarLayout({ user, header, children }) {
    const { url } = usePage();

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside className="w-1/5 text-text-white bg-primary-orange h-screen sticky top-0 flex flex-col justify-between">
                <div>
                    <div className="p-4  flex flex-col gap-3 items-center ">
                        <img
                            src={Logo}
                            className="w-2/4"
                            draggable="false"
                            alt="logo"
                        />
                        <h1 className="text-lg font-semibold">
                            Admin Dashboard
                        </h1>
                    </div>
                    <nav className="mt-2">
                        <Link
                            href={route("admin.dashboard")}
                            className={` p-4 flex items-center justify-between  ${
                                url === "/admin/dashboard"
                                    ? "bg-gray-200 text-text-black"
                                    : ""
                            }`}
                        >
                            Dashboard
                            <Icon icon={"bxs:dashboard"} />
                        </Link>
                      
                        <Link
                            href={route("admin.news.index")}
                            className={`p-4 flex items-center justify-between  ${
                                url.startsWith("/admin/news")
                                    ? "bg-gray-200 text-text-black"
                                    : ""
                            }`}
                        >
                            Berita
                            <Icon icon={"material-symbols:news-outline"} />
                        </Link>
                        <Link
                            href={route("admin.peta.index")}
                            className={`p-4 flex items-center justify-between  ${
                                url.startsWith("/admin/peta-digital")
                                    ? "bg-gray-200 text-text-black"
                                    : ""
                            }`}
                        >
                            Peta Digital
                            <Icon icon={"mdi:location"} />
                        </Link>
                        {/* <Link href={route('admin.settings.index')} className={`block p-4  ${url.startsWith('/admin/settings') ? 'bg-gray-200' : ''}`}>
                        Settings
                    </Link> */}
                    </nav>
                </div>
                <div className="p-4">
                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="w-full p-2 text-center bg-text-white text-primary-orange rounded border border-primary-orange transition duration-150 ease-in-out flex items-center justify-center"
                    >
                        <Icon icon="material-symbols:logout" className="mr-2" />
                        Logout
                    </Link>
                </div>
            </aside>
            <main className="w-full">{children}</main>
        </div>
    );
}
