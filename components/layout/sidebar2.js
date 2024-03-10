"use client"

import Link from "next/link";
import {useEffect} from "react";
import {useParams, usePathname} from "next/navigation";
import NProgress from "nprogress";

const Sidebar = ({title, menu}) => {

    useEffect(() => {
        const items = document.querySelectorAll('.menu > li');
        items.forEach(item => {
            let link = item.querySelector('a');
            let submenu = item.querySelector('.submenu');
            if (!!link && !!submenu) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    link.classList.toggle('active');
                    submenu.classList.toggle('active');
                    submenu.style.maxHeight = submenu.classList.contains('active') ? submenu.scrollHeight + "px" : 0;
                })
            }
        })
    }, [])


    const pathName = usePathname()
    const params = useParams()


    const isActive = item => {
        let pathname = window.location.pathname
        let parent
        menu.find(menuItem => {
            if(menuItem.href === item.pathname) {
                console.log(menuItem.href, item.pathname)
                parent = menuItem
                return true
            }
            if(menuItem.child) {
                menuItem.child.find(childItem => {
                    if(childItem.href === item.pathname) {
                        parent = childItem
                        return true
                    }
                })
            }
        })
        let childPaths = parent?.childPaths?.map(d => {
            let find = d.matchAll(/:(\w+)/g)
            let param = find.next().value
            while(param) {
                d = d.replace(param[0], params[param[1]])
                param = find.next().value
            }
            return d
        }) || []
        return item.pathname === pathname || childPaths.includes(pathname)

    }

    useEffect(() => {
        NProgress.done()
        const items = document.querySelectorAll('.menu a');
        let activeItem
        items.forEach(item => {
            item.classList.remove('active')
            let itemParent = item.parentElement.parentElement
            if (itemParent.classList.contains('submenu')) {
                itemParent.classList.remove('active')
                itemParent.style.maxHeight = 0
                itemParent.parentElement.firstChild?.classList?.remove('active')
            }
            if (isActive(item)) {
                activeItem = item
            }
        })
        if (activeItem) {
            activeItem.classList.add('active')
            let itemParent = activeItem.parentElement.parentElement
            if (itemParent.classList.contains('submenu')) {
                itemParent.classList.add('active')
                itemParent.style.maxHeight = itemParent.scrollHeight + "px"
                itemParent.parentElement.firstChild?.classList?.add('active')
            }
        }
    }, [pathName])


    return (
        <>
            <div
                onClick={() => {
                    window.document.querySelector('.sidebar').classList.toggle('open')
                    window.document.querySelector('.sidebar-overlay').classList.toggle('open')
                }}
                className="sidebar-overlay"/>
            <aside className="sidebar">
                <div className="title">
                    {title}
                </div>
                <ul className="menu">
                    {menu.map((item, index) => (
                        <li key={index}>
                            {item.menu && <div className="nav-menu">{item.menu}</div>}
                            {item.label && !item.child && (
                                <Link href={item.href || '#!'} className="nav-link" onClick={() => NProgress.start()}>
                                    {item.icon && <span className="icon">{item.icon}</span>}
                                    <span className="label">{item.label}</span>
                                </Link>
                            )}
                            {item.child && (
                                <>
                                    <a role="button" className="nav-link has-arrow">
                                        {item.icon && <span className="icon">{item.icon}</span>}
                                        <span className="label">{item.label}</span>
                                    </a>
                                    <ul className="submenu">
                                        {item.child.map((item, index) => (
                                            <li key={index}>
                                                <Link href={item.href || '#!'} className="nav-link">
                                                    {item.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </aside>
        </>

    )
}

export default Sidebar