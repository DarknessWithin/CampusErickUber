export default function FormInput({
                                      type = "text",
                                      placeholder,
                                      value,
                                      onChange
                                  }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="
                w-full
                p-3
                rounded-xl
                bg-white/10
                border
                border-white/20
                outline-none
                focus:border-blue-400
                focus:ring-2
                focus:ring-blue-400/30
                transition
            "
        />
    );
}