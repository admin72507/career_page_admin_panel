'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import { useState } from "react";
import UserTable from "./_components/UserTable";
import ApplicationTable from "./_components/ApplicationTable";


export default function Home() {

  const types = [
    'All',
    'AI-ML Developer Intern',
    'Product Developer Intern',
    'Marketing Intern',
    'iOS Developer Intern',
  ]

  const Lists = [
    'User',
    'Application',
  ]

  const [type, setType] = useState<string>('All');
  const [list, setList] = useState<string>('User');

  return (
    <div className="font-sans bg-slate-950 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Type</NavigationMenuTrigger>
            <NavigationMenuContent>
              {types.map((item: string, index: number) => (
                <NavigationMenuLink asChild key={index} className="w-sm">
                  <Link href="" onClick={() => setType(item)}>{item}</Link>
                </NavigationMenuLink>
              ))
              }
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Lists</NavigationMenuTrigger>
            <NavigationMenuContent>
              {Lists.map((item: string, index: number) => (
                <NavigationMenuLink asChild key={index} className="w-sm">
                  <Link href="" onClick={() => setList(item)}>{item}</Link>
                </NavigationMenuLink>
              ))
              }
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {list === 'User' && <UserTable type={type} />}
      {list === 'Application' && <ApplicationTable type={type} />}
    </div>
  );
}
