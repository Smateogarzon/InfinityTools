function PayMethos({ products }: { products: number }) {
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 2,
  });

  return (
    <div className='w-[35%] flex justify-center mt-4 text-center gap-10 flex-col items-center'>
      <div className='flex justify-center flex-col items-center gap-2'>
        <h3>¿Tienes un cupon de descuento?</h3>
        <label htmlFor='descount'></label>
        <input
          type='text'
          id='descount'
          name='descount'
          className='h-[30px] text-[#fff] bg-Black-low rounded-md border-solid border-1 w-[220px]'
        />

        <button className='w-1/2 inline-block bg-bright-sun-100 hover:bg-bright-sun-800 text-white font-bold py-2 px-4 rounded cursor-pointer text-[#fff]'>
          Aplicar
        </button>
      </div>
      <div>
        <h2>Total de compra:</h2>
        <p className='text-lg'>{formatter.format(products)}</p>
      </div>
    </div>
  );
}
export default PayMethos;
