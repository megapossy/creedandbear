import { clsx } from "clsx";
import { twMerge, type ClassNameValue } from "tailwind-merge";

/**
 * Timeout
 * @param time
 */
const waits = async (time = 0) => {
    await new Promise((resolve) => setTimeout(resolve, time));
};

function cn(...classes: ClassNameValue[]) {
    return twMerge(clsx(classes))
}


export {
    waits,
    cn
};
