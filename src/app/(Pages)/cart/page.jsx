"use client";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { deleteFromCart } from "@/app/lib/slices/CartSlise";
import { TrashIcon } from "@heroicons/react/24/solid";

import Link from "next/link";
export default function Cart() {
  const carts = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  return (
    <div>
      <section className="w-full">
        <div className="mx-auto mt-5 max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8  border-2 border-primary">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Your Cart
              </h1>
            </header>

            <div className="mt-8">
              <ul className="space-y-4">
                {carts.map((cart, index) => {
                  return (
                    <li className="flex items-center gap-4" key={cart.id}>
                      <img
                        src={cart?.image}
                        alt={cart?.name}
                        className="h-16 w-16 rounded object-cover"
                      />

                      <div>
                        <h3 className="text-lg text-gray-900">{cart.name}</h3>

                        <dl className="mt-0.5 space-y-px text-16px] text-gray-600">
                          <div>
                            <dt className="inline">Brand:</dt>
                            <dd className="inline">{cart?.brand}</dd>
                          </div>

                          <div>
                            <dt className="inline">Price:</dt>
                            <dd className="inline">{cart.price}$</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="flex flex-1 items-center justify-end gap-2">
                        <form>
                          <label htmlFor="Line1Qty" className="sr-only">
                            Quantity
                          </label>

                          <input
                            type="number"
                            min="1"
                            value="1"
                            id="Line1Qty"
                            className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                          />
                        </form>

                        <TrashIcon
                          className="w-6 h-6 text-red-300 cursor-pointer"
                          onClick={() => dispatch(deleteFromCart(cart))}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>$200</dd>
                    </div>
                  </dl>

                  <div className="flex justify-end">
                    <Link
                      href="#"
                      className="block rounded bg-primary px-5 py-3 text-sm text-white transition hover:bg-secondary"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
