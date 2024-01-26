import ReactPaginate from "react-paginate";
export default function PaginatedItems({ itemsPerPage, products, setPage }) {
  const pageCount = Math.ceil(products?.length / itemsPerPage);

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={(e) => setPage(e.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="flex justify-center items-center gap-3 my-5 text-xl font-bold"
        pageClassName=" font-bold text-gray-600 w-8 h-8 rounded-full flex justify-center items-center 
        hover:bg-gray-400 hover:text-white"
        activeClassName="bg-blue-400 text-white"
        previousLinkClassName="w-8 h-8 rounded-full flex justify-center items-center text-white bg-gray-800"
        nextLinkClassName="w-8 h-8 rounded-full flex justify-center items-center text-white bg-gray-800"
      />
    </>
  );
}
