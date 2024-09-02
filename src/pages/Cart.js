import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Button } from "@mui/material"
import { DeleteForeverOutlined } from "@mui/icons-material"
import {
  addOneProduct,
  clearCart,
  removeItem,
  removeOneProduct,
} from "../store/slices/cartSlice"
import YesNoModal from "../components/YesNoModal"
import { toast } from "react-toastify"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"

function Cart() {
  const { products } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const [isShowModal, setIsShowModal] = useState(false)
  const [isShowModalAll, setIsShowModalAll] = useState(false) // çoklu silim modal için usestate yazıyoruz

  const [productID, setProductID] = useState("") //elimizde id olmadığı için bunu eşitlemek için usestate kullanıyoruz

  const removeItemFromComponent = async (id) => {
    setIsShowModal(true)
    setProductID(id) // removeitem ile gelen id'yi productID'ye eşitliyoruz
  }

  const onClickYes = () => {
    setIsShowModal(false) // ürün silindikten sonra kutunun kapanmasını sağlıyor
    dispatch(removeItem(productID)) //artık id'miz buna eşitlendiği için bu fonk. kullanabiliriz. Ama bi itemden 3 tane eklersen 3'ünü de siliyor :(
    toast.success("Product Removed!")
  }
  //removecart için yeni bir onclick yazmış olduk
  const onClickYesAll = () => {
    setIsShowModalAll(false) //
    dispatch(clearCart()) // bütün ürünleri silmek için clearCart fonk. kullanılabilir
    toast.success("All Products Removed!")
  }

  const incrementProduct = (product) => {
    if (product.cartQuantity !== product.quantity) {
      dispatch(addOneProduct(product))
    } else {
      toast.error("No Enough Stock for that Product!")
    }
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <img
                    src={product.image}
                    alt="product_image"
                    className="cartImage"
                  />
                </TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell align="center">
                  <RemoveCircleOutlineIcon
                    className="mx-2"
                    onClick={
                      product.cartQuantity === 1
                        ? () => removeItemFromComponent(product._id)
                        : () => dispatch(removeOneProduct(product))
                    }
                  />
                  {product.cartQuantity}
                  <AddCircleOutlineIcon
                    className="mx-2"
                    onClick={() => incrementProduct(product)}
                  />
                </TableCell>
                <TableCell align="center">
                  <DeleteForeverOutlined
                    color="error"
                    onClick={() => removeItemFromComponent(product._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-end m-4">
        <Button
          onClick={() => setIsShowModalAll(true)} //clearcart fonksiyonu için
          color="error"
          variant="contained"
          startIcon={<DeleteForeverOutlined />}>
          Clear Cart!
        </Button>
      </div>

      {/* Tek tek silim için kullanılan modal */}
      <YesNoModal
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
        title="Remove From Cart"
        desc="Would you like to remove the item from cart?"
        onClickYes={onClickYes}
      />

      {/* çoklu silim remove cart için kullanılan modal */}
      <YesNoModal
        isShowModal={isShowModalAll}
        setIsShowModal={setIsShowModalAll}
        title="Clear Cart"
        desc="Would you like to clear the cart?"
        onClickYes={onClickYesAll}
      />
    </>
  )
}

export default Cart
