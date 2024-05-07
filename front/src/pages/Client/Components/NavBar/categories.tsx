function Categories({ setShowCategory }: any) {
  return (
    <>
      <div
        onClick={() => setShowCategory(false)}
        className='absolute z-10 top-[105%] left-[-100%] w-[100vw] min-h-[100vh] h-auto bg-zeus-975 smm:left-0'
      />
      <div className='absolute z-20 top-[105%] left-[-100%] w-[55vw] min-h-[100vh] h-auto bg-zeus-100 shadow-xl shadow-zeus-600 animate-duration-300 animate-fade-in-right smm:left-0 smm:w-[60%] smm:top-[103%]'></div>
    </>
  );
}

export default Categories;
