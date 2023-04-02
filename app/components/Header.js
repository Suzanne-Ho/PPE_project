import Login from './Login'
import React, { Fragment, useContext } from 'react';
import {Menu, Transition, RadioGroup, Switch, Popover} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import ThemeContext from './ThemeContext'

import { Disclosure } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Edubet', href: '/', current: true },
    { name: 'Tutorat', href: '/tutorat', current: false },
    { name: 'Forum', href: '/posts', current: false },
    { name: 'Récompenses', href: '/prize', current: false },
    { name: 'Pari', href: '/bet', current: false },
    { name: 'Classement', href: '/ranking', current: false },
    { name: 'Contact', href: '/contact', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

//List of color and mode which can be find in global.css
const colors = ['default', 'green', 'red', 'blue'];
const modes = ['light', 'dark'];

export default function Header() {
    {/* For theme persist */ }
    const mode = useContext(ThemeContext).mode;
    const color = useContext(ThemeContext).color;
    const setMode = useContext(ThemeContext).setMode;
    const setColor = useContext(ThemeContext).setColor;

    {/* To change theme */ }
    const setLocalMode = (mode) => {
        localStorage.setItem('theme-mode', mode);
        setMode(mode);
    }
    const setLocalColor = (color) => {
        localStorage.setItem('theme-color', color);
        setColor(color);
    }

    return (

        <header
            className={[
                'flex bg-primaryBg px-10 py-2 text-neutralText ',
                `theme-${color}`,
                `theme-${mode}`,
            ].filter(Boolean).join(' ')}>

            {/* Navbar */}
            <Disclosure as="nav" className="bg-primaryBg w-full">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="md:pl-10 sm:pl-10 absolute inset-y-0 left-0 flex items-center lg:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button
                                        className="inline-flex items-center justify-center rounded-md p-2 hover:bg-onPrimaryBg hover:text-hoverText focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                {/* Navigation */}
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex flex-shrink-0 items-center">

                                        <img
                                            className="hidden h-8 w-auto sm:block"
                                            src="/logo.png"
                                            alt="Blog's logo"
                                        />
                                    </div>
                                    <div className="hidden lg:ml-6 lg:block">
                                        <div className="flex space-x-4 ">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current ? 'bg-colorBg text-white' : 'px-4 py-3 hover:bg-onPrimaryBg hover:text-hoverText',
                                                        'px-4 py-3 rounded-md text-sm font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className=" max-w-sm px-4 absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    {/* Theme dropdown */}

                                    <Popover className="relative hover:bg-onPrimaryBg hover:text-hoverText">
                                        <Popover.Button>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                      d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"/>
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            </svg>
                                        </Popover.Button>

                                        <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                                            <div className="mx-auto bg-neutralBg text-onNeutralBg border-8 border-onNeutralBg p-5 max-w-lg">
                                                <h1 className="text-3xl font-bold text-center">
                                                    Themes
                                                </h1>

                                                <RadioGroup value={color} onChange={setLocalColor}>
                                                    <RadioGroup.Label className="block mt-5">Select a color:</RadioGroup.Label>
                                                    <div className="flex justify-center space-x-8 mt-2">
                                                        {colors.map(c => {
                                                            return <RadioGroup.Option
                                                                className="ui-checked:text-onPrimaryBg ui-checked:bg-primaryBg ring-4 ui-checked:ring-primary ui-not-checked:ring-onNeutralBg h-20 w-full flex justify-center items-center font-bold uppercase cursor-pointer"
                                                                value={c} key={c}>{c}</RadioGroup.Option>
                                                        })}
                                                    </div>
                                                </RadioGroup>

                                                <Switch.Group>
                                                    <div className="mt-10">
                                                        <Switch.Label className="block">Enable dark mode:</Switch.Label>
                                                        <Switch
                                                            className="bg-onNeutralBg h-6 w-11 rounded-full relative inline-flex items-center"
                                                            checked={mode === 'dark'} onChange={() => setLocalMode(mode === 'light' ? 'dark' : 'light')}>
                                                            <span className="h-4 w-4 bg-neutralBg rounded-full inline-block transform transition ui-not-checked:translate-x-1 ui-checked:translate-x-6" />
                                                        </Switch>
                                                    </div>
                                                </Switch.Group>
                                            </div>
                                        </Popover.Panel>
                                    </Popover>

                                    {/* Login */}
                                    <div className="flex right-0 rounded py-3 px-3 border border-onNeutralBg hover:bg-onPrimaryBg hover:text-hoverText m-4">
                                        <Login />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile menu when dropdown*/}
                        <Disclosure.Panel className="lg:hidden">
                            <div className="space-y-1 px-2 pt-2 pb-3">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-colorBg text-white' : 'rounded py-3 px-4 hover:bg-onPrimaryBg hover:text-hoverText',
                                            'block px-4 py-3 rounded-md rounded hover:bg-onPrimaryBg hover:text-hoverText font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

        </header>

    )
}
