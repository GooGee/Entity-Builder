import { NavLink } from "react-router-dom"
import { Menu, treezz } from "@/menuzz"
import useAppInfoStore from "@/Store/useAppInfoStore"

export default function Bar() {
    const store = useAppInfoStore()

    function makeNavItem(item: Menu) {
        return (
            <li key={item.path} className="nav-item">
                {makeNavLink(item, " nav-link" + (item.childzz.length ? " dropdown-toggle" : ""))}
                {item.childzz.length === 0 ? null : (
                    <ul className="dropdown-menu">
                        {item.childzz.map((item) => (
                            <li key={item.path}>{makeNavLink(item, " dropdown-item")}</li>
                        ))}
                    </ul>
                )}
            </li>
        )
    }

    function makeNavLink(item: Menu, className: string) {
        return (
            <NavLink to={item.path} className={({ isActive }) => (isActive ? "active " : "") + className}>
                {item.name}
            </NavLink>
        )
    }

    return (
        <nav className="navbar navbar-expand navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand">LB</a>
                {store.connected ? (
                    <ul className="navbar-nav me-auto">
                        {treezz.filter((item) => item.visible).map((item) => makeNavItem(item))}
                    </ul>
                ) : null}
            </div>
        </nav>
    )
}
