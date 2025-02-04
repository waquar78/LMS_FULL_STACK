import { Menu, School } from 'lucide-react'
import React, { useEffect } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import DarkMode from '@/DarkMode'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Link, useNavigate } from 'react-router-dom'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { useSelector } from 'react-redux'
import { useLogoutUserMutation } from '@/redux/api/authApi'
import { toast } from 'sonner'
// import { AvatarImage } from '@radix-ui/react-avatar'

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        await logoutUser();
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "User logged out.");
            navigate("/login");
        }
    }, [isSuccess]);
    return (
        <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
            {/* dextop */}
            <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
                <div className='flex items-center gap-x-3'>
                    <School size={35} />
                    <Link to="/">
                        <h1 className='font-extrabold text-4xl'>E-Learning</h1></Link>
                </div>
                <div className='flex items-center gap-x-7'>
                    {
                        user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar>
                                        <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"}
                                            alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>

                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem><Link to="mylearning">My Learning</Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link to="profile">Edit Profile</Link></DropdownMenuItem>
                                    <DropdownMenuItem onClick={logoutHandler}>Logout</DropdownMenuItem>
                                    {user?.role === "instructor" && (
                                        <>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Button><Link to="/admin/dashboard">Dashboard</Link></Button>
                                            </DropdownMenuItem>
                                        </>
                                    )}

                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button variant="outline"
                                    onClick={() => navigate("/login")}
                                >
                                    Login
                                </Button>
                                <Button
                                    onClick={() => navigate("/login")}
                                >Signup</Button>
                            </div>
                        )}
                    <DarkMode />


                </div>




            </div>
            <div className="flex md:hidden items-center justify-between px-4 h-full">
                <h1 className="font-extrabold text-2xl">E-learning</h1>
                <MobileNavbar />
            </div>
        </div >
    )
}

export default Navbar;

const MobileNavbar = () => {
    const { user } = useSelector((store) => store.auth);
    const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        await logoutUser();
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "User logged out.");
            navigate("/login");
        }
    }, [isSuccess]);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size="icon"
                    className="rounded-full hover:bg-gray-200"
                    variant="outline"
                >
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
                <SheetHeader className="flex flex-row items-center justify-between mt-2">
                    <SheetTitle> <Link to="/">E-Learning</Link></SheetTitle>
                    <DarkMode />
                </SheetHeader>
                <Separator className="mr-2" />
                <nav className="flex flex-col space-y-4">
                    <Link to="/mylearning">My Learning</Link>
                    <Link to="/profile">Edit Profile</Link>
                    <Link onClick={logoutHandler}>Log out</Link>
                </nav>
                {user?.role === "instructor" && (
                    <SheetFooter>
                        <SheetClose asChild>
                           <DropdownMenu>
                           <DropdownMenuTrigger>
                                <Button>Dashboard</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                            <DropdownMenuItem><button onClick={()=>navigate("/admin/dashboard")}>Dashboard</button></DropdownMenuItem>
                            <DropdownMenuItem><button onClick={()=>navigate("/admin/courses")}>Courses</button></DropdownMenuItem>
                           
                            </DropdownMenuContent>
                           </DropdownMenu>
                        </SheetClose>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
};