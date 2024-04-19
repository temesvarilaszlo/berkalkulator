const IncDecButton = ({text, onClick}) => {
    return (
        <button className="my-1 w-5 h-5 p-1 rounded-xl bg-slate-800 hover:bg-slate-500 text-white flex items-center justify-center"
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default IncDecButton;