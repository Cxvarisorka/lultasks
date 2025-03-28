import { MoreVertical } from "@deemlol/next-icons";
import ButtonPurple from "../ui/button-purple";

const Nav = () => {
    return (
        <header className="w-full bg-white dark:bg-mainGrey-dark h-24 border-b-2 dark:border-lines-light/50">
            <nav className="flex justify-between px-10 items-center w-full h-full">
                <h2 className="text-mainGrey-veryDark dark:text-white text-3xl font-bold">Platform Launch</h2>
                <div className="flex items-center">
                    <ButtonPurple text={"+ Add New Task"}/>
                    <span class="material-symbols-outlined">
                        more_vert
                    </span>
                </div>
            </nav>
        </header>
    )
}

export default Nav;