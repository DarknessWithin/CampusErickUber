export default function StatusBadge({
                                        status
                                    }) {

    const colors = {
        REQUESTED:
            "bg-yellow-100 text-yellow-700",

        ACCEPTED:
            "bg-blue-100 text-blue-700",

        IN_PROGRESS:
            "bg-purple-100 text-purple-700",

        COMPLETED:
            "bg-green-100 text-green-700",

        CANCELLED:
            "bg-red-100 text-red-700"
    };

    return (
        <span
            className={`
      px-3
      py-1
      rounded-full
      text-sm
      font-semibold
      ${colors[status]}
      `}
        >
      {status}
    </span>
    );
}