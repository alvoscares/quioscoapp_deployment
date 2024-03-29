import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"
import Categoria from "./Categoria";

const Sidebar = () => {
    const { categorias } = useQuiosco();

  return (
    <>
        <Image width={100} height={100} className="m-auto mt-8" src="/assets/img/logo.svg" alt="imagen logotipo" />

        <nav className="mt-8">
            {categorias.map(categoria => (
                <Categoria 
                    key={categoria.id}
                    categoria={categoria}
                />
            ))}
        </nav>
    </>
  )
}
export default Sidebar