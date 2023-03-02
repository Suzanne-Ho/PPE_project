import Login from './Login'
import React, { Fragment, useContext } from 'react';
import { Menu, Transition, RadioGroup, Switch } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import ThemeContext from './ThemeContext'

import { Disclosure } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Edubet', href: '/', current: true },
    { name: 'Tutorat', href: '/tutorat', current: false },
    { name: 'Forum', href: '/posts', current: false },
    { name: 'Récompenses', href: '/prize', current: false },
    { name: 'Pari', href: '/contact', current: false },
    { name: 'Classement', href: '/contact', current: false },
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
                'flex bg-primaryBg px-10 py-2 text-neutralText',
                `theme-${color}`,
                `theme-${mode}`,
            ].filter(Boolean).join(' ')}>

            {/* Navbar */}
            <Disclosure as="nav" className="bg-primaryBg w-full">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
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
                                            className="hidden h-8 w-auto lg:block"
                                            src="/logo.png"
                                            alt="Blog's logo"
                                        />
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
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
                                <div
                                    className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    {/* Theme dropdown */}
                                    <Menu as="div" className="relative rounded py-3 px-4 hover:bg-onPrimaryBg hover:text-hoverText">
                                        <div>
                                            <Menu.Button className="flex justify-center">
                                                Theme
                                                <ChevronDownIcon
                                                    className="ml-2 -mr-1 h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute mt-2 w-auto right-0 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none m-4">
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
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                    {/* Login */}
                                    <div className="flex rounded py-3 px-3 border border-onNeutralBg hover:bg-onPrimaryBg hover:text-hoverText m-4">
                                        <Login />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile menu when dropdown*/}
                        <Disclosure.Panel className="sm:hidden">
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
