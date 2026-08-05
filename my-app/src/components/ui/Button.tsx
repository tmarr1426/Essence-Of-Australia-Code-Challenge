interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}


export default function Button({
    children,
    onClick,
    disabled
}: ButtonProps) {

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="
                rounded-lg
                bg-blue-600
                px-4
                py-2
                text-white
                font-semibold
                hover:bg-blue-700
                disabled:bg-gray-400
            "
        >
            {children}
        </button>
    );
}