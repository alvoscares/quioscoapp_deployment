import { useState, useEffect, createContext, useDeferredValue } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [producto, setProducto] = useState({});
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([]);
    const [nombre, setNombre] = useState('');
    const [total, setTotal] = useState(0);

    const router = useRouter()

    const obtenerCategorias = async () => {
       const { data } = await axios("/api/categorias")
       setCategorias(data)
    }
    useEffect(() => {
        obtenerCategorias()
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total,producto) => (producto.precio * producto.cantidad ) + total, 0)

        setTotal(nuevoTotal)
    }, [pedido])

    const handleClickCategoria = id => {
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoria[0])
        router.push('/');
    }
    // Seteo el Producto cuando lo clickeo en el inico
    const handleSetProducto = producto => {
        setProducto(producto)
    }
    // Permite cambiar el valor del modal para saber si esta activo o no
    const handleChangeModal = () => {
        setModal(!modal)
    }

    // Agrega un pediod a la orden
    /* Como el pedido tiene datos demas, puedo sacar datos (en este caso categoriaId e imagen) aplicando destructuring, indicando los atributos que quiero sacar y ponindo una copia del objeto */
    /* some me retorna true o false, con esto valido si el producto ya existe en el state de pedidos y de no ser asi lo agrega*/
    const handleAgregarPedido = ({categoriaId, ...producto}) => {
        if(pedido.some(productoState => productoState.id === producto.id)){
            // Actualizo cantidad
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado)

            toast.success("Guardado Correctamente");
        } else {
            setPedido([...pedido, producto])
            toast.success("Agregado al Pedido");
        }
        
        setModal(false)
    }

    const handleEditarCantidades = id => {
        const productoActualizar = pedido.filter(producto => producto.id === id)
        setProducto(productoActualizar[0])
        setModal(!modal)
    }

    const handleEliminar = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
    }

    const colocarOrden = async (e) => {
        e.preventDefault()
        
        try {
            await axios.post("/api/ordenes", {pedido, nombre, total, fecha: Date.now().toString()});

            // Resetear la app
            // lo que se suele hacer es reiniciar los states que sean necesarios

            setCategoriaActual(categorias[0]);
            setPedido([]);
            setNombre("");
            setTotal(0);

            toast.success("Pedido Realizado Correctamente")

            setTimeout(() => {
                router.push('/')
            }, 3000)

            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                modal,
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidades,
                handleEliminar,
                nombre,
                setNombre,
                colocarOrden,
                total 
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}
export default QuioscoContext