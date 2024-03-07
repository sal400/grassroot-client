import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { axiosBase } from "../hooks/useAxios";
import Swal from "sweetalert2";

const OrderPage = () => {
    const { user } = useAuth()
    const [cart, setCart] = useState([])

    //send filter via post method
    const filterEmail = user.email
    useEffect(() => {
        axiosBase(`/cart/${filterEmail}`)
            .then(res => {
                console.log(res.data)
                setCart(res.data)
            })
    }, [filterEmail])

    const handleDeleteCart = (id) => {
        axiosBase.delete(`/cart/${id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.deletedCount > 0) {
                    Swal.fire(
                        'Deleted!',
                        'Item removed from cart.',
                        'success'
                    )
                    const remaining = cart.filter(x => x._id !== id)
                    setCart(remaining)
                }
            })

        console.log('clicked: ', id)
    }

    return (
        <div className="border border-green-400 rounded-lg">
            <div className="text-black text-center text-xl md:text-5xl font-black p-5 mb-4 gap-5 w-full">
                Cart
            </div>

            <div className="lg:flex">
                <div className="p-5 w-full space-y-12">
                    <div>
                        {
                            cart.map((x, index) =>
                                <div key={x._id} className="flex justify-between items-center my-4 md:w-3/4 mx-auto">
                                    <div className="md:flex items-center">
                                        <div>
                                            <h3 className="font-bold text-xl">{index + 1}. {x.foodName}</h3>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 font-bold text-xl">
                                        <h3 className="green">${x.foodPrice}</h3>
                                        <button onClick={() => handleDeleteCart(x._id)} className="btn btn-sm text-red-600">X</button>
                                    </div>
                                </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;