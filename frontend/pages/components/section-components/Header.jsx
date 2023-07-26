import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import brandLogo from "./../../../assets/coin-compare.svg";
import Image from "next/image";
import { Link } from "react-router-dom";

const navList = (
  <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
    <Typography
      as="li"
      variant="small"
      className="p-1 text-white hover:text-purple-500 transition-colors font-normal"
    >
      <Link to="/" className="flex items-center">
        Home
      </Link>
    </Typography>
    <Typography
      as="li"
      variant="small"
      className="p-1 text-white hover:text-purple-500 transition-colors font-normal"
    >
      <Link to="/login" className="flex items-center">
        Add Coin
      </Link>
    </Typography>
    <Typography
      as="li"
      variant="small"
      className="p-1 text-white hover:text-purple-500 transition-colors font-normal"
    >
      <Link to="/login" className="flex items-center">
        Post Ad.
      </Link>
    </Typography>
  </ul>
);
export default function Header() {
  const [openNav, setOpenNav] = useState(false);
  return (
    <Navbar className="mx-auto max-w-none py-2 px-4 lg:px-8 lg:py-4 rounded-none bg-[#0f172a] bg-opacity-100 border-0 border-b border-blue-gray-800">
      <div className="mx-auto flex items-center justify-between text-blue-gray-900 border-0">
        <div className="flex gap-8 items-center">
          <Image src={brandLogo} alt="Brand Logo" className="w-20 h-10" />
          <div className="hidden lg:block">{navList}</div>
        </div>
        <div className="flex gap-16">
          <a href="#compare">
            <Button
              variant="outlined"
              color="gray"
              size="sm"
              className="hidden hover:bg-blue-gray-700/50 hover:text-white lg:inline-block capitalize"
            >
              <span>Compare</span>
            </Button>
          </a>
          <div className="flex gap-4">
            <Link to={"/login"}>
              <Button
                variant="outlined"
                color="purple"
                size="sm"
                className="hidden lg:inline-block capitalize hover:bg-purple-500 text-white"
              >
                <span>Login</span>
              </Button>
            </Link>
            <Link to={"/signup"}>
              <Button
                variant="filled"
                color="purple"
                size="sm"
                className="hidden lg:inline-block capitalize"
              >
                <span>Sign up</span>
              </Button>
            </Link>
          </div>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        {navList}
        <Button
          as="a"
          variant="gradient"
          size="sm"
          color="purple"
          fullWidth
          className="mb-2"
        >
          <span className="capitalize">Sign up</span>
        </Button>
        <Button
          variant="outlined"
          size="sm"
          color="purple"
          fullWidth
          className="mb-2 hover:bg-purple-500 hover:text-gray-100 border"
        >
          <span className="capitalize">Login</span>
        </Button>
      </MobileNav>
    </Navbar>
  );
}
