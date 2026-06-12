export default function AuthCard({
                                     title,
                                     children
                                 }) {

    return (

        <div className="
            w-full
            max-w-md
            backdrop-blur-lg
            bg-white/10
            border
            border-white/20
            rounded-3xl
            shadow-2xl
            p-8
        ">

            <h1 className="
                text-3xl
                font-bold
                mb-8
                text-center
            ">
                {title}
            </h1>

            {children}

        </div>
    );
}