import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-indigo-600 border border-t-2 border-t-black">
            <div className="relative z-5 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap justify-around">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center justify-center">
                                <Logo width="300" height="200" />
                            </div>
                            <div className='w-4/5 m-auto'>
                                <p className="text-sm text-bold text-neutral-950">
                                    &copy; Copyright 2025. All Rights Reserved by Mohammed Owais.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 w-1/2 lg:w-2/12 flex flex-col justify-between items-center">
                        <div className="h-full">
                            <h3 className="tracking-px mb-4 sm:mb-6 font-bold uppercase ">
                                Company
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-zinc-100 hover:text-zinc-300"
                                        to="/">
                                        Features
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium  text-zinc-100 hover:text-zinc-300"
                                        to="/">
                                        Pricing
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium  text-zinc-100 hover:text-zinc-300"
                                        to="/">
                                        Affiliate Program
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium  text-zinc-100 hover:text-zinc-300"
                                        to="/">
                                        Press Kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="p-6 w-1/2  lg:w-2/12 flex flex-col justify-between items-center">
                        <div className="h-full">
                            <h3 className="tracking-px mb-4 sm:mb-6 font-bold uppercase ">
                                Support
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium  text-zinc-100 hover:text-zinc-300"
                                        to="/">
                                        Account
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium  text-zinc-100 hover:text-zinc-300"
                                        to="/">
                                        Help
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium  text-zinc-100 hover:text-zinc-300"
                                        to="/">
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium  text-zinc-100 hover:text-zinc-300"
                                        to="/">
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="p-6 w-1/2  lg:w-2/12 flex flex-col justify-between items-center">
                        <div className="h-full">
                            <h3 className="tracking-px mb-4 sm:mb-6 font-bold uppercase ">
                                Legals
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium  text-zinc-100 hover:text-zinc-300"
                                        to="/">
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium  text-zinc-100 hover:text-zinc-300"
                                        to="/">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium  text-zinc-100 hover:text-zinc-300"
                                        to="/">
                                        Licensing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Footer