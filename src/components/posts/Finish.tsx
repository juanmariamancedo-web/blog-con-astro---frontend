import { forwardRef } from "react"
import { Spinner } from 'flowbite-react';
type Props = {
    situation: "loading" | "finish" | "there are not posts"
}

const Finish = forwardRef<HTMLDivElement, Props>(({situation}, ref) => {
return (
    <div ref={ref}>
        {situation == "loading" && <Spinner aria-label="Large spinner example" size="lg" />}
        {situation == "there are not posts" && <p>No hay resultados</p>}
        {situation == "finish" && <p>Haz llegado al final</p>}
    </div>
);
});

export default Finish