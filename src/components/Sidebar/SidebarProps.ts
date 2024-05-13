import { Dispatch, SetStateAction } from "react";

export type SidebarProps = {
    toggled: boolean;
    setToggled: Dispatch<SetStateAction<boolean>>;
}